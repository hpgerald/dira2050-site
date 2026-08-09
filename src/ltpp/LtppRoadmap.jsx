import { Link } from 'react-router-dom'
import { useLtpp } from './data.js'
import { usePageTitle } from '../usePageTitle.js'
import Reveal from '../components/Reveal.jsx'
import PlanTimeline from '../framework/PlanTimeline.jsx'

export default function LtppRoadmap() {
  usePageTitle('The roadmap · LTPP 2050', 'The 25 years as five successive five-year plans, and the theory of change behind them.')
  const { data, loading } = useLtpp()
  if (loading) return <div className="container section"><p>Loading…</p></div>
  const { roadmap, toc } = data

  // Build the timeline: the LTPP span plus the five five-year blocks.
  const plans = [
    { id: 'ltpp', kind: 'span', start: 2026, end: 2051 },
    ...roadmap.map((r) => ({
      id: r.roman,
      kind: 'block',
      name: `FYDP ${r.roman}`,
      start: 2026 + (r.num - 1) * 5,
      end: 2031 + (r.num - 1) * 5,
      current: String(r.current) === 'yes' ? 1 : 0,
    })),
  ]

  return (
    <div className="container section stack">
      <Reveal as="section" className="cols">
        <div className="cols__label">The roadmap</div>
        <div>
          <h1>Twenty-five years, five plans</h1>
          <p className="lede measure">The LTPP runs from 2026/27 to 2050/51 and is delivered through five successive Five-Year Development Plans. Each carries a leg of the journey; FYDP IV is the first, and it is already underway.</p>
        </div>
      </Reveal>

      <hr className="rule" />

      <section className="cols">
        <div className="cols__label">2026 to 2051</div>
        <div className="stack">
          <Reveal><PlanTimeline plans={plans} /></Reveal>
          <ul className="index">
            {roadmap.map((r) => (
              <li key={r.roman} className="index__row">
                {String(r.current) === 'yes' ? (
                  <Link className="index__link" to="/fydp">
                    <span className="index__num">{r.roman}</span>
                    <span>
                      <span className="index__name">{r.name}</span>
                      <span className="index__desc">{r.years} · the current plan, built out on this site</span>
                    </span>
                    <span className="index__arrow" aria-hidden="true">→</span>
                  </Link>
                ) : (
                  <span className="index__link" style={{ cursor: 'default' }}>
                    <span className="index__num">{r.roman}</span>
                    <span>
                      <span className="index__name">{r.name}</span>
                      <span className="index__desc">{r.years}</span>
                    </span>
                  </span>
                )}
              </li>
            ))}
          </ul>
          <p className="viz__note">The five-year plans translate the long-term priorities into budgets and sector strategies. Source page 3.</p>
        </div>
      </section>

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">The theory of change</div>
        <div className="stack">
          <p className="measure">The plan sets out how effort turns into results: from the challenges it must overcome and the endowments it can draw on, through the outputs and outcomes it targets, to its ultimate impact.</p>
          <ol className="escal">
            {toc.map((s) => (
              <li key={s.num} className="escal__step">
                <span className="escal__lvl">{s.num}</span>
                <span>
                  <span className="escal__tier">{s.stage}</span>
                  <span className="escal__act">{s.detail}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <hr className="rule rule--strong" />
      <section className="pager">
        <Link className="pager__link" to="/ltpp">← Overview</Link>
        <Link className="pager__link pager__link--next" to="/ltpp/architecture">The architecture →</Link>
      </section>
    </div>
  )
}
