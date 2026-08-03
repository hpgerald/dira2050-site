import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

/*
  Radial Vision map. A deterministic, hand-composed layout (no physics), so it
  always reads as an intentional diagram rather than a random cloud:

    · Vision at the centre
    · Pillars + drivers on an inner ring (grouped: pillars first, then drivers)
    · Sectors on an outer ring, with tangential labels (the classic radial look)
    · Faint concentric guide rings; curved connectors that light on hover

  Same props/behaviour as before (nodes, links, keyboard-navigable), so the
  accessible text-list fallback rendered by the caller is unchanged.

  nodes: [{ id, label, type, r?, color?, to? }]
  links: [{ source, target }]
*/

const R1 = 250   // inner ring: pillars + drivers
const R2 = 470   // outer ring: sectors
const NODE_R = { vision: 40, pillar: 25, driver: 19, sector: 13 }
const nodeR = (n) => n.r || NODE_R[n.type] || 10

const STYLE = {
  vision: { fill: 'var(--pro-ink)', stroke: 'none' },
  pillar: (n) => ({ fill: n.color || 'var(--pro-green)', stroke: 'none' }),
  driver: { fill: 'var(--pro-bg)', stroke: 'var(--pro-ink)', strokeWidth: 2.2 },
  sector: { fill: 'var(--pro-faint)', stroke: 'none' },
}

export default function ForceGraph({ nodes, links, height = 720, ariaLabel }) {
  const navigate = useNavigate()
  const [hover, setHover] = useState(null)

  const { pos, size } = useMemo(() => {
    const p = {}
    const center = nodes.find((n) => n.type === 'vision')
    if (center) p[center.id] = { x: 0, y: 0, ang: 0 }

    const ring1 = nodes
      .filter((n) => n.type === 'pillar' || n.type === 'driver')
      .sort((a, b) => (a.type === b.type ? 0 : a.type === 'pillar' ? -1 : 1))
    const sectors = nodes.filter((n) => n.type === 'sector')

    const place = (arr, radius, start) => {
      const n = arr.length || 1
      arr.forEach((node, i) => {
        const ang = (start + (360 / n) * i) * (Math.PI / 180)
        p[node.id] = { x: Math.cos(ang) * radius, y: Math.sin(ang) * radius, ang }
      })
    }
    place(ring1, R1, -90)
    place(sectors, R2, -90 + 360 / (sectors.length || 1) / 2)

    // Extra room on the outer edge for the tangential sector labels.
    return { pos: p, size: R2 + 415 }
  }, [nodes])

  const neighbours = useMemo(() => {
    if (!hover) return null
    const s = new Set([hover])
    links.forEach((l) => {
      const a = l.source.id ?? l.source, b = l.target.id ?? l.target
      if (a === hover) s.add(b)
      if (b === hover) s.add(a)
    })
    return s
  }, [hover, links])

  const vb = `${-size} ${-size} ${size * 2} ${size * 2}`

  return (
    <svg viewBox={vb} className="pro-graph__svg" role="img" aria-label={ariaLabel}
      style={{ width: '100%', height: 'auto', display: 'block', maxWidth: 1040, margin: '0 auto' }}>
      {/* faint guide rings */}
      <circle cx="0" cy="0" r={R1} className="pro-graph__ring" />
      <circle cx="0" cy="0" r={R2} className="pro-graph__ring" />

      {/* connectors (curved toward the centre) */}
      {links.map((l, i) => {
        const a = l.source.id ?? l.source, b = l.target.id ?? l.target
        const s = pos[a], t = pos[b]
        if (!s || !t) return null
        const cx = (s.x + t.x) * 0.5 * 0.55, cy = (s.y + t.y) * 0.5 * 0.55
        const lit = neighbours && neighbours.has(a) && neighbours.has(b)
        const dim = neighbours && !lit
        return (
          <path key={i} d={`M${s.x} ${s.y} Q${cx} ${cy} ${t.x} ${t.y}`} fill="none"
            className={`pro-graph__edge ${lit ? 'is-lit' : ''} ${dim ? 'is-dim' : ''}`} />
        )
      })}

      {/* nodes + labels */}
      {nodes.map((n) => {
        const p = pos[n.id]
        if (!p) return null
        const r = nodeR(n)
        const st = typeof STYLE[n.type] === 'function' ? STYLE[n.type](n) : (STYLE[n.type] || STYLE.sector)
        const dim = neighbours && !neighbours.has(n.id)
        const isCenter = n.type === 'vision'
        const isSector = n.type === 'sector'

        // Label geometry
        const deg = (p.ang * 180) / Math.PI
        const left = Math.cos(p.ang) < 0
        let label
        if (isCenter) {
          label = <text x="0" y={r + 34} textAnchor="middle" className="pro-graph__label pro-graph__label--center">{n.label}</text>
        } else if (isSector) {
          // tangential label reading outward (flip on the left half so it's upright)
          label = (
            <text transform={`rotate(${deg} ${p.x} ${p.y}) ${left ? `rotate(180 ${p.x} ${p.y})` : ''}`}
              x={left ? p.x - (r + 14) : p.x + (r + 14)} y={p.y} dy="0.32em"
              textAnchor={left ? 'end' : 'start'} className="pro-graph__label pro-graph__label--sector">
              {n.label}
            </text>
          )
        } else {
          const off = r + 20
          const near = Math.abs(Math.cos(p.ang)) < 0.34
          const anchor = near ? 'middle' : left ? 'end' : 'start'
          const lx = p.x + Math.cos(p.ang) * off
          const ly = p.y + Math.sin(p.ang) * off + (near ? (Math.sin(p.ang) > 0 ? 24 : -12) : 8)
          label = <text x={lx} y={ly} textAnchor={anchor} className="pro-graph__label pro-graph__label--ring">{n.label}</text>
        }

        return (
          <g key={n.id} className={`pro-graph__node ${dim ? 'is-dim' : ''}`}
            tabIndex={n.to ? 0 : -1} role={n.to ? 'link' : 'img'} aria-label={n.label}
            onClick={() => n.to && navigate(n.to)}
            onKeyDown={(e) => { if (n.to && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); navigate(n.to) } }}
            onMouseEnter={() => setHover(n.id)} onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(n.id)} onBlur={() => setHover(null)}
            style={{ cursor: n.to ? 'pointer' : 'default' }}>
            <circle cx={p.x} cy={p.y} r={r} style={st} />
            {label}
          </g>
        )
      })}
    </svg>
  )
}
