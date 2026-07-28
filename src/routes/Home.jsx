import { Link } from 'react-router-dom'
import { useData } from '../useData.js'
import { getPillars, getEnablers } from '../lib/data.js'
import DriverIndex from '../components/Pentagram.jsx'
import StatCard from '../components/StatCard.jsx'
import { usePageTitle } from '../usePageTitle.js'

// Pick specific headline targets by id (the three biggest national numbers).
function headline(data) {
  const byId = Object.fromEntries(data.targets.map((t) => [t.id, t]))
  return ['t1', 't2', 't4'].map((id) => byId[id]).filter(Boolean)
}

export default function Home() {
  usePageTitle(null, 'A plain-language, data-driven guide to the Tanzania Development Vision 2050 — its goals, targets, pillars, drivers, the opportunities it creates, and what it means for you.')
  const { data, loading, error } = useData()

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <span className="eyebrow">Tanzania Development Vision 2050 · Dira 2050</span>
          <h1 className="hero__title">The Tanzania<br />we want by 2050.</h1>
          <p className="hero__lead">
            A 25-year national plan to become an industrialised, knowledge-based, upper-middle-income
            country — with a one-trillion-dollar economy and a good quality of life for every citizen.
            Here is what it says, in plain language.
          </p>
          <p className="hero__cta">
            <Link className="btn" to="/vision">Start with the Vision</Link>
            <Link className="btn btn--ghost" to="/targets">See the targets</Link>
          </p>
        </div>
      </section>

      <hr className="rule rule--strong" />

      {loading && <p className="container section">Loading…</p>}
      {error && <p className="container section" role="alert">Could not load data: {String(error.message)}</p>}

      {!loading && !error && (
        <>
          {/* Headline figures */}
          <section className="container section cols">
            <div className="cols__label">The goal · by 2050</div>
            <div className="grid-stats">
              {headline(data).map((t) => (
                <StatCard
                  key={t.id}
                  value={t.target_value ?? '—'}
                  unit={t.unit}
                  label={t.indicator}
                  baseline={t.baseline_value}
                  baselineYear={t.baseline_year}
                  targetYear={t.target_year}
                />
              ))}
            </div>
          </section>

          <hr className="rule" />

          {/* Three pillars */}
          <section className="container section cols">
            <div className="cols__label">Three pillars</div>
            <div>
              <p className="measure">Everything in Dira 2050 stands on three pillars — and beneath them, a
              foundation of good governance, peace and stability.</p>
              <DriverIndex items={getPillars(data)} basePath="/pillars" ariaLabel="The three pillars" />
            </div>
          </section>

          <hr className="rule" />

          {/* Five drivers — the hub */}
          <section className="container section cols">
            <div className="cols__label">Five drivers</div>
            <div>
              <p className="measure">Five catalytic drivers power the whole Vision. They are the engine behind the
              pillars — pick one to explore.</p>
              <DriverIndex items={getEnablers(data)} basePath="/enablers" ariaLabel="The five Drivers" />
            </div>
          </section>

          <hr className="rule rule--strong" />

          {/* Closing */}
          <section className="container section">
            <div className="closing">
              <h2>This Vision belongs to everyone.</h2>
              <p className="measure">Curious what it means for your own life — your job, your bills, your children's
              school? Read the plain-language guide.</p>
              <p><Link className="btn" to="/what-it-means">What it means for you</Link></p>
            </div>
          </section>
        </>
      )}
    </>
  )
}
