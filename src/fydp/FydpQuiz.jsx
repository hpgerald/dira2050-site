import { usePageTitle } from '../usePageTitle.js'
import Reveal from '../components/Reveal.jsx'
import Quiz from '../components/Quiz.jsx'

const QUESTIONS = [
  {
    type: 'mc',
    prompt: 'FYDP IV is the first of how many five-year plans delivering Vision 2050?',
    options: [
      { id: 'a', text: 'Five' }, { id: 'b', text: 'Three' }, { id: 'c', text: 'Ten' }, { id: 'd', text: 'Just this one' },
    ],
    answer: 'a',
    explain: 'Five plans (FYDP IV to VIII) carry the Vision from 2026 to 2050.',
  },
  {
    type: 'mc',
    prompt: 'What size economy does FYDP IV aim for by 2030/31?',
    options: [
      { id: 'a', text: 'USD 118 billion' }, { id: 'b', text: 'USD 1 trillion' }, { id: 'c', text: 'USD 50 billion' }, { id: 'd', text: 'USD 300 billion' },
    ],
    answer: 'a',
    explain: 'USD 118 billion by 2030/31, on the path to the trillion-dollar 2050 goal.',
  },
  {
    type: 'mc',
    prompt: 'How many new decent jobs is the plan targeting?',
    options: [
      { id: 'a', text: '8.5 million' }, { id: 'b', text: '1 million' }, { id: 'c', text: '25 million' }, { id: 'd', text: '500,000' },
    ],
    answer: 'a',
    explain: '8.5 million new decent jobs, especially for youth and women.',
  },
  {
    type: 'order',
    prompt: 'Order the financing sources from largest to smallest.',
    items: [
      { id: 'p', text: 'Private sector (68%)' },
      { id: 'g', text: 'Government (24%)' },
      { id: 'd', text: 'Development partners (8%)' },
    ],
    correct: ['p', 'g', 'd'],
    explain: 'The private sector is expected to provide most of the TZS 477.7 trillion.',
  },
  {
    type: 'mc',
    prompt: 'Who is expected to provide most of the financing?',
    options: [
      { id: 'a', text: 'The private sector' }, { id: 'b', text: 'The government' }, { id: 'c', text: 'Foreign aid' }, { id: 'd', text: 'The central bank' },
    ],
    answer: 'a',
    explain: 'About 68% is expected from the private sector, through a blend of instruments.',
  },
  {
    type: 'match',
    prompt: 'Match each flagship programme to its focus.',
    pairs: [
      { slot: 'lindi', slotText: 'Lindi', tile: 'gas', tileText: 'Liquefied natural gas' },
      { slot: 'dodoma', slotText: 'Dodoma', tile: 'min', tileText: 'Critical minerals & tech' },
      { slot: 'bagamoyo', slotText: 'Bagamoyo', tile: 'port', tileText: 'Eco-maritime port city' },
      { slot: 'irrigation', slotText: 'National programme', tile: 'agri', tileText: 'Irrigation & agro-industry' },
    ],
    explain: 'Each flagship anchors a different engine of growth.',
  },
  {
    type: 'mc',
    prompt: 'What does the 3i pathway stand for?',
    options: [
      { id: 'a', text: 'Investment, Infusion, Innovation' }, { id: 'b', text: 'Income, Industry, Infrastructure' }, { id: 'c', text: 'Invest, Improve, Inspect' }, { id: 'd', text: 'Ideas, Impact, Inclusion' },
    ],
    answer: 'a',
    explain: 'Mobilise investment, infuse technology and knowledge, then innovate for productivity.',
  },
  {
    type: 'mc',
    prompt: 'Roughly what real GDP growth rate is FYDP IV aiming for?',
    options: [
      { id: 'a', text: 'About 10.5%' }, { id: 'b', text: 'About 3%' }, { id: 'c', text: 'About 25%' }, { id: 'd', text: 'About 5.5%' },
    ],
    answer: 'a',
    explain: 'Roughly double recent growth, sustained across the plan.',
  },
  {
    type: 'match',
    prompt: 'Match each reform track to what it focuses on.',
    pairs: [
      { slot: 'fiscal', slotText: 'Governance & fiscal', tile: 'tax', tileText: 'Tax, spending and revenue' },
      { slot: 'industrial', slotText: 'Industrial', tile: 'biz', tileText: 'Business climate, SEZs, PPPs' },
      { slot: 'skills', slotText: 'Skills', tile: 'train', tileText: 'Training and digital skills' },
    ],
    explain: 'The reforms unlock investment, productivity and jobs.',
  },
  {
    type: 'mc',
    prompt: 'What keeps FYDP IV on track once it is being implemented?',
    options: [
      { id: 'a', text: 'The National Delivery Framework' }, { id: 'b', text: 'The annual budget alone' }, { id: 'c', text: 'Vision 2050 itself' }, { id: 'd', text: 'The central bank' },
    ],
    answer: 'a',
    explain: 'The Framework tracks delivery and escalates whatever falls off track.',
  },
]

const RATINGS = [
  { min: 90, name: 'Chief Economist', msg: 'You have mastered the plan.' },
  { min: 70, name: 'On Track', msg: 'A strong grasp of FYDP IV.' },
  { min: 50, name: 'Needs Improvement', msg: 'A quick re-read will lock it in.' },
  { min: 0, name: 'Off Track', msg: 'Start with the overview and try again.' },
]

export default function FydpQuiz() {
  usePageTitle('Knowledge check · FYDP IV', 'Test how well you understood the Fourth Five-Year Development Plan.')
  return (
    <div className="container section stack">
      <Reveal as="section" className="cols">
        <div className="cols__label">Knowledge check</div>
        <div>
          <h1>Think you’ve got it?</h1>
          <p className="lede measure">Ten quick questions on FYDP IV. Tap, drag and drop your way through, then get your rating.</p>
        </div>
      </Reveal>
      <hr className="rule rule--strong" />
      <Quiz questions={QUESTIONS} ratings={RATINGS} />
    </div>
  )
}
