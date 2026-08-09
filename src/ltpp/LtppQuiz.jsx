import { Link } from 'react-router-dom'
import { usePageTitle } from '../usePageTitle.js'
import Reveal from '../components/Reveal.jsx'
import Quiz from '../components/Quiz.jsx'

const QUESTIONS = [
  {
    type: 'mc',
    prompt: 'What is the LTPP 2050?',
    options: [
      { id: 'a', text: "The 25-year roadmap for implementing Vision 2050" },
      { id: 'b', text: 'A single annual budget' },
      { id: 'c', text: 'A sector policy for agriculture' },
      { id: 'd', text: 'A donor-funded programme' },
    ],
    answer: 'a',
    explain: 'Vision 2050 sets the destination; the Long-Term Perspective Plan sets out how to get there over 25 years.',
  },
  {
    type: 'mc',
    prompt: 'What period does the LTPP cover?',
    options: [
      { id: 'a', text: '2026/27 to 2050/51' }, { id: 'b', text: '2020 to 2030' }, { id: 'c', text: '2026 to 2036' }, { id: 'd', text: '2025 to 2075' },
    ],
    answer: 'a',
    explain: 'Twenty-five years, from 2026/27 to 2050/51.',
  },
  {
    type: 'mc',
    prompt: 'Through how many Five-Year Development Plans is it delivered?',
    options: [
      { id: 'a', text: 'Five' }, { id: 'b', text: 'Three' }, { id: 'c', text: 'One' }, { id: 'd', text: 'Ten' },
    ],
    answer: 'a',
    explain: 'Five successive FYDPs (IV to VIII), each carrying one leg of the 25-year journey. FYDP IV is the first.',
  },
  {
    type: 'mc',
    prompt: 'Roughly how much investment does the plan require?',
    options: [
      { id: 'a', text: 'About US$3.6 trillion' }, { id: 'b', text: 'About US$183 billion' }, { id: 'c', text: 'About US$1 billion' }, { id: 'd', text: 'About US$500 billion' },
    ],
    answer: 'a',
    explain: 'About US$3.6 trillion over 25 years, mostly from the private sector, to reach a one-trillion-dollar economy.',
  },
  {
    type: 'order',
    prompt: 'Order the four levels of the architecture from the base up.',
    items: [
      { id: 'f', text: 'Foundation (governance, peace, stability)' },
      { id: 'p', text: 'Pillars' },
      { id: 'd', text: 'Drivers' },
      { id: 's', text: 'Transformative sectors' },
    ],
    correct: ['f', 'p', 'd', 's'],
    explain: 'Foundation, pillars, drivers and transformative sectors, mutually reinforcing, not a simple ladder.',
  },
  {
    type: 'match',
    prompt: 'Match each part of the 3i strategy to what it does.',
    pairs: [
      { slot: 'p1', slotText: 'Investment', tile: 't1', tileText: 'Mobilise capital at scale' },
      { slot: 'p2', slotText: 'Infusion', tile: 't2', tileText: 'Build local capability from that investment' },
      { slot: 'p3', slotText: 'Innovation', tile: 't3', tileText: 'Turn capability into a knowledge economy' },
    ],
    explain: 'Investment, Infusion and Innovation reinforce one another; none can succeed alone.',
  },
  {
    type: 'mc',
    prompt: 'How does the plan expect the economy to be structured by 2050?',
    options: [
      { id: 'a', text: 'Industry & construction ~40%, services ~45%, agriculture ~15%' },
      { id: 'b', text: 'Agriculture 50%, services 30%, industry 20%' },
      { id: 'c', text: 'Services 80%, everything else 20%' },
      { id: 'd', text: 'Unchanged from today' },
    ],
    answer: 'a',
    explain: 'A structural shift toward industry and high-value services, with agriculture smaller in share but far more productive.',
  },
  {
    type: 'mc',
    prompt: 'Which institution anchors implementation of the plan?',
    options: [
      { id: 'a', text: 'The National Planning Commission' },
      { id: 'b', text: 'The central bank' },
      { id: 'c', text: 'Development partners' },
      { id: 'd', text: 'Parliament alone' },
    ],
    answer: 'a',
    explain: 'The National Planning Commission is the anchor institution, with results-based monitoring, evaluation and accountability throughout.',
  },
]

const RATINGS = [
  { min: 88, name: 'Chief Planner', msg: 'Outstanding. You grasp how the 25-year plan fits together.' },
  { min: 63, name: 'On track', msg: 'A solid understanding of the roadmap.' },
  { min: 38, name: 'Getting there', msg: 'A quick re-read of the overview will lock it in.' },
  { min: 0, name: 'Just starting', msg: 'Begin with the LTPP overview and try again.' },
]

export default function LtppQuiz() {
  usePageTitle('Knowledge check · LTPP 2050', 'A short quiz on the 25-year plan: its roadmap, architecture, 3i strategy and financing.')
  return (
    <div className="container section stack">
      <section className="cols">
        <div className="cols__label">Knowledge check</div>
        <div>
          <h1>How well do you know the LTPP?</h1>
          <p className="lede measure">A short quiz across the 25-year plan: its roadmap, architecture, the 3i strategy and financing.</p>
        </div>
      </section>

      <hr className="rule rule--strong" />

      <Quiz questions={QUESTIONS} ratings={RATINGS} backTo="/ltpp" backLabel="Back to overview" />
    </div>
  )
}
