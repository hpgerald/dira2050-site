import { isNumber } from '../lib/format.js'

/*
  TargetCard — an Information-is-Beautiful-style comparison, in monochrome.
  Shows "now" (baseline, grey) vs "2050" (target, black) as proportional bars so
  the magnitude of the change is visible, not just stated. Falls back to a plain
  figure when there aren't two comparable numbers. All numbers are also in text,
  so the bars are decorative (aria-hidden) and the card stays screen-reader complete.
*/
const n = (v) => (isNumber(v) ? Number(v) : null)
const fmt = (v) => Number(v).toLocaleString('en-US')

function tag(t, b, tgt) {
  if (tgt === 0) return 'Eliminate'
  if (t.direction === 'decrease') return 'Reduce'
  if (b !== null && tgt !== null && b > 0 && tgt / b >= 2) return `Grow ×${(tgt / b).toFixed(1)}`
  return 'Increase'
}

export default function TargetCard({ t }) {
  const b = n(t.baseline_value)
  const tgt = n(t.target_value)
  const pct = /%|per/i.test(t.unit || '')

  let mode = 'none'
  let scale = 1
  if (b !== null && tgt !== null) { mode = 'dual'; scale = Math.max(b, tgt) || 1 }
  else if (tgt !== null && pct) { mode = 'single'; scale = 100 }

  const figure = tgt !== null ? tgt : b

  return (
    <article className="tc">
      <div className="tc__head">
        <p className="tc__ind">{t.indicator}</p>
        {mode !== 'none' && <span className="tc__tag">{tag(t, b, tgt)}</span>}
      </div>

      {mode === 'dual' && (
        <div className="tc__bars" aria-hidden="true">
          <div className="tc__bar">
            <span className="tc__k">Now{t.baseline_year ? ` ’${String(t.baseline_year).slice(2)}` : ''}</span>
            <span className="tc__track"><span className="tc__fill tc__fill--now" style={{ width: `${(b / scale) * 100}%` }} /></span>
            <span className="tc__val">{fmt(b)}</span>
          </div>
          <div className="tc__bar">
            <span className="tc__k">2050</span>
            <span className="tc__track"><span className="tc__fill tc__fill--goal" style={{ width: `${(tgt / scale) * 100}%` }} /></span>
            <span className="tc__val tc__val--goal">{fmt(tgt)}</span>
          </div>
        </div>
      )}

      {mode === 'single' && (
        <div className="tc__bars" aria-hidden="true">
          <div className="tc__bar">
            <span className="tc__k">2050</span>
            <span className="tc__track"><span className="tc__fill tc__fill--goal" style={{ width: `${(tgt / scale) * 100}%` }} /></span>
            <span className="tc__val tc__val--goal">{fmt(tgt)}</span>
          </div>
          <p className="tc__scale">of {scale}{t.unit?.includes('%') ? '%' : ''}</p>
        </div>
      )}

      {mode === 'none' && (
        <div className="tc__figure">
          <span className="tc__big">{isNumber(figure) ? fmt(figure) : '—'}</span>
          {t.unit && <span className="tc__unit">{t.unit}</span>}
        </div>
      )}

      {mode !== 'none' && t.unit && <p className="tc__unitline">{t.unit}</p>}
      {t.plain_language && <p className="tc__plain">{t.plain_language}</p>}
      {t.source_page && <p className="tc__src">Vision 2050, p.{t.source_page}</p>}
    </article>
  )
}
