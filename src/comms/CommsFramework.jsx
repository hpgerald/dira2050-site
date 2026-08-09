import { Link } from 'react-router-dom'
import { useComms } from './data.js'
import { usePageTitle } from '../usePageTitle.js'
import Reveal from '../components/Reveal.jsx'

export default function CommsFramework() {
  usePageTitle('The framework · Communication Strategy', 'Five strategic pillars, the objectives, themes and guiding principles.')
  const { data, loading } = useComms()
  if (loading) return <div className="container section"><p>Loading…</p></div>
  const { pillars, objectives, themes, principles } = data

  return (
    <div className="container section stack">
      <Reveal as="section" className="cols">
        <div className="cols__label">The framework</div>
        <div>
          <h1>Five pillars, one message</h1>
          <p className="lede measure">The strategy is built on five core pillars, each mapped to a behavioural outcome. Together they turn a national plan into a shared national conversation.</p>
        </div>
      </Reveal>

      <hr className="rule rule--strong" />

      {pillars.map((p, i) => (
        <Reveal as="section" key={p.id} className="cols" delay={i ? 30 : 0}>
          <div className="cols__label">Pillar {p.num}</div>
          <div>
            <h2 className="pa__name">{p.name}</h2>
            <p className="pa__principle">{p.outcome}</p>
            <p className="measure">{p.detail}</p>
          </div>
        </Reveal>
      ))}

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">Communication objectives</div>
        <div>
          <ol className="goals">
            {objectives.map((o) => (
              <li key={o.num} className="goal">
                <span className="goal__num">{String(o.num).padStart(2, '0')}</span>
                <div><p className="goal__title" style={{ margin: 0, fontSize: 'var(--fs-400)' }}>{o.text}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <hr className="rule" />

      <section className="cols">
        <div className="cols__label">Communication themes</div>
        <div className="stack">
          <p className="measure">Ten themes run through every message, mirroring the priorities of Vision 2050.</p>
          <ul className="chiplist">
            {themes.map((th) => <li key={th.name} className="chip chip--soft">{th.name}</li>)}
          </ul>
        </div>
      </section>

      <hr className="rule" />

      <section className="cols">
        <div className="cols__label">Guiding principles</div>
        <div className="stack">
          <p className="measure">All communication is held to a common set of principles.</p>
          <ul className="chiplist">
            {principles.map((pr) => <li key={pr.name} className="chip chip--soft">{pr.name}</li>)}
          </ul>
        </div>
      </section>

      <hr className="rule rule--strong" />
      <section className="pager">
        <Link className="pager__link" to="/comms">← Overview</Link>
        <Link className="pager__link pager__link--next" to="/comms/messages">Messages &amp; audiences →</Link>
      </section>
    </div>
  )
}
