import { useEffect, useRef, useState } from 'react'

/*
  Flagship set-piece for the platform landing: "the distance to a trillion".
  The emotional spine of the whole plan in one view. Dira means compass, so a
  compass needle settles onto the 2050 bearing while a distance bar shows how
  small today's ~US$79bn economy is against the one-trillion-dollar goal.
  Monochrome ink + the signature green = the 2050 bearing. Honours
  prefers-reduced-motion (jumps straight to the final state).
*/

const BEARING = 52          // degrees clockwise from north - the 2050 bearing
const TODAY_PCT = 7.9       // 79bn / 1,000bn
const MULTIPLE = 12.7       // 1,000 / 79

const R = 150               // compass radius
const CX = 190
const CY = 190

// point on the dial at a compass angle (deg clockwise from north/up)
function dial(angle, radius) {
  const rad = (angle - 90) * (Math.PI / 180)
  return [CX + radius * Math.cos(rad), CY + radius * Math.sin(rad)]
}

function arcPath(fromDeg, toDeg, radius) {
  const [x1, y1] = dial(fromDeg, radius)
  const [x2, y2] = dial(toDeg, radius)
  const large = toDeg - fromDeg > 180 ? 1 : 0
  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`
}

export default function BearingHero({ t }) {
  const [p, setP] = useState(0)          // 0 → 1 animation progress
  const ref = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setP(1); return }
    let raf, start
    const dur = 1500
    const ease = (x) => 1 - Math.pow(1 - x, 3)     // easeOutCubic
    const step = (ts) => {
      if (start === undefined) start = ts
      const k = Math.min(1, (ts - start) / dur)
      setP(ease(k))
      if (k < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  const needle = BEARING * p
  const barW = TODAY_PCT * p
  const mult = (MULTIPLE * p).toFixed(1)

  const ticks = Array.from({ length: 24 }, (_, i) => i * 15)
  const [tipX, tipY] = dial(BEARING, R - 26)

  return (
    <section className="bhero" ref={ref} aria-label={t('hub.bearing.title')}>
      <div className="bhero__text">
        <p className="bhero__kicker">{t('hub.bearing.kicker')}</p>
        <h2 className="bhero__title">{t('hub.bearing.title')}</h2>
        <p className="bhero__lead">{t('hub.bearing.lead')}</p>

        <div className="bhero__spine">
          <div className="bhero__node">
            <span className="bhero__node-lab">{t('hub.bearing.todayLabel')}</span>
            <span className="bhero__node-val bhero__node-val--now">{t('hub.bearing.todayVal')}</span>
          </div>
          <div className="bhero__gap" aria-hidden="true">
            <span className="bhero__mult">&times;{mult}</span>
            <span className="bhero__mult-lab">{t('hub.bearing.multipleLabel')}</span>
          </div>
          <div className="bhero__node bhero__node--goal">
            <span className="bhero__node-lab">{t('hub.bearing.goalLabel')}</span>
            <span className="bhero__node-val bhero__node-val--goal">{t('hub.bearing.goalVal')}</span>
          </div>
        </div>

        <div className="bhero__bar" role="img"
             aria-label={`${t('hub.bearing.todayVal')} ${t('hub.bearing.todayLabel')}; ${t('hub.bearing.goalVal')} ${t('hub.bearing.goalLabel')}`}>
          <div className="bhero__bar-track">
            <div className="bhero__bar-fill" style={{ width: `${barW}%` }} />
            <span className="bhero__bar-goal" />
          </div>
          <div className="bhero__bar-ends">
            <span>{t('hub.bearing.todayVal')}</span>
            <span>{t('hub.bearing.goalVal')}</span>
          </div>
        </div>

        <div className="bhero__pc">
          <span className="bhero__pc-lab">{t('hub.bearing.pcLabel')}</span>
          <span className="bhero__pc-flow">
            <span className="bhero__pc-now">{t('hub.bearing.pcFrom')}<small>{t('hub.bearing.pcFromYear')}</small></span>
            <span className="bhero__pc-arrow" aria-hidden="true">→</span>
            <span className="bhero__pc-goal">{t('hub.bearing.pcTo')}<small>{t('hub.bearing.pcToYear')}</small></span>
          </span>
        </div>

        <p className="bhero__source">{t('hub.bearing.source')}</p>
      </div>

      <div className="bhero__compass" aria-hidden="true">
        <svg viewBox="0 0 380 380" className="bhero__dial" role="presentation">
          {/* outer ring */}
          <circle cx={CX} cy={CY} r={R} className="bhero__ring" />
          <circle cx={CX} cy={CY} r={R - 18} className="bhero__ring bhero__ring--inner" />
          {/* ticks */}
          {ticks.map((a) => {
            const major = a % 90 === 0
            const [x1, y1] = dial(a, R)
            const [x2, y2] = dial(a, R - (major ? 16 : 8))
            return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2}
                         className={major ? 'bhero__tick bhero__tick--major' : 'bhero__tick'} />
          })}
          {/* journey arc: north → bearing */}
          <path d={arcPath(0, Math.max(0.01, needle), R - 9)} className="bhero__arc" />
          {/* now marker at north */}
          {(() => { const [nx, ny] = dial(0, R - 9); return <circle cx={nx} cy={ny} r="4" className="bhero__now" /> })()}
          {/* needle */}
          <g style={{ transform: `rotate(${needle}deg)`, transformOrigin: `${CX}px ${CY}px` }}>
            <line x1={CX} y1={CY} x2={CX} y2={CY - (R - 30)} className="bhero__needle" />
            <line x1={CX} y1={CY} x2={CX} y2={CY + 44} className="bhero__needle-tail" />
            <polygon points={`${CX},${CY - (R - 22)} ${CX - 7},${CY - (R - 44)} ${CX + 7},${CY - (R - 44)}`} className="bhero__needle-head" />
          </g>
          <circle cx={CX} cy={CY} r="7" className="bhero__hub" />
          {/* labels */}
          <text x={CX} y={CY - R + 30} className="bhero__dial-lab bhero__dial-lab--now" textAnchor="middle">{t('hub.bearing.now')}</text>
          <text x={tipX} y={tipY} className="bhero__dial-lab bhero__dial-lab--goal" textAnchor="middle">2050</text>
        </svg>
        <p className="bhero__compass-cap">{t('hub.bearing.needle')}</p>
      </div>
    </section>
  )
}
