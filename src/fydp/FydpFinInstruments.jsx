import { Link } from 'react-router-dom'
import { useFydp } from './data.js'
import { usePageTitle } from '../usePageTitle.js'
import Reveal from '../components/Reveal.jsx'

export default function FydpFinInstruments() {
  usePageTitle('Innovative instruments · FYDP IV', 'The newer financing instruments used to catalyse private investment and long-term capital.')
  const { data, loading } = useFydp()
  if (loading) return <div className="container section"><p>Loading…</p></div>
  const { instruments } = data

  return (
    <div className="container section stack">
      <Reveal as="section" className="cols">
        <div className="cols__label">Financing · Innovative instruments</div>
        <div>
          <h1>Newer ways to raise the money</h1>
          <p className="lede measure">Beyond ordinary revenue and borrowing, the plan leans on a set of newer instruments to catalyse private investment, put public assets to work and mobilise long-term capital. Together they are expected to raise TZS 42 to 62 trillion, roughly a tenth of the whole envelope.</p>
        </div>
      </Reveal>

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">The instruments</div>
        <div>
          <ul className="deflist">
            {instruments.map((n) => (
              <li key={n.id}>
                <strong>{n.name}.</strong> {n.note}
                {n.meta ? <span className="deflist__meta">{n.meta}</span> : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <hr className="rule rule--strong" />
      <section className="pager">
        <Link className="pager__link" to="/fydp/financing">← Financing</Link>
        <Link className="pager__link pager__link--next" to="/fydp/financing/private-capital">Drawing in private capital →</Link>
      </section>
    </div>
  )
}
