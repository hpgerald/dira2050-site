import { Link } from 'react-router-dom'
import { useFydp } from './data.js'
import { usePageTitle } from '../usePageTitle.js'
import Reveal from '../components/Reveal.jsx'

const ENABLERS = ['Energy', 'Water', 'Ports', 'Roads', 'Standard Gauge Railway', 'ICT']

export default function FydpFlagships() {
  usePageTitle('Flagship programmes · FYDP IV', 'Seven investable mega-programmes meant to transform whole regions.')
  const { data, loading } = useFydp()
  if (loading) return <div className="container section"><p>Loading…</p></div>
  const { flagships } = data

  return (
    <div className="container section stack">
      <Reveal as="section" className="cols">
        <div className="cols__label">Flagship programmes</div>
        <div>
          <h1>Seven bets to transform whole regions</h1>
          <p className="lede measure">Big, investable programmes that bundle infrastructure, spatial planning and value chains to pull in private capital and reshape their regions.</p>
        </div>
      </Reveal>

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">The seven</div>
        <div>
          <ul className="index">
            {flagships.map((f, i) => (
              <Reveal as="li" key={f.id} className="index__row" delay={i * 50}>
                <Link className="index__link" to={`/fydp/flagships/${f.id}`}>
                  <span className="index__num">{f.num}</span>
                  <span>
                    <span className="index__name">{f.name}</span>
                    <span className="index__desc">{f.focus}</span>
                  </span>
                  <span className="index__arrow" aria-hidden="true">→</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <hr className="rule" />

      <Reveal as="section" className="cols">
        <div className="cols__label">What holds them up</div>
        <div className="stack">
          <p className="measure">Each flagship depends on enabling infrastructure being in place alongside it.</p>
          <ul className="chiplist">
            {ENABLERS.map((e) => <li key={e} className="chip chip--soft">{e}</li>)}
          </ul>
          <p className="measure">To turn them into projects investors can back, the plan proposes a dedicated financing facility that develops bankable projects and blends public and private capital under each flagship.</p>
        </div>
      </Reveal>

      <hr className="rule rule--strong" />
      <section className="pager">
        <Link className="pager__link" to="/fydp/financing">← Financing</Link>
        <Link className="pager__link pager__link--next" to="/fydp/risks">Risks →</Link>
      </section>
    </div>
  )
}
