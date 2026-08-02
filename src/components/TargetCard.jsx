import { isNumber } from '../lib/format.js'
import { useLang } from '../i18n.jsx'

/*
  TargetCard - an Information-is-Beautiful-style comparison, in monochrome.
  "now" (baseline, grey) vs "2050" (target, black) as proportional bars. Falls
  back to a plain figure when there aren't two comparable numbers. Numbers are
  also in text, so bars are aria-hidden and the card stays screen-reader complete.
*/
const n = (v) => (isNumber(v) ? Number(v) : null)
const fmt = (v) => Number(v).toLocaleString('en-US')

export default function TargetCard({ t: tg }) {
  const { t } = useLang()
  const b = n(tg.baseline_value)
  const tgt = n(tg.target_value)
  const pct = /%|per|asili/i.test(tg.unit || '')

  let mode = 'none'
  let scale = 1
  if (b !== null && tgt !== null) { mode = 'dual'; scale = Math.max(b, tgt) || 1 }
  else if (tgt !== null && pct) { mode = 'single'; scale = 100 }
  const figure = tgt !== null ? tgt : b

  function tag() {
    if (tgt === 0) return t('targets.tagEliminate')
    if (tg.direction === 'decrease') return t('targets.tagReduce')
    if (b !== null && tgt !== null && b > 0 && tgt / b >= 2) return `${t('targets.tagGrow')} ×${(tgt / b).toFixed(1)}`
    return t('targets.tagIncrease')
  }

  return (
    <article className="tc">
      <div className="tc__head">
        <p className="tc__ind">{tg.indicator}</p>
        {mode !== 'none' && <span className="tc__tag">{tag()}</span>}
      </div>

      {mode === 'dual' && (
        <div className="tc__bars" aria-hidden="true">
          <div className="tc__bar">
            <span className="tc__k">{t('targets.now')}{tg.baseline_year ? ` ’${String(tg.baseline_year).slice(2)}` : ''}</span>
            <span className="tc__track"><span className="tc__fill tc__fill--now" style={{ width: `${(b / scale) * 100}%` }} /></span>
            <span className="tc__val">{fmt(b)}</span>
          </div>
          <div className="tc__bar">
            <span className="tc__k">{t('targets.goal')}</span>
            <span className="tc__track"><span className="tc__fill tc__fill--goal" style={{ width: `${(tgt / scale) * 100}%` }} /></span>
            <span className="tc__val tc__val--goal">{fmt(tgt)}</span>
          </div>
        </div>
      )}

      {mode === 'single' && (
        <div className="tc__bars" aria-hidden="true">
          <div className="tc__bar">
            <span className="tc__k">{t('targets.goal')}</span>
            <span className="tc__track"><span className="tc__fill tc__fill--goal" style={{ width: `${(tgt / scale) * 100}%` }} /></span>
            <span className="tc__val tc__val--goal">{fmt(tgt)}</span>
          </div>
          <p className="tc__scale">{t('targets.of')} {scale}{tg.unit?.includes('%') ? '%' : ''}</p>
        </div>
      )}

      {mode === 'none' && (
        <div className="tc__figure">
          <span className="tc__big">{isNumber(figure) ? fmt(figure) : '–'}</span>
          {tg.unit && <span className="tc__unit">{tg.unit}</span>}
        </div>
      )}

      {mode !== 'none' && tg.unit && <p className="tc__unitline">{tg.unit}</p>}
      {tg.plain_language && <p className="tc__plain">{tg.plain_language}</p>}
      {tg.source_page && <p className="tc__src">{t('common.sourceCite')}{tg.source_page}</p>}
    </article>
  )
}
