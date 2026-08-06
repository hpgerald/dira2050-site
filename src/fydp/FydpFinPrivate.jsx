import { Link } from 'react-router-dom'
import { useFydp } from './data.js'
import { usePageTitle } from '../usePageTitle.js'
import Reveal from '../components/Reveal.jsx'

export default function FydpFinPrivate() {
  usePageTitle('Drawing in private capital · FYDP IV', 'The concrete mechanisms the plan uses to attract and unlock private investment.')
  const { data, loading } = useFydp()
  if (loading) return <div className="container section"><p>Loading…</p></div>
  const { privateStrategy } = data

  return (
    <div className="container section stack">
      <Reveal as="section" className="cols">
        <div className="cols__label">Financing · Private capital</div>
        <div>
          <h1>Drawing in private capital</h1>
          <p className="lede measure">The private sector is expected to provide about two-thirds of the money, TZS 324.5 trillion. To attract and unlock it, the plan sets out concrete mechanisms, from new institutions to targeted windows.</p>
        </div>
      </Reveal>

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">How it is unlocked</div>
        <div>
          <ul className="deflist">
            {privateStrategy.map((n) => <li key={n.id}><strong>{n.name}.</strong> {n.note}</li>)}
          </ul>
        </div>
      </section>

      <hr className="rule rule--strong" />
      <section className="pager">
        <Link className="pager__link" to="/fydp/financing/instruments">← Innovative instruments</Link>
        <Link className="pager__link pager__link--next" to="/fydp/financing/public-corporations">Public corporations →</Link>
      </section>
    </div>
  )
}
