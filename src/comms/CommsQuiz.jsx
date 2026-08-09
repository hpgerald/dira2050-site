import { usePageTitle } from '../usePageTitle.js'
import Quiz from '../components/Quiz.jsx'

const QUESTIONS = [
  {
    type: 'mc',
    prompt: 'What is the Communication Strategy for?',
    options: [
      { id: 'a', text: 'To explain, share and build ownership of Dira 2050' },
      { id: 'b', text: 'To set the economic targets' },
      { id: 'c', text: 'To allocate the national budget' },
      { id: 'd', text: 'To run elections' },
    ],
    answer: 'a',
    explain: 'It sets out how Dira 2050 is communicated, so citizens understand, participate in and own the Vision.',
  },
  {
    type: 'mc',
    prompt: 'How many strategic pillars does the strategy stand on?',
    options: [
      { id: 'a', text: 'Five' }, { id: 'b', text: 'Three' }, { id: 'c', text: 'Ten' }, { id: 'd', text: 'Two' },
    ],
    answer: 'a',
    explain: 'Five: public awareness, stakeholder participation, institutional alignment, transparency, and partnerships.',
  },
  {
    type: 'mc',
    prompt: 'Which channel does the strategy call the primary one for rural audiences?',
    options: [
      { id: 'a', text: 'Radio' }, { id: 'b', text: 'Television' }, { id: 'c', text: 'Newspapers' }, { id: 'd', text: 'Billboards' },
    ],
    answer: 'a',
    explain: 'Radio, for its reach, affordability and accessibility across rural and remote Tanzania, including call-in participation.',
  },
  {
    type: 'mc',
    prompt: 'Which language does the strategy make primary for national communication?',
    options: [
      { id: 'a', text: 'Kiswahili' }, { id: 'b', text: 'English' }, { id: 'c', text: 'French' }, { id: 'd', text: 'Arabic' },
    ],
    answer: 'a',
    explain: 'Kiswahili is the primary language, so Dira 2050 speaks to citizens in the language they live in.',
  },
  {
    type: 'order',
    prompt: 'Order these channels from the most grassroots to the most digital.',
    items: [
      { id: 'b', text: 'Public meetings and barazas' },
      { id: 'r', text: 'Radio' },
      { id: 't', text: 'Television' },
      { id: 's', text: 'Social media' },
    ],
    correct: ['b', 'r', 't', 's'],
    explain: 'The strategy blends face-to-face barazas, broadcast radio and television, and digital social media to reach everyone.',
  },
  {
    type: 'match',
    prompt: 'Match each audience to what the strategy wants from it.',
    pairs: [
      { slot: 'p1', slotText: 'Youth (18-35)', tile: 't1', tileText: 'Skills uptake and entrepreneurship' },
      { slot: 'p2', slotText: 'Private sector', tile: 't2', tileText: 'Investment and expansion' },
      { slot: 'p3', slotText: 'Media & influencers', tile: 't3', tileText: 'Agenda shaping and public influence' },
    ],
    explain: 'Each audience is segmented by influence and the behaviour the strategy hopes to encourage.',
  },
  {
    type: 'mc',
    prompt: "What is the strategy's general message about Dira 2050?",
    options: [
      { id: 'a', text: "Tanzania's roadmap toward inclusive prosperity and a better quality of life for all" },
      { id: 'b', text: 'A short-term emergency plan' },
      { id: 'c', text: 'A plan only for cities' },
      { id: 'd', text: 'A document for experts only' },
    ],
    answer: 'a',
    explain: 'The core national message frames Dira 2050 as a roadmap to inclusive prosperity and improved quality of life for every citizen.',
  },
  {
    type: 'mc',
    prompt: 'Which institution leads and coordinates the strategy?',
    options: [
      { id: 'a', text: 'The National Planning Commission' },
      { id: 'b', text: 'The central bank' },
      { id: 'c', text: 'Private media houses' },
      { id: 'd', text: 'Development partners' },
    ],
    answer: 'a',
    explain: 'The National Planning Commission leads and coordinates, financed mainly through the government budget.',
  },
]

const RATINGS = [
  { min: 88, name: 'Chief Communicator', msg: 'Outstanding. You know how the message reaches the nation.' },
  { min: 63, name: 'On message', msg: 'A solid grasp of the strategy.' },
  { min: 38, name: 'Getting there', msg: 'A quick re-read of the overview will lock it in.' },
  { min: 0, name: 'Just starting', msg: 'Begin with the overview and try again.' },
]

export default function CommsQuiz() {
  usePageTitle('Knowledge check · Communication Strategy', 'A short quiz on how Dira 2050 is communicated: its pillars, messages, audiences and channels.')
  return (
    <div className="container section stack">
      <section className="cols">
        <div className="cols__label">Knowledge check</div>
        <div>
          <h1>How well do you know the strategy?</h1>
          <p className="lede measure">A short quiz on how Dira 2050 reaches people: its pillars, messages, audiences and channels.</p>
        </div>
      </section>

      <hr className="rule rule--strong" />

      <Quiz questions={QUESTIONS} ratings={RATINGS} backTo="/comms" backLabel="Back to overview" />
    </div>
  )
}
