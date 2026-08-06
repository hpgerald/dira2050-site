import { Link } from 'react-router-dom'
import { useFramework } from './data.js'
import { usePageTitle } from '../usePageTitle.js'
import Reveal from '../components/Reveal.jsx'
import CycleFlow from './CycleFlow.jsx'
import { Principles } from './frameworkViz.jsx'

export default function FrameworkCycle() {
  usePageTitle('The delivery cycle · National Framework', 'The three-phase cycle that turns priorities into delivered results.')
  const { data, loading } = useFramework()
  if (loading) return <div className="container section"><p>Loading…</p></div>
  const { cycle, principles } = data

  return (
    <div className="container section stack">
      <Reveal as="section" className="cols">
        <div className="cols__label">The delivery cycle</div>
        <div>
          <h1>Decide, plan, then deliver</h1>
          <p className="lede measure">The Framework runs on a structured cycle linking three connected phases, so programmes are prioritised, designed, implemented and reviewed the same way every time.</p>
        </div>
      </Reveal>

      <hr className="rule" />

      <Reveal>
        <CycleFlow phases={cycle} />
      </Reveal>

      <hr className="rule" />

      <Reveal as="section" className="cols">
        <div className="cols__label">Delivery Labs</div>
        <div className="stack">
          <p className="measure">Between deciding and delivering sit the Delivery Labs. They translate national priorities into sequenced, actionable pathways with clearly defined programme and project milestones, and provide shared tools for tracking progress and solving problems early.</p>
          <p className="measure">Applied consistently, they strengthen delivery discipline across every implementing institution, keeping national priorities and day-to-day implementation aligned.</p>
        </div>
      </Reveal>

      <hr className="rule" />

      <Reveal as="section" className="cols">
        <div className="cols__label">Operating principles</div>
        <div className="stack">
          <p className="measure">Five principles keep the cycle disciplined, from what to prioritise to how to hold delivery accountable.</p>
          <Principles items={principles} />
        </div>
      </Reveal>

      <hr className="rule rule--strong" />

      <section className="pager">
        <Link className="pager__link" to="/framework">← Overview</Link>
        <Link className="pager__link pager__link--next" to="/framework/priority-areas">Priority areas →</Link>
      </section>
    </div>
  )
}
