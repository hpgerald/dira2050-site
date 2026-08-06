/*
  25-year plan timeline (base design, monochrome SVG). Shows the Vision launch,
  the Long Term Perspective Plan span, and the five Five-Year Development Plans
  from 2026 to 2051, with FYDP IV (the current phase) highlighted.
*/
const W = 1000, PADL = 46, PADR = 34
const MINY = 2025, MAXY = 2051
const x = (y) => PADL + ((y - MINY) / (MAXY - MINY)) * (W - PADL - PADR)

export default function PlanTimeline({ plans }) {
  const ltpp = plans.find((p) => p.kind === 'span')
  const blocks = plans.filter((p) => p.kind === 'block')
  const ticks = [2025, 2030, 2035, 2040, 2045, 2050]
  const bTop = 66, bH = 58, axisY = 140

  return (
    <svg viewBox="0 0 1000 176" className="ptl" role="img"
      aria-label="Tanzania's development plans from 2025 to 2051: Vision 2050, the Long Term Perspective Plan, and five Five-Year Development Plans.">
      {/* Vision marker */}
      <circle cx={x(2025)} cy={34} r="6" fill="var(--black)" />
      <text x={x(2025)} y={22} className="ptl__label" textAnchor="start">Vision 2050 · launched 2025</text>

      {/* LTPP span */}
      {ltpp && (
        <>
          <text x={(x(ltpp.start) + x(ltpp.end)) / 2} y={22} className="ptl__label" textAnchor="middle">Long Term Perspective Plan · {ltpp.start}–{ltpp.end}</text>
          <line x1={x(ltpp.start)} y1={40} x2={x(ltpp.end)} y2={40} className="ptl__span" />
          <line x1={x(ltpp.start)} y1={34} x2={x(ltpp.start)} y2={46} className="ptl__span" />
          <line x1={x(ltpp.end)} y1={34} x2={x(ltpp.end)} y2={46} className="ptl__span" />
        </>
      )}

      {/* FYDP blocks */}
      {blocks.map((b) => {
        const x0 = x(b.start) + 2, w = x(b.end) - x(b.start) - 4
        const roman = b.name.replace(/^FYDP\s*/, '')
        const cur = String(b.current) === '1'
        const cx = x0 + w / 2
        return (
          <g key={b.id}>
            <rect x={x0} y={bTop} width={w} height={bH} className={`ptl__block ${cur ? 'is-current' : ''}`} />
            <text x={cx} y={bTop + 26} textAnchor="middle" className="ptl__roman" fill={cur ? 'var(--white)' : 'var(--black)'}>{roman}</text>
            <text x={cx} y={bTop + 44} textAnchor="middle" className="ptl__yr" fill={cur ? 'var(--white)' : 'var(--ink-soft)'}>{b.start}–{String(b.end).slice(2)}</text>
          </g>
        )
      })}

      {/* Axis */}
      <line x1={PADL} y1={axisY} x2={W - PADR} y2={axisY} className="ptl__axis" />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={x(t)} y1={axisY} x2={x(t)} y2={axisY + 6} className="ptl__axis" />
          <text x={x(t)} y={axisY + 20} textAnchor="middle" className="ptl__tick">{t}</text>
        </g>
      ))}
    </svg>
  )
}
