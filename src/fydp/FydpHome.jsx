import { Link } from 'react-router-dom'
import { useFydp } from './data.js'
import Reveal from '../components/Reveal.jsx'

const EXPLORE = [
  { to: '/fydp/economy', n: '01', name: 'The economy', desc: 'The macro trajectory to 2030/31 and the reforms behind it.' },
  { to: '/fydp/sectors', n: '02', name: 'Strategic pathways', desc: 'All forty-eight pathways across the economy, its people, environment, enablers and governance.' },
  { to: '/fydp/financing', n: '03', name: 'Financing', desc: 'How the TZS 477.7 trillion is raised, and from whom.' },
  { to: '/fydp/flagships', n: '04', name: 'Flagship programmes', desc: 'Seven investable mega-programmes meant to transform whole regions.' },
  { to: '/fydp/risks', n: '05', name: 'Risks', desc: 'What could go wrong, and how the plan guards against it.' },
]

export default function FydpHome() {
  const { data, loading } = useFydp()
  if (loading) return <div className="container section"><p>Loading…</p></div>
  const { targets } = data

  return (
    <div className="container section stack">
      <section className="hero hero--flush">
        <Reveal as="p" className="cols__label">President’s Office · Planning and Investment · June 2026</Reveal>
        <Reveal as="h1" className="hero__title" delay={80}>The first five years of Vision 2050</Reveal>
        <Reveal as="p" className="hero__lead" delay={160}>FYDP IV runs 2026/27 to 2030/31: reforms for inclusive economic growth and employment creation.</Reveal>
        <Reveal className="hero__cta" delay={240}>
          <Link className="btn" to="/fydp/flagships">See the flagship programmes</Link>
          <Link className="btn btn--ghost" to="/dira">Explore Vision 2050</Link>
        </Reveal>
      </section>

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">Where it aims to be by 2030/31</div>
        <div>
          <div className="grid-stats">
            {targets.map((t, i) => (
              <Reveal key={t.id} className="stat" delay={i * 60}>
                <div className="stat__value">
                  <span className="stat__num">{t.value}</span>
                  <span className="stat__unit">{t.unit}</span>
                </div>
                <p className="stat__label">{t.indicator}</p>
                <p className="stat__note">{t.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <hr className="rule" />

      <Reveal as="section" className="cols">
        <div className="cols__label">The mission</div>
        <div>
          <p className="lede measure">Previous plans were rarely weak on paper. FYDP IV puts the weight on reform and delivery, so growth actually reaches people and creates jobs, especially for the young.</p>
        </div>
      </Reveal>

      <hr className="rule" />

      <section className="cols">
        <div className="cols__label">Explore</div>
        <div>
          <ul className="index">
            {EXPLORE.map((e, i) => (
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

      <section className="cols">
        <div className="cols__label">How it connects</div>
        <div className="stack">
          <p className="measure">FYDP IV is the first of five plans carrying Vision 2050 to 2050. The National Delivery Framework keeps it on track.</p>
          <p>
            <Link className="btn" to="/dira">Vision 2050</Link>{' '}
            <Link className="btn btn--ghost" to="/framework">The delivery framework</Link>
          </p>
          <p className="viz__note" style={{ marginTop: '1rem' }}>Source: The Fourth Five-Year Development Plan 2026/27 to 2030/31. United Republic of Tanzania, National Planning Commission, June 2026.</p>
        </div>
      </section>
    </div>
  )
}
