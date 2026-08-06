import { useState } from 'react'

/*
  Interactive delivery-cycle flow (base design, monochrome, no framer-motion).
  Three phases sit on a ring that reads as "on repeat"; click or key a phase to
  read its detail below. `phases` = [{ step, name, description }].
*/
const CX = 280, CY = 180, R = 120, NR = 46
const ANGLES = [-90, 30, 150] // top, lower-right, lower-left

const pt = (deg, rad = R) => [CX + rad * Math.cos((deg * Math.PI) / 180), CY + rad * Math.sin((deg * Math.PI) / 180)]

function Arrowhead({ deg }) {
  const [x, y] = pt(deg)
  return <path d="M -7 -6 L 7 0 L -7 6 Z" transform={`translate(${x} ${y}) rotate(${deg + 90})`} className="cycle__arrow" />
}

export default function CycleFlow({ phases }) {
  const [active, setActive] = useState(0)
  const cur = phases[active] || {}

  return (
    <div className="cycle">
      <svg viewBox="0 0 560 360" className="cycle__svg" role="group" aria-label="The delivery cycle">
        <circle cx={CX} cy={CY} r={R} className="cycle__ring" />
        {[-30, 90, 210].map((d) => <Arrowhead key={d} deg={d} />)}
        {phases.map((p, i) => {
          const [x, y] = pt(ANGLES[i])
          const on = i === active
          // Short two-word label for the node (full name shows in the detail panel).
          const words = p.name.split(' ').slice(0, 2)
          const l1 = words[0], l2 = words[1] || ''
          return (
            <g key={p.step} className={`cycle__node ${on ? 'is-on' : ''}`} role="button" tabIndex={0}
              aria-pressed={on} aria-label={p.name}
              onClick={() => setActive(i)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(i) } }}>
              <circle cx={x} cy={y} r={NR} className="cycle__disc" />
              <text x={x} y={y - 6} textAnchor="middle" className="cycle__step">{String(p.step).padStart(2, '0')}</text>
              <text x={x} y={y + 12} textAnchor="middle" className="cycle__nlabel">{l1}</text>
              <text x={x} y={y + 26} textAnchor="middle" className="cycle__nlabel">{l2}</text>
            </g>
          )
        })}
      </svg>

      <div className="cycle__detail">
        <p className="cycle__step-of">Phase {cur.step} of {phases.length}</p>
        <h3 className="cycle__name">{cur.name}</h3>
        <p className="cycle__desc">{cur.description}</p>
        <div className="cycle__dots" role="tablist" aria-label="Phases">
          {phases.map((p, i) => (
            <button key={p.step} type="button" role="tab" aria-selected={i === active} aria-label={p.name}
              className={`cycle__dot ${i === active ? 'is-on' : ''}`} onClick={() => setActive(i)} />
          ))}
        </div>
      </div>
    </div>
  )
}
