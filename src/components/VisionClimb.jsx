import { useEffect, useRef, useState } from 'react'
import { formatValue } from '../lib/format.js'

/*
  Signature set-piece for the Vision targets: "the size of the climb".
  Every measurable 2050 target indexed to today = 100 on a log scale, so
  indicators in wildly different units can be compared by the scale of the
  leap. Rising stems (accent green) must grow; falling stems (grey) must
  shrink; dashed stems drop to zero (eliminate). Honours reduced motion.
*/

// Fixed left-to-right order: biggest climb first, falls and eliminations last.
const ORDER = ['t12', 't2', 't14', 't15', 't24', 't4', 't9']

// plot geometry
const W = 760, H = 448
const PL = 56, PR = 20, PT = 58, PB = 104
const plotTop = PT, plotBottom = H - PB
const plotH = plotBottom - plotTop
const IDX_MIN = 50, IDX_MAX = 2000
const L0 = Math.log10(IDX_MIN), L1 = Math.log10(IDX_MAX)
const yOf = (idx) => plotBottom - ((Math.log10(idx) - L0) / (L1 - L0)) * plotH
const Y100 = yOf(100)
const Y_ZERO = plotBottom + 14   // where "to zero" stems land, below the axis
const CAT_Y = H - PB + 40        // category labels

function changeLabel(b, tgt, dir, toZero) {
  if (dir === 'decrease' && tgt === 0) return toZero
  if (dir === 'decrease') return '−' + Math.round((1 - tgt / b) * 100) + '%'
  return '×' + (tgt / b).toFixed(tgt / b >= 10 ? 0 : 1)
}

export default function VisionClimb({ t, targets }) {
  const [p, setP] = useState(0)
  const svgRef = useRef(null)
  const started = useRef(false)

  const rows = ORDER
    .map((id) => targets.find((x) => x.id === id))
    .filter((x) => x && x.baseline_value > 0)
    .map((x) => {
      const b = Number(x.baseline_value), tgt = Number(x.target_value)
      const index = b > 0 ? (tgt / b) * 100 : 0
      const eliminate = x.direction === 'decrease' && tgt === 0
      const rising = x.direction === 'increase'
      return {
        id: x.id, label: t(`targets.climb.labels.${x.id}`),
        b, tgt, unit: x.unit, rising, eliminate,
        index, yEnd: eliminate ? Y_ZERO : yOf(index),
        change: changeLabel(b, tgt, x.direction, t('targets.climb.toZero')),
        val2050: formatValue(tgt, x.unit), page: x.source_page,
      }
    })

  // animate once when scrolled into view
  useEffect(() => {
    const el = svgRef.current
    if (!el) return
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const run = () => {
      if (started.current) return
      started.current = true
      if (reduce) { setP(1); return }
      let raf, start
      const dur = 1100, ease = (x) => 1 - Math.pow(1 - x, 3)
      const step = (ts) => {
        if (start === undefined) start = ts
        const k = Math.min(1, (ts - start) / dur)
        setP(ease(k))
        if (k < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { run(); io.disconnect() } })
    }, { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const colW = (W - PL - PR) / rows.length
  const xOf = (i) => PL + colW * (i + 0.5)
  const grid = [1000, 500, 100]

  return (
    <figure className="vclimb">
      <figcaption className="vclimb__cap">
        <span className="vclimb__kicker">{t('targets.climb.kicker')}</span>
        <h2 className="vclimb__title">{t('targets.climb.title')}</h2>
        <p className="vclimb__lead measure">{t('targets.climb.lead')}</p>
        <ul className="vclimb__legend">
          <li><span className="vclimb__key vclimb__key--rise" /> {t('targets.climb.mustRise')}</li>
          <li><span className="vclimb__key vclimb__key--fall" /> {t('targets.climb.mustFall')}</li>
          <li><span className="vclimb__key vclimb__key--zero" /> {t('targets.climb.eliminated')}</li>
        </ul>
      </figcaption>

      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="vclimb__svg" role="img"
           aria-label={t('targets.climb.title')}>
        {/* gridlines + index axis */}
        {grid.map((g) => (
          <g key={g}>
            <line x1={PL} y1={yOf(g)} x2={W - PR} y2={yOf(g)}
                  className={g === 100 ? 'vclimb__ref' : 'vclimb__grid'} />
            <text x={PL - 8} y={yOf(g) + 4} textAnchor="end" className="vclimb__axis">{g}</text>
          </g>
        ))}
        <text x={W - PR} y={Y100 - 8} textAnchor="end" className="vclimb__reflab">{t('targets.climb.todayRef')}</text>

        {rows.map((r, i) => {
          const x = xOf(i)
          const yEnd = Y100 + (r.yEnd - Y100) * p
          const cls = r.eliminate ? 'zero' : r.rising ? 'rise' : 'fall'
          // rising + eliminate label above the dot; falling label below it
          const above = r.rising || r.eliminate
          const changeY = r.eliminate ? yEnd - 12 : above ? yEnd - 16 : yEnd + 22
          return (
            <g key={r.id} className={`vclimb__col vclimb__col--${cls}`} style={{ opacity: p < 0.05 ? 0 : 1 }}>
              <line x1={x} y1={Y100} x2={x} y2={yEnd} className="vclimb__stem" />
              <circle cx={x} cy={yEnd} r="5"
                      className={r.eliminate ? 'vclimb__dot vclimb__dot--hollow' : 'vclimb__dot'} />
              <text x={x} y={changeY} textAnchor="middle" className="vclimb__change"
                    style={{ opacity: p }}>{r.change}</text>
              {!r.eliminate && (
                <text x={x} y={above ? changeY - 15 : changeY + 15} textAnchor="middle"
                      className="vclimb__val" style={{ opacity: p }}>{r.val2050}</text>
              )}
            </g>
          )
        })}

        {/* today dots sit on the reference line */}
        {rows.map((r, i) => (
          <circle key={`n${r.id}`} cx={xOf(i)} cy={Y100} r="3.5" className="vclimb__now" />
        ))}

        {/* category labels */}
        {rows.map((r, i) => (
          <text key={`l${r.id}`} x={xOf(i)} y={CAT_Y} textAnchor="middle" className="vclimb__catlab">
            {r.label}
          </text>
        ))}
      </svg>

      <p className="vclimb__note">{t('targets.climb.note')}</p>
    </figure>
  )
}
