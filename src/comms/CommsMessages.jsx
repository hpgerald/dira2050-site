import { Link } from 'react-router-dom'
import { useComms } from './data.js'
import { usePageTitle } from '../usePageTitle.js'
import Reveal from '../components/Reveal.jsx'

export default function CommsMessages() {
  usePageTitle('Messages & audiences · Communication Strategy', 'The core messages, and the audiences they are tailored for.')
  const { data, loading } = useComms()
  if (loading) return <div className="container section"><p>Loading…</p></div>
  const { messages, audiences } = data

  return (
    <div className="container section stack">
      <Reveal as="section" className="cols">
        <div className="cols__label">Messages &amp; audiences</div>
        <div>
          <h1>What is said, and to whom</h1>
          <p className="lede measure">A shared set of messages keeps communication consistent across every institution and platform, each shaped for the audience it needs to reach.</p>
        </div>
      </Reveal>

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">Key messages</div>
        <div>
          <ul className="meth">
            {messages.map((m) => (
              <li key={m.id} className="meth__row">
                <div className="meth__head"><span className="meth__name">{m.category}</span></div>
                <p className="meth__purpose">“{m.message}”</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">Audiences</div>
        <div className="stack">
          <p className="measure">The strategy segments stakeholders by their influence and the behaviour it hopes to encourage.</p>
          <ul className="bands">
            {audiences.map((a) => (
              <li key={a.id} className="band" style={{ gridTemplateColumns: 'minmax(9rem,12rem) 1fr' }}>
                <span className="band__name">{a.segment}</span>
                <span className="band__meaning"><strong>{a.intent}.</strong> {a.goal}.</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <hr className="rule rule--strong" />
      <section className="pager">
        <Link className="pager__link" to="/comms/framework">← The framework</Link>
        <Link className="pager__link pager__link--next" to="/comms/channels">Channels →</Link>
      </section>
    </div>
  )
}
