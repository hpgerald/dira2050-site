import { Link } from 'react-router-dom'
import { useFydp } from './data.js'
import { usePageTitle } from '../usePageTitle.js'
import Reveal from '../components/Reveal.jsx'

export default function FydpFinPublic() {
  usePageTitle('Public corporations · FYDP IV', 'How Public and Statutory Corporations are reformed to invest commercially.')
  const { data, loading } = useFydp()
  if (loading) return <div className="container section"><p>Loading…</p></div>
  const { pscReforms } = data

  return (
    <div className="container section stack">
      <Reveal as="section" className="cols">
        <div className="cols__label">Financing · Public corporations</div>
        <div>
          <h1>Putting public corporations to work</h1>
          <p className="lede measure">Public and Statutory Corporations (PSCs), with combined assets over TZS 92.3 trillion, are the third source of financing. Their reinvested earnings and equity make up about TZS 38 trillion of the envelope, and the plan reforms them to invest more commercially.</p>
        </div>
      </Reveal>

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">The reform targets</div>
        <div className="stack">
          <p className="measure">Chapter 5 sets out what the corporations are expected to achieve over the plan period.</p>
          <ul className="deflist">
            {pscReforms.map((r) => <li key={r.id}>{r.target}</li>)}
          </ul>
          <p className="viz__note">Source: PSCs resource-mobilisation initiatives, page 108.</p>
        </div>
      </section>

      <hr className="rule rule--strong" />
      <section className="pager">
        <Link className="pager__link" to="/fydp/financing/private-capital">← Drawing in private capital</Link>
        <Link className="pager__link pager__link--next" to="/fydp/flagships">Flagships →</Link>
      </section>
    </div>
  )
}
