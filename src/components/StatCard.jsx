import { isNumber } from '../lib/format.js'
import CountUp from './CountUp.jsx'

/*
  StatCard - a single figure, editorial style. Big tight number over a thin
  top rule, with a plain-language label and an optional baseline→target line.
  Monochrome; emphasis comes from scale and weight, not colour.
*/
export default function StatCard({ value, unit, label, note, baseline, baselineYear, targetYear }) {
  const display = value === null || value === undefined || value === '' ? '–' : value
  return (
    <article className="stat">
      <div className="stat__value">
        {isNumber(display)
          ? <CountUp className="stat__num" value={Number(display)} />
          : <span className="stat__num">{display}</span>}
        {unit && <span className="stat__unit">{unit}</span>}
      </div>
      <p className="stat__label">{label}</p>
      {isNumber(baseline) && (
        <p className="stat__delta">
          {Number(baseline).toLocaleString('en-US')}{baselineYear ? ` ’${String(baselineYear).slice(2)}` : ''}
          {' → '}{targetYear || 2050}
        </p>
      )}
      {note && <p className="stat__note">{note}</p>}
    </article>
  )
}
