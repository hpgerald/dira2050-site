import { useEffect, useRef, useState } from 'react'

/*
  Signature set-piece for the LTPP: "the 25-year climb". The five successive
  Five-Year Development Plans drawn as an ascending staircase from today's base
  to the 2050 summit. Only the endpoints carry figures (they are documented);
  the rising step heights illustrate the cumulative climb, since the plan sets
  no per-plan GDP figure. Accent green = the ascent to 2050. Reduce-motion safe.
*/

const W = 820, H = 440
const PL = 64, PR = 60, PT = 64, PB = 96
const baseY = H - PB
const summitY = PT + 6

export default function LtppClimb({ roadmap }) {
  const [p, setP] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const run = () => {
      if (started.current) return
      started.current = true
      if (reduce) { setP(1); return }
      let raf, start
      const dur = 1200, ease = (x) => 1 - Math.pow(1 - x, 3)
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
    }, { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const plans = roadmap.slice(0, 5)
  const n = plans.length
  const plotW = W - PL - PR
  const colW = plotW / n
  const gap = 14
  const maxH = baseY - summitY
  const minH = 46
  const heightOf = (i) => minH + (maxH - minH) * (i / (n - 1))
  const topOf = (i) => baseY - heightOf(i)

  return (
    <figure className="lclimb" ref={ref}>
      <svg viewBox={`0 0 ${W} ${H}`} className="lclimb__svg" role="img"
           aria-label="The 25-year climb: five successive five-year plans rising to the 2050 summit">
        {/* base line */}
        <line x1={PL - 10} y1={baseY} x2={W - 14} y2={baseY} className="lclimb__base" />

        {plans.map((r, i) => {
          const x = PL + colW * i + gap / 2
          const w = colW - gap
          const top = topOf(i)
          const h = (baseY - top) * p
          const current = String(r.current) === 'yes'
          return (
            <g key={r.roman} className={`lclimb__col ${current ? 'is-current' : ''}`}>
              <rect x={x} y={baseY - h} width={w} height={h} className="lclimb__bar" rx="2" />
              <text x={x + w / 2} y={baseY + 26} textAnchor="middle" className="lclimb__roman">FYDP {r.roman}</text>
              <text x={x + w / 2} y={baseY + 44} textAnchor="middle" className="lclimb__years">{r.years}</text>
            </g>
          )
        })}

        {/* ascent line connecting step tops */}
        <polyline
          points={plans.map((r, i) => `${PL + colW * i + colW / 2},${baseY - (baseY - topOf(i)) * p}`).join(' ')}
          className="lclimb__ascent" style={{ opacity: p }} />
        {plans.map((r, i) => (
          <circle key={`d${r.roman}`} cx={PL + colW * i + colW / 2} cy={baseY - (baseY - topOf(i)) * p}
                  r="4" className="lclimb__node" style={{ opacity: p }} />
        ))}

        {/* base camp annotation (upper-left, above the short early columns) */}
        <g style={{ opacity: p }}>
          <text x={PL - 6} y={120} className="lclimb__camp-lab">2026 · BASE</text>
          <text x={PL - 6} y={138} className="lclimb__camp-val">~US$80bn · ~US$1,300/person</text>
        </g>
        {/* summit annotation */}
        <g style={{ opacity: p }}>
          <text x={W - 14} y={summitY - 4} textAnchor="end" className="lclimb__summit-lab">2050 · SUMMIT</text>
          <text x={W - 14} y={summitY + 16} textAnchor="end" className="lclimb__summit-val">US$1 trillion · US$7,000/person</text>
          <text x={W - 14} y={summitY + 33} textAnchor="end" className="lclimb__summit-sub">~US$3.6tn invested over 25 years</text>
        </g>
      </svg>
      <p className="lclimb__note">Step heights illustrate the cumulative climb; the plan sets no per-plan GDP figure. The base (today) and 2050 summit are documented. Today’s economy: World Bank, 2024. Source page 3, 10.</p>
    </figure>
  )
}
