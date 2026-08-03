import { isNumber } from '../lib/format.js'
import { useLang } from '../i18n.jsx'

/*
  TargetList - editorial rows for a set of targets. Each row shows the headline
  figure, the indicator, a plain-language sentence, an optional baseline-to-target
  line, and the source page. Monochrome; reused by pillar/driver pages.
*/
export default function TargetList({ targets = [] }) {
  const { t } = useLang()
  if (!targets.length) return <p className="measure">–</p>
  return (
    <ul className="tlist">
      {targets.map((tg) => {
        const figure = isNumber(tg.target_value) ? tg.target_value : tg.baseline_value
        return (
          <li key={tg.id} className="trow">
            <div className="trow__fig">
              <span className="trow__num">{isNumber(figure) ? Number(figure).toLocaleString('en-US') : '–'}</span>
              {tg.unit && <span className="trow__unit">{tg.unit}</span>}
            </div>
            <div className="trow__body">
              <p className="trow__ind">{tg.indicator}</p>
              {tg.plain_language && <p className="trow__plain">{tg.plain_language}</p>}
              <p className="trow__meta">
                {isNumber(tg.baseline_value) && isNumber(tg.target_value) && (
                  <span>{Number(tg.baseline_value).toLocaleString('en-US')}
                    {tg.baseline_year ? ` (${tg.baseline_year})` : ''} → {tg.target_value.toLocaleString?.() ?? tg.target_value}
                    {tg.target_year ? ` (${tg.target_year})` : ''}</span>
                )}
                {tg.source_page && <span className="trow__src">{t('common.pageAbbr')}{tg.source_page}</span>}
              </p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
