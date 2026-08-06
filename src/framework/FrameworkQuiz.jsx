import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '../usePageTitle.js'
import Reveal from '../components/Reveal.jsx'

/*
  Knowledge check for the National Delivery Framework. Base design, no PRO deps.
  Three interaction types: multiple choice, drag-to-order, and drag-to-match
  (all with tap and keyboard fallbacks). Covers the whole section; the final
  rating reuses the document's own performance bands.
*/

const shuffle = (a) => {
  const b = [...a]
  for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]] }
  return b
}

const QUESTIONS = [
  {
    type: 'mc',
    prompt: 'The Framework changes how government works. From what, to what?',
    options: [
      { id: 'a', text: 'From planning to budgeting' },
      { id: 'b', text: 'From reporting on the past to delivering results' },
      { id: 'c', text: 'From national control to local control' },
      { id: 'd', text: 'From annual plans to monthly plans' },
    ],
    answer: 'b',
    explain: 'It moves the focus from reporting activities to actively managing delivery.',
  },
  {
    type: 'order',
    prompt: 'Put the three-phase delivery cycle in the right order.',
    items: [
      { id: 's', text: 'Strategic Direction and Prioritisation' },
      { id: 'l', text: 'Delivery Labs (implementation planning)' },
      { id: 'p', text: 'Performance Management and Results Delivery' },
    ],
    correct: ['s', 'l', 'p'],
    explain: 'Decide what matters, plan how to deliver it, then manage performance until results arrive.',
  },
  {
    type: 'match',
    prompt: 'Match each priority area to what it tracks.',
    pairs: [
      { slot: 'i', slotText: 'Area I', tile: 'gov', tileText: 'Governance & civil service' },
      { slot: 'ii', slotText: 'Area II', tile: 'trans', tileText: 'Investment & transformation' },
      { slot: 'iii', slotText: 'Area III', tile: 'out', tileText: 'Socio-economic & environmental outcomes' },
    ],
    explain: 'I fixes the foundations, II turns reform into growth, III delivers for people.',
  },
  {
    type: 'mc',
    prompt: 'What does the 3i pathway stand for?',
    options: [
      { id: 'a', text: 'Investment, Infusion, Innovation' },
      { id: 'b', text: 'Invest, Improve, Inspect' },
      { id: 'c', text: 'Income, Industry, Infrastructure' },
      { id: 'd', text: 'Ideas, Investment, Impact' },
    ],
    answer: 'a',
    explain: 'Mobilise investment, infuse technology and knowledge, then innovate to lift productivity.',
  },
  {
    type: 'order',
    prompt: 'Order the national plan chain, from the destination down to the yearly plan.',
    items: [
      { id: 'v', text: 'Vision 2050' },
      { id: 'ltpp', text: 'Long Term Perspective Plan' },
      { id: 'fydp', text: 'Five-Year Development Plans' },
      { id: 'adp', text: 'Annual Development Plans' },
    ],
    correct: ['v', 'ltpp', 'fydp', 'adp'],
    explain: 'The Vision sets the destination; each layer below turns it into budgets and actions.',
  },
  {
    type: 'mc',
    prompt: 'FYDP IV is running now. Which years does it cover?',
    options: [
      { id: 'a', text: '2026/27 to 2030/31' },
      { id: 'b', text: '2025 to 2050' },
      { id: 'c', text: '2031/32 to 2035/36' },
      { id: 'd', text: '2026 to 2051' },
    ],
    answer: 'a',
    explain: 'FYDP IV is the first of five five-year plans across the 25-year horizon.',
  },
  {
    type: 'match',
    prompt: 'Who does what in the delivery system?',
    pairs: [
      { slot: 'cab', slotText: 'Cabinet', tile: 'sd', tileText: 'Sets strategic direction' },
      { slot: 'npc', slotText: 'National Planning Commission', tile: 'ca', tileText: 'Central authority' },
      { slot: 'ed', slotText: 'e-Delivery', tile: 'dp', tileText: 'Digital results platform' },
      { slot: 'lga', slotText: 'Local Government Authorities', tile: 'ld', tileText: 'Deliver locally' },
    ],
    explain: 'Roles run from Cabinet down to the council, all reporting into e-Delivery.',
  },
  {
    type: 'mc',
    prompt: 'A programme is rated “Off Track”. What happens next?',
    options: [
      { id: 'a', text: 'It waits for the annual report' },
      { id: 'b', text: 'It is escalated for corrective action' },
      { id: 'c', text: 'It is quietly dropped from the plan' },
      { id: 'd', text: 'Nothing until the next plan' },
    ],
    answer: 'b',
    explain: 'Ratings trigger corrective action and escalation, not a year-end surprise.',
  },
  {
    type: 'order',
    prompt: 'Order the scorecard ratings, best to worst.',
    items: [
      { id: 'e', text: 'Exceeding' },
      { id: 'o', text: 'On Track' },
      { id: 'n', text: 'Needs Improvement' },
      { id: 'f', text: 'Off Track' },
    ],
    correct: ['e', 'o', 'n', 'f'],
    explain: 'Every indicator is scored and grouped into one of these four bands.',
  },
  {
    type: 'mc',
    prompt: 'Which principle explains fixing governance before scaling up?',
    options: [
      { id: 'a', text: '“Do First What Unlocks the Rest”' },
      { id: 'b', text: '“Move Fast and Break Things”' },
      { id: 'c', text: '“Plan for the Worst”' },
      { id: 'd', text: '“Measure Twice, Cut Once”' },
    ],
    answer: 'a',
    explain: 'Remove the key constraints first, so later investments can succeed.',
  },
]

function MC({ q, onResult, locked }) {
  const [sel, setSel] = useState(null)
  const pick = (id) => { if (locked) return; setSel(id); onResult(id === q.answer) }
  return (
    <ul className="quiz-mc">
      {q.options.map((o) => {
        let cls = o.id === sel ? 'is-sel' : ''
        if (locked) cls = o.id === q.answer ? 'is-right' : (o.id === sel ? 'is-wrong' : '')
        return (
          <li key={o.id}>
            <button type="button" className={`quiz-mc__opt ${cls}`} disabled={locked} onClick={() => pick(o.id)}>{o.text}</button>
          </li>
        )
      })}
    </ul>
  )
}

function OrderQ({ q, onResult, locked }) {
  const [order, setOrder] = useState(() => {
    let s = shuffle(q.items.map((i) => i.id))
    if (s.join() === q.correct.join()) s = shuffle(s)
    return s
  })
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
              onDragStart={() => { drag.current = i }} onDragOver={(e) => e.preventDefault()}
              onDrop={() => { move(drag.current, i); drag.current = null }}>
              <span className="quiz-order__grip" aria-hidden="true">⠿</span>
              <span className="quiz-order__num">{i + 1}</span>
              <span className="quiz-order__text">{byId[id].text}</span>
              <span className="quiz-order__mv">
                <button type="button" disabled={locked || i === 0} onClick={() => move(i, i - 1)} aria-label="Move up">↑</button>
                <button type="button" disabled={locked || i === order.length - 1} onClick={() => move(i, i + 1)} aria-label="Move down">↓</button>
              </span>
            </li>
          )
        })}
      </ul>
      {!locked && <button type="button" className="btn btn--ghost" onClick={() => onResult(order.join() === q.correct.join())}>Check answer</button>}
    </>
  )
}

function MatchQ({ q, onResult, locked }) {
  const tiles = useMemo(() => shuffle(q.pairs.map((p) => ({ id: p.tile, text: p.tileText }))), [q])
  const slots = q.pairs.map((p) => ({ id: p.slot, text: p.slotText, answer: p.tile }))
  const tileById = Object.fromEntries(tiles.map((t) => [t.id, t]))
  const [assign, setAssign] = useState({})
  const [sel, setSel] = useState(null)
  const placed = new Set(Object.values(assign))
  const pool = tiles.filter((t) => !placed.has(t.id))
  const put = (slotId, tileId) => {
    if (locked) return
    setAssign((a) => { const b = { ...a }; for (const k in b) if (b[k] === tileId) delete b[k]; b[slotId] = tileId; return b })
    setSel(null)
  }
  const clickSlot = (slotId) => {
    if (locked) return
    if (sel) put(slotId, sel)
    else if (assign[slotId]) setAssign((a) => { const b = { ...a }; delete b[slotId]; return b })
  }
  const full = Object.keys(assign).length === slots.length
  return (
    <>
      <div className="quiz-pool" aria-label="Answer tiles">
        {pool.length === 0 ? <span className="quiz-pool__empty">All placed. Check your answer.</span>
          : pool.map((t) => (
            <button key={t.id} type="button" className={`quiz-tile ${sel === t.id ? 'is-sel' : ''}`} draggable={!locked}
              onClick={() => !locked && setSel(sel === t.id ? null : t.id)} onDragStart={() => setSel(t.id)}>{t.text}</button>
          ))}
      </div>
      <ul className="quiz-slots">
        {slots.map((s) => {
          const tid = assign[s.id]
          const cls = locked ? (tid === s.answer ? 'is-right' : 'is-wrong') : (tid ? 'is-filled' : '')
          return (
            <li key={s.id} className="quiz-slotrow">
              <span className="quiz-slot__prompt">{s.text}</span>
              <button type="button" className={`quiz-slot ${cls}`} onClick={() => clickSlot(s.id)}
                onDragOver={(e) => !locked && e.preventDefault()} onDrop={() => sel && put(s.id, sel)}>
                {tid ? tileById[tid].text : 'Drop or tap a tile'}
              </button>
            </li>
          )
        })}
      </ul>
      {!locked && <button type="button" className="btn btn--ghost" disabled={!full} onClick={() => onResult(slots.every((s) => assign[s.id] === s.answer))}>Check answer</button>}
    </>
  )
}

function Results({ score, total, onRestart }) {
  const pct = Math.round((score / total) * 100)
  const band = pct >= 90 ? { name: 'Exceeding', msg: 'You could run the Delivery Lab yourself.' }
    : pct >= 70 ? { name: 'On Track', msg: 'A solid grasp of how delivery works.' }
      : pct >= 50 ? { name: 'Needs Improvement', msg: 'A quick re-read will lock it in.' }
        : { name: 'Off Track', msg: 'Start with the overview, then try again.' }
  return (
    <div className="quiz-result">
      <p className="cols__label">Your rating</p>
      <p className="quiz-result__score">{score}<span>/{total}</span></p>
      <p className="quiz-result__band">{band.name}</p>
      <p className="quiz-result__msg">{band.msg}</p>
      <div className="hero__cta">
        <button type="button" className="btn" onClick={onRestart}>Try again</button>
        <Link className="btn btn--ghost" to="/framework">Back to overview</Link>
      </div>
    </div>
  )
}

export default function FrameworkQuiz() {
  usePageTitle('Knowledge check · National Framework', 'Test how well you understood the National Delivery Framework.')
  const [idx, setIdx] = useState(0)
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const total = QUESTIONS.length
  const q = QUESTIONS[idx]

  const onResult = (isC) => { if (checked) return; setChecked(true); setCorrect(isC); if (isC) setScore((s) => s + 1) }
  const next = () => { if (idx + 1 < total) { setIdx(idx + 1); setChecked(false); setCorrect(false) } else setFinished(true) }
  const restart = () => { setIdx(0); setChecked(false); setCorrect(false); setScore(0); setFinished(false) }

  return (
    <div className="container section stack">
      <Reveal as="section" className="cols">
        <div className="cols__label">Knowledge check</div>
        <div>
          <h1>Think you’ve got it?</h1>
          <p className="lede measure">Ten quick questions on the National Delivery Framework. Tap, drag, and drop your way through, then get your rating.</p>
        </div>
      </Reveal>

      <hr className="rule rule--strong" />

      <div className="quiz">
        {finished ? (
          <Results score={score} total={total} onRestart={restart} />
        ) : (
          <>
            <div className="quiz__bar" aria-hidden="true"><span style={{ width: `${(idx / total) * 100}%` }} /></div>
            <p className="quiz__count">Question {idx + 1} of {total} · Score {score}</p>
            <h2 className="quiz__q">{q.prompt}</h2>
            {q.type === 'mc' && <MC key={idx} q={q} onResult={onResult} locked={checked} />}
            {q.type === 'order' && <OrderQ key={idx} q={q} onResult={onResult} locked={checked} />}
            {q.type === 'match' && <MatchQ key={idx} q={q} onResult={onResult} locked={checked} />}
            {checked && (
              <div className={`quiz__fb ${correct ? 'is-right' : 'is-wrong'}`}>
                <strong>{correct ? 'Correct.' : 'Not quite.'}</strong> {q.explain}
              </div>
            )}
            {checked && <button type="button" className="btn" onClick={next}>{idx + 1 < total ? 'Next question' : 'See my rating'}</button>}
          </>
        )}
      </div>
    </div>
  )
}
