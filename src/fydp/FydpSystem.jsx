import { useEffect, useRef, useState } from 'react'

/*
  Signature set-piece for FYDP IV: the whole plan as one system. All 48
  strategic pathways drawn as spokes radiating from a central hub, grouped into
  their six clusters as outer arcs. Shows the scale and shape of the plan at a
  glance; hover a spoke for the pathway name. Accent green = the plan's reach.
  Honours reduced motion.
*/

const W = 760, H = 560
const CX = W / 2, CY = 270
const INNER = 74, OUTER = 196, ARC_R = 206, LABEL_R = 230
const GAP = 5 // degrees between clusters

const pt = (a, r) => [CX + r * Math.sin((a * Math.PI) / 180), CY - r * Math.cos((a * Math.PI) / 180)]

function arcPath(a0, a1, r) {
  const [x0, y0] = pt(a0, r)
  const [x1, y1] = pt(a1, r)
  const large = a1 - a0 > 180 ? 1 : 0
  return `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`
}

export default function FydpSystem({ pathways }) {
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
      const dur = 1300, ease = (x) => 1 - Math.pow(1 - x, 3)
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
    }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // group by cluster, first-seen order
  const groups = []
  const seen = {}
  pathways.forEach((pw) => {
    if (!seen[pw.cluster]) { seen[pw.cluster] = []; groups.push({ name: pw.cluster, items: seen[pw.cluster] }) }
    seen[pw.cluster].push(pw)
  })

  const total = pathways.length
  const per = (360 - GAP * groups.length) / total
  let cursor = 0
  const clusters = groups.map((g, gi) => {
    const start = cursor
    const spokes = g.items.map((pw, k) => ({ pw, angle: start + (k + 0.5) * per, idx: gi }))
    const end = start + g.items.length * per
    cursor = end + GAP
    return { ...g, start, end, mid: (start + end) / 2, spokes, gi }
  })
  const allSpokes = clusters.flatMap((c) => c.spokes.map((s) => ({ ...s, gi: c.gi })))

  return (
    <figure className="fsys" ref={ref}>
      <svg viewBox={`0 0 ${W} ${H}`} className="fsys__svg" role="img"
           aria-label="The 48 strategic pathways of FYDP IV, grouped into six clusters">
        {/* spokes */}
        {allSpokes.map((s, i) => {
          const r = INNER + (OUTER - INNER) * p
          const [x1, y1] = pt(s.angle, INNER)
          const [x2, y2] = pt(s.angle, r)
          const [dx, dy] = pt(s.angle, r)
          return (
            <g key={s.pw.id} className={`fsys__spoke fsys__spoke--c${s.gi % 2}`}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} className="fsys__line"
                    style={{ transitionDelay: `${i * 12}ms` }}>
                <title>{s.pw.cluster}: {s.pw.name}</title>
              </line>
              <circle cx={dx} cy={dy} r="3" className="fsys__tip" style={{ opacity: p }} />
            </g>
          )
        })}

        {/* cluster arcs + labels */}
        {clusters.map((c) => {
          const mid = c.mid
          const [lx, ly] = pt(mid, LABEL_R)
          const s = Math.sin((mid * Math.PI) / 180)
          const anchor = s > 0.3 ? 'start' : s < -0.3 ? 'end' : 'middle'
          return (
            <g key={c.name} className={`fsys__cl fsys__cl--c${c.gi % 2}`} style={{ opacity: p }}>
              <path d={arcPath(c.start + 1, c.end - 1, ARC_R)} className="fsys__arc" />
              <text x={lx} y={ly} textAnchor={anchor} className="fsys__cllab">{c.name}</text>
              <text x={lx} y={ly + 16} textAnchor={anchor} className="fsys__clnum">{c.items.length}</text>
            </g>
          )
        })}

        {/* hub */}
        <circle cx={CX} cy={CY} r={INNER - 14} className="fsys__hub" />
        <text x={CX} y={CY - 6} textAnchor="middle" className="fsys__hub-num">{total}</text>
        <text x={CX} y={CY + 14} textAnchor="middle" className="fsys__hub-lab">PATHWAYS</text>
      </svg>
      <p className="fsys__note">Each spoke is one of the 48 strategic pathways; the six arcs are the clusters they fall into. Hover a spoke for its name. Source: FYDP IV strategic pathways.</p>
    </figure>
  )
}
