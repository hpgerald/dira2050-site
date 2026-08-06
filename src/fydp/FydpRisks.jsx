import { Link } from 'react-router-dom'
import { useFydp } from './data.js'
import { usePageTitle } from '../usePageTitle.js'
import Reveal from '../components/Reveal.jsx'

export default function FydpRisks() {
  usePageTitle('Risks · FYDP IV', 'What could go wrong, and how the plan guards against it.')
  const { data, loading } = useFydp()
  if (loading) return <div className="container section"><p>Loading…</p></div>
  const { risks } = data

  return (
    <div className="container section stack">
      <Reveal as="section" className="cols">
        <div className="cols__label">Risks</div>
        <div>
          <h1>What could throw it off course</h1>
          <p className="lede measure">The plan is honest about its risks. For each one, it names a way to guard against it.</p>
        </div>
      </Reveal>

      <hr className="rule rule--strong" />

      <ul className="risklist">
        {risks.map((r, i) => (
          <Reveal as="li" key={r.id} className="riskrow" delay={i * 40}>
            <div className="riskrow__risk">
              <h3 className="riskrow__name">{r.risk}</h3>
              <p className="riskrow__detail">{r.detail}</p>
            </div>
            <div className="riskrow__fix">
              <span className="riskrow__lbl">Guarded by</span>
              <p className="riskrow__mit">{r.mitigation}</p>
            </div>
          </Reveal>
        ))}
      </ul>

      <hr className="rule rule--strong" />
      <section className="pager">
        <Link className="pager__link" to="/fydp/flagships">← Flagships</Link>
        <Link className="pager__link pager__link--next" to="/fydp/quiz">Knowledge check →</Link>
      </section>
    </div>
  )
}
