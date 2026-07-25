import { isNumber } from '../lib/format.js'

/*
  TargetList — editorial rows for a set of targets. Each row shows the headline
  figure, the indicator, a plain-language sentence, an optional baseline→target
  line, and the source page. Monochrome; reused by pillar/driver pages and the
  targets dashboard (Phase 6).
*/
export default function TargetList({ targets = [] }) {
  if (!targets.length) return <p className="measure">No specific figures listed for this section.</p>
  return (
    <ul className="tlist">
      {targets.map((t) => {
        const figure = isNumber(t.target_value) ? t.target_value : t.baseline_value
        return (
          <li key={t.id} className="trow">
            <div className="trow__fig">
              <span className="trow__num">{isNumber(figure) ? Number(figure).toLocaleString('en-US') : '—'}</span>
              {t.unit && <span className="trow__unit">{t.unit}</span>}
            </div>
            <div className="trow__body">
              <p className="trow__ind">{t.indicator}</p>
              {t.plain_language && <p className="trow__plain">{t.plain_language}</p>}
              <p className="trow__meta">
                {isNumber(t.baseline_value) && isNumber(t.target_value) && (
                  <span>{Number(t.baseline_value).toLocaleString('en-US')}
                    {t.baseline_year ? ` (${t.baseline_year})` : ''} → {t.target_value.toLocaleString?.() ?? t.target_value}
                    {t.target_year ? ` (${t.target_year})` : ''}</span>
                )}
                {t.source_page && <span className="trow__src">p.{t.source_page}</span>}
              </p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
