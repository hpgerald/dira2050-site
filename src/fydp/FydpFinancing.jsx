import { Link } from 'react-router-dom'
import { useFydp } from './data.js'
import { usePageTitle } from '../usePageTitle.js'
import Reveal from '../components/Reveal.jsx'
import FinanceBar from './FinanceBar.jsx'
import AllocBars from './AllocBars.jsx'

const MORE = [
  { to: '/fydp/financing/instruments', n: '01', name: 'Innovative instruments', desc: 'SEZs, diaspora and green bonds, carbon credits and more, worth TZS 42 to 62 trillion.' },
  { to: '/fydp/financing/private-capital', n: '02', name: 'Drawing in private capital', desc: 'The mechanisms that attract and unlock the private two-thirds of the money.' },
  { to: '/fydp/financing/public-corporations', n: '03', name: 'Public corporations', desc: 'How PSCs are reformed to invest commercially and fund the plan.' },
]

export default function FydpFinancing() {
  usePageTitle('Financing · FYDP IV', 'How the TZS 477.7 trillion is raised, and from whom.')
  const { data, loading } = useFydp()
  if (loading) return <div className="container section"><p>Loading…</p></div>
  const { financing, allocation } = data

  return (
    <div className="container section stack">
      <Reveal as="section" className="cols">
        <div className="cols__label">Financing</div>
        <div>
          <h1>TZS 477.7 trillion, mostly from the private sector</h1>
          <p className="lede measure">About USD 183 billion over five years. Unusually, the plan expects the private sector, not the treasury, to provide the bulk of it.</p>
        </div>
      </Reveal>

      <hr className="rule" />

      <section className="cols">
        <div className="cols__label">Where it comes from</div>
        <div className="stack">
          <Reveal><FinanceBar items={financing} /></Reveal>
        </div>
      </section>

      <hr className="rule" />

      <section className="cols">
        <div className="cols__label">Where it goes</div>
        <div className="stack">
          <p className="measure">The same envelope, seen as demand: about USD 183 billion of investment needs, concentrated in the infrastructure and productive sectors that unlock the rest.</p>
          <Reveal><AllocBars items={allocation} /></Reveal>
          <p className="viz__note">Investment demand by sector and priority cluster. Source page 92.</p>
        </div>
      </section>

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">Go deeper</div>
        <div>
          <ul className="index">
            {MORE.map((e, i) => (
              <Reveal as="li" key={e.to} className="index__row" delay={i * 60}>
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
      <section className="pager">
        <Link className="pager__link" to="/fydp/sectors">← Strategic pathways</Link>
        <Link className="pager__link pager__link--next" to="/fydp/flagships">Flagships →</Link>
      </section>
    </div>
  )
}
