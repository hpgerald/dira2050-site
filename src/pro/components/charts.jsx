import { hierarchy, treemap } from 'd3-hierarchy'
import { sankey, sankeyLinkHorizontal } from 'd3-sankey'

const fmt = (v) => Number(v).toLocaleString('en-US')

/*
  Advanced chart library (Phase 11). Each chart answers a specific question and
  is drawn in the PRO green/neutral palette. Layout maths run synchronously
  (deterministic, cheap); rendering is plain React SVG.
*/

// Treemap - magnitude by area. data = [{ name, value, label }].
export function Treemap({ data, W = 680, H = 300, ariaLabel }) {
  const root = hierarchy({ children: data }).sum((d) => d.value).sort((a, b) => b.value - a.value)
  treemap().size([W, H]).paddingInner(3).round(true)(root)
  const max = Math.max(...data.map((d) => d.value), 1)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="pro-chart__svg" role="img" aria-label={ariaLabel} style={{ width: '100%', height: 'auto', display: 'block', maxWidth: 820, margin: '0 auto' }}>
      {root.leaves().map((l, i) => {
        const w = l.x1 - l.x0, h = l.y1 - l.y0
        const op = 0.28 + 0.68 * (l.value / max)
        const light = op > 0.52
        return (
          <g key={i}>
            <rect x={l.x0} y={l.y0} width={w} height={h} fill="var(--pro-green)" fillOpacity={op} />
            {w > 66 && h > 30 && <text x={l.x0 + 9} y={l.y0 + 21} fontSize="13" fontWeight="700" fill={light ? '#fff' : 'var(--pro-ink)'}>{l.data.name}</text>}
            {w > 66 && h > 48 && <text x={l.x0 + 9} y={l.y0 + 38} fontSize="12" fill={light ? 'rgba(255,255,255,.88)' : 'var(--pro-soft)'}>{l.data.label}</text>}
          </g>
        )
      })}
    </svg>
  )
}

// Sankey - flow structure. drivers=[{id,name}], sectorName(id)->string, edges={driverId:[sectorId,...]}.
export function SankeyFlow({ drivers, sectorName, edges, W = 680, H = 360, ariaLabel }) {
  const secIds = []
  Object.values(edges).flat().forEach((s) => { if (!secIds.includes(s)) secIds.push(s) })
  const nodes = [
    ...drivers.map((d) => ({ key: `d-${d.id}`, name: d.name })),
    ...secIds.map((s) => ({ key: `s-${s}`, name: sectorName(s) })),
  ]
  const idx = Object.fromEntries(nodes.map((n, i) => [n.key, i]))
  const links = []
  Object.entries(edges).forEach(([d, secs]) => secs.forEach((s) => {
    if (idx[`d-${d}`] != null && idx[`s-${s}`] != null) links.push({ source: idx[`d-${d}`], target: idx[`s-${s}`], value: 1 })
  }))
  const g = sankey().nodeWidth(12).nodePadding(14).extent([[4, 8], [W - 4, H - 8]])({
    nodes: nodes.map((n) => ({ ...n })),
    links: links.map((l) => ({ ...l })),
  })
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="pro-chart__svg" role="img" aria-label={ariaLabel} style={{ width: '100%', height: 'auto', display: 'block', maxWidth: 880, margin: '0 auto' }}>
      {g.links.map((l, i) => (
        <path key={i} d={sankeyLinkHorizontal()(l)} fill="none" stroke="var(--pro-green)" strokeOpacity="0.22" strokeWidth={Math.max(1.5, l.width)} />
      ))}
      {g.nodes.map((n, i) => {
        const left = n.x0 < W / 2
        return (
          <g key={i}>
            <rect x={n.x0} y={n.y0} width={n.x1 - n.x0} height={Math.max(2, n.y1 - n.y0)} fill="var(--pro-ink)" rx="2" />
            <text x={left ? n.x1 + 7 : n.x0 - 7} y={(n.y0 + n.y1) / 2} dy="0.32em" textAnchor={left ? 'start' : 'end'} fontSize="12" fontWeight="600" fill="var(--pro-ink)">{n.name}</text>
          </g>
        )
      })}
    </svg>
  )
}

// Small multiples - every target's leap. items = [{ label, now, goal }].
export function SmallMultiples({ items, nowLabel, goalLabel }) {
  return (
    <div className="pro-sm">
      {items.map((it, i) => {
        const max = Math.max(it.now, it.goal) || 1
        return (
          <div key={i} className="pro-sm__cell">
            <p className="pro-sm__label">{it.label}</p>
            <div className="pro-sm__bar"><span className="pro-sm__k">{nowLabel}</span><span className="pro-sm__track"><span className="pro-sm__fill pro-sm__fill--now" style={{ width: `${(it.now / max) * 100}%` }} /></span><span className="pro-sm__v">{fmt(it.now)}</span></div>
            <div className="pro-sm__bar"><span className="pro-sm__k">{goalLabel}</span><span className="pro-sm__track"><span className="pro-sm__fill pro-sm__fill--goal" style={{ width: `${(it.goal / max) * 100}%` }} /></span><span className="pro-sm__v">{fmt(it.goal)}</span></div>
          </div>
        )
      })}
    </div>
  )
}
