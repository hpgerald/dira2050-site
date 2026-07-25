import { useData } from '../useData.js'
import { getPillars, getEnablers } from '../lib/data.js'
import DriverIndex from '../components/Pentagram.jsx'
import { usePageTitle } from '../usePageTitle.js'

export default function PillarsIndex() {
  usePageTitle('The framework')
  const { data, loading, error } = useData()
  if (loading) return <p className="container section">Loading…</p>
  if (error) return <p className="container section" role="alert">Could not load data.</p>

  return (
    <div className="container section stack">
      <div className="cols">
        <div className="cols__label">The framework</div>
        <div>
          <h1>How Dira 2050 is built.</h1>
          <p className="measure">A foundation of good governance holds up three pillars. Five drivers power them,
          delivering the Vision's goals.</p>
        </div>
      </div>

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">Foundation</div>
        <div>
          <p className="measure">Governance, peace, security and stability — the bedrock the whole Vision rests on.</p>
          <ul className="deflist">
            {data.foundation.map((f) => (
              <li key={f.id}><strong>{f.name}.</strong> {f.description}</li>
            ))}
          </ul>
        </div>
      </section>

      <hr className="rule" />

      <section className="cols">
        <div className="cols__label">Three pillars</div>
        <div><DriverIndex items={getPillars(data)} basePath="/pillars" ariaLabel="The three pillars" /></div>
      </section>

      <hr className="rule" />

      <section className="cols">
        <div className="cols__label">Five drivers</div>
        <div><DriverIndex items={getEnablers(data)} basePath="/enablers" ariaLabel="The five drivers" /></div>
      </section>
    </div>
  )
}
