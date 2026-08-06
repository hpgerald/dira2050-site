import { Link } from 'react-router-dom'
import { useFramework } from './data.js'
import Reveal from '../components/Reveal.jsx'
import PlanTimeline from './PlanTimeline.jsx'

const EXPLORE = [
  { to: '/framework/cycle', n: '01', name: 'The delivery cycle', desc: 'The three-phase loop that decides, plans and delivers, shown as an interactive flow.' },
  { to: '/framework/priority-areas', n: '02', name: 'Priority areas', desc: 'The national result areas that are tracked, and how each one is assessed.' },
  { to: '/framework/system', n: '03', name: 'The delivery system', desc: 'Who does what, from Cabinet to the local council, all reporting into one platform.' },
]

// National Delivery Framework landing, in the main Dira site's editorial style.
export default function FrameworkHome() {
  const { data, loading } = useFramework()
  if (loading) return <div className="container section"><p>Loading…</p></div>
  const { alignment, plans, shift } = data

  return (
    <div className="container section stack">
      <section className="hero hero--flush">
        <Reveal as="p" className="cols__label">National Planning Commission · June 2026</Reveal>
        <Reveal as="h1" className="hero__title" delay={80}>How Tanzania’s plans actually get delivered</Reveal>
        <Reveal as="p" className="hero__lead" delay={160}>The machine behind the plans: it turns Vision 2050 into results, and tracks whether the country is on course.</Reveal>
        <Reveal className="hero__cta" delay={240}>
          <Link className="btn" to="/framework/cycle">See the delivery cycle</Link>
          <Link className="btn btn--ghost" to="/dira">Explore Vision 2050</Link>
        </Reveal>
      </section>

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">The shift</div>
        <div className="stack">
          <p className="lede measure">It moves government from reporting on the past to actively delivering results. Previous plans were rarely weak by design; the gap was in delivery.</p>
          <div className="shift" role="table" aria-label="What changed with the Framework">
            <div className="shift__head" role="row">
              <span role="columnheader">Before</span>
              <span aria-hidden="true" />
              <span role="columnheader">With the Framework</span>
            </div>
            {shift.map((s, i) => (
              <Reveal as="div" key={s.id} className="shift__row" role="row" delay={i * 60}>
                <span className="shift__old" role="cell">{s.old}</span>
                <span className="shift__arrow" aria-hidden="true">→</span>
                <span className="shift__new" role="cell">{s.new}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <hr className="rule" />

      <section className="cols">
        <div className="cols__label">The 25-year plan</div>
        <div className="stack">
          <p className="measure">The Vision is delivered over 25 years through five successive plans. FYDP IV, running now, is the first of them.</p>
          <Reveal><PlanTimeline plans={plans} /></Reveal>
          <p className="dsys__foot" style={{ margin: 0 }}>
            <Link className="inlink" to="/dira">Vision 2050</Link> sets the destination · <Link className="inlink" to="/fydp">FYDP IV</Link> is the first five years.
          </p>
        </div>
      </section>

      <hr className="rule" />

      <section className="cols">
        <div className="cols__label">One delivery chain</div>
        <div className="stack">
          <p className="measure">Every plan connects into a single implementation chain, so a national priority becomes a budget, an action, and a measurable result.</p>
          <ol className="goals">
            {alignment.map((a, i) => (
              <Reveal as="li" key={a.id} className="goal" delay={i * 70}>
                <span className="goal__num">{a.tier}</span>
                <div>
                  <h3 className="goal__title">{a.name}</h3>
                  <p className="goal__desc">{a.detail}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <hr className="rule" />

      <section className="cols">
        <div className="cols__label">Explore</div>
        <div>
          <ul className="index">
            {EXPLORE.map((e, i) => (
              <Reveal as="li" key={e.to} className="index__row" delay={i * 70}>
                <Link className="index__link" to={e.to}>
                  <span className="index__num">{e.n}</span>
                  <span>
                    <span className="index__name">{e.name}</span>
                    <span className="index__desc">{e.desc}</span>
                  </span>
                  <span className="index__arrow" aria-hidden="true">→</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">Source</div>
        <div>
          <p className="measure">National Framework for Delivery and Performance Management of Development Plans. United Republic of Tanzania, National Planning Commission, June 2026.</p>
        </div>
      </section>
    </div>
  )
}
