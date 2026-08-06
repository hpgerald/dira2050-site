import { useMemo, useRef, useState } from 'react'

/*
  Reusable knowledge-check engine (base design, no framer-motion). Three question
  types: multiple choice, drag-to-order, and drag-to-match, each with tap and
  keyboard fallbacks. Pass `questions` and optional `ratings` (bands, high to low).
  Pass `ui` to translate the interface chrome (defaults to English), so the same
  engine serves the English-only sections and the bilingual Dira site.

  question shapes:
    { type:'mc', prompt, options:[{id,text}], answer:id, explain }
    { type:'order', prompt, items:[{id,text}], correct:[id...], explain }
    { type:'match', prompt, pairs:[{slot,slotText,tile,tileText}], explain }
*/

const shuffle = (a) => {
  const b = [...a]
  for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]] }
  return b
}

const DEFAULT_RATINGS = [
  { min: 90, name: 'Exceeding', msg: 'Outstanding. You really know this one.' },
  { min: 70, name: 'On Track', msg: 'A solid understanding.' },
  { min: 50, name: 'Needs Improvement', msg: 'A quick re-read will lock it in.' },
  { min: 0, name: 'Off Track', msg: 'Start with the overview and try again.' },
]

const DEFAULT_UI = {
  count: (n, total, score) => `Question ${n} of ${total} · Score ${score}`,
  check: 'Check answer',
  moveUp: 'Move up',
  moveDown: 'Move down',
  allPlaced: 'All placed. Check your answer.',
  dropTile: 'Drop or tap a tile',
  ratingLabel: 'Your rating',
  tryAgain: 'Try again',
  back: 'Back',
  correct: 'Correct.',
  notQuite: 'Not quite.',
  next: 'Next question',
  seeRating: 'See my rating',
}

function MC({ q, onResult, locked }) {
  const [sel, setSel] = useState(null)
  const pick = (id) => { if (locked) return; setSel(id); onResult(id === q.answer) }
  return (
    <ul className="quiz-mc">
      {q.options.map((o) => {
        let cls = o.id === sel ? 'is-sel' : ''
        if (locked) cls = o.id === q.answer ? 'is-right' : (o.id === sel ? 'is-wrong' : '')
        return <li key={o.id}><button type="button" className={`quiz-mc__opt ${cls}`} disabled={locked} onClick={() => pick(o.id)}>{o.text}</button></li>
      })}
    </ul>
  )
}

function OrderQ({ q, onResult, locked, ui }) {
  const [order, setOrder] = useState(() => { let s = shuffle(q.items.map((i) => i.id)); if (s.join() === q.correct.join()) s = shuffle(s); return s })
  const byId = Object.fromEntries(q.items.map((i) => [i.id, i]))
  const drag = useRef(null)
  const move = (from, to) => { if (locked || to < 0 || to >= order.length) return; const a = [...order]; const [x] = a.splice(from, 1); a.splice(to, 0, x); setOrder(a) }
  return (
    <>
      <ul className="quiz-order">
        {order.map((id, i) => {
          const cls = locked ? (q.correct[i] === id ? 'is-right' : 'is-wrong') : ''
          return (
            <li key={id} className={`quiz-order__item ${cls}`} draggable={!locked}
              onDragStart={() => { drag.current = i }} onDragOver={(e) => e.preventDefault()} onDrop={() => { move(drag.current, i); drag.current = null }}>
              <span className="quiz-order__grip" aria-hidden="true">⠿</span>
              <span className="quiz-order__num">{i + 1}</span>
              <span className="quiz-order__text">{byId[id].text}</span>
              <span className="quiz-order__mv">
                <button type="button" disabled={locked || i === 0} onClick={() => move(i, i - 1)} aria-label={ui.moveUp}>↑</button>
                <button type="button" disabled={locked || i === order.length - 1} onClick={() => move(i, i + 1)} aria-label={ui.moveDown}>↓</button>
              </span>
            </li>
          )
        })}
      </ul>
      {!locked && <button type="button" className="btn btn--ghost" onClick={() => onResult(order.join() === q.correct.join())}>{ui.check}</button>}
    </>
  )
}

function MatchQ({ q, onResult, locked, ui }) {
  const tiles = useMemo(() => shuffle(q.pairs.map((p) => ({ id: p.tile, text: p.tileText }))), [q])
  const slots = q.pairs.map((p) => ({ id: p.slot, text: p.slotText, answer: p.tile }))
  const tileById = Object.fromEntries(tiles.map((t) => [t.id, t]))
  const [assign, setAssign] = useState({})
  const [sel, setSel] = useState(null)
  const placed = new Set(Object.values(assign))
  const pool = tiles.filter((t) => !placed.has(t.id))
  const put = (slotId, tileId) => { if (locked) return; setAssign((a) => { const b = { ...a }; for (const k in b) if (b[k] === tileId) delete b[k]; b[slotId] = tileId; return b }); setSel(null) }
  const clickSlot = (slotId) => { if (locked) return; if (sel) put(slotId, sel); else if (assign[slotId]) setAssign((a) => { const b = { ...a }; delete b[slotId]; return b }) }
  const full = Object.keys(assign).length === slots.length
  return (
    <>
      <div className="quiz-pool" aria-label="Answer tiles">
        {pool.length === 0 ? <span className="quiz-pool__empty">{ui.allPlaced}</span>
          : pool.map((t) => <button key={t.id} type="button" className={`quiz-tile ${sel === t.id ? 'is-sel' : ''}`} draggable={!locked} onClick={() => !locked && setSel(sel === t.id ? null : t.id)} onDragStart={() => setSel(t.id)}>{t.text}</button>)}
      </div>
      <ul className="quiz-slots">
        {slots.map((s) => {
          const tid = assign[s.id]
          const cls = locked ? (tid === s.answer ? 'is-right' : 'is-wrong') : (tid ? 'is-filled' : '')
          return (
            <li key={s.id} className="quiz-slotrow">
              <span className="quiz-slot__prompt">{s.text}</span>
              <button type="button" className={`quiz-slot ${cls}`} onClick={() => clickSlot(s.id)} onDragOver={(e) => !locked && e.preventDefault()} onDrop={() => sel && put(s.id, sel)}>
                {tid ? tileById[tid].text : ui.dropTile}
              </button>
            </li>
          )
        })}
      </ul>
      {!locked && <button type="button" className="btn btn--ghost" disabled={!full} onClick={() => onResult(slots.every((s) => assign[s.id] === s.answer))}>{ui.check}</button>}
    </>
  )
}

function Results({ score, total, ratings, onRestart, backTo, backLabel, ui }) {
  const pct = Math.round((score / total) * 100)
  const band = ratings.find((r) => pct >= r.min) || ratings[ratings.length - 1]
  return (
    <div className="quiz-result">
      <p className="cols__label">{ui.ratingLabel}</p>
      <p className="quiz-result__score">{score}<span>/{total}</span></p>
      <p className="quiz-result__band">{band.name}</p>
      <p className="quiz-result__msg">{band.msg}</p>
      <div className="hero__cta">
        <button type="button" className="btn" onClick={onRestart}>{ui.tryAgain}</button>
        {backTo && <a className="btn btn--ghost" href={backTo}>{backLabel || ui.back}</a>}
      </div>
    </div>
  )
}

export default function Quiz({ questions, ratings = DEFAULT_RATINGS, backTo, backLabel, ui: uiProp }) {
  const ui = { ...DEFAULT_UI, ...uiProp }
  const [idx, setIdx] = useState(0)
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const total = questions.length
  const q = questions[idx]

  const onResult = (isC) => { if (checked) return; setChecked(true); setCorrect(isC); if (isC) setScore((s) => s + 1) }
  const next = () => { if (idx + 1 < total) { setIdx(idx + 1); setChecked(false); setCorrect(false) } else setFinished(true) }
  const restart = () => { setIdx(0); setChecked(false); setCorrect(false); setScore(0); setFinished(false) }

  if (finished) return <div className="quiz"><Results score={score} total={total} ratings={ratings} onRestart={restart} backTo={backTo} backLabel={backLabel} ui={ui} /></div>

  return (
    <div className="quiz">
      <div className="quiz__bar" aria-hidden="true"><span style={{ width: `${(idx / total) * 100}%` }} /></div>
      <p className="quiz__count">{ui.count(idx + 1, total, score)}</p>
      <h2 className="quiz__q">{q.prompt}</h2>
      {q.type === 'mc' && <MC key={idx} q={q} onResult={onResult} locked={checked} />}
      {q.type === 'order' && <OrderQ key={idx} q={q} onResult={onResult} locked={checked} ui={ui} />}
      {q.type === 'match' && <MatchQ key={idx} q={q} onResult={onResult} locked={checked} ui={ui} />}
      {checked && <div className={`quiz__fb ${correct ? 'is-right' : 'is-wrong'}`}><strong>{correct ? ui.correct : ui.notQuite}</strong> {q.explain}</div>}
      {checked && <button type="button" className="btn" onClick={next}>{idx + 1 < total ? ui.next : ui.seeRating}</button>}
    </div>
  )
}
