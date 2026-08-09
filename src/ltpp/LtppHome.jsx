import { Link } from 'react-router-dom'
import { useLtpp } from './data.js'
import Reveal from '../components/Reveal.jsx'

const EXPLORE = [
  { to: '/ltpp/roadmap', n: '01', name: 'The roadmap', desc: 'The 25 years as five successive five-year plans, and the theory of change behind them.' },
  { to: '/ltpp/architecture', n: '02', name: 'The architecture', desc: 'Four mutually reinforcing levels, and the 3i strategy that drives them.' },
  { to: '/ltpp/financing', n: '03', name: 'Financing', desc: 'The USD 3.6 trillion the plan needs, and where it comes from.' },
]

export default function LtppHome() {
  const { data, loading } = useLtpp()
  if (loading) return <div className="container section"><p>Loading…</p></div>
  const { targets, threei } = data

  return (
    <div className="container section stack">
      <section className="hero hero--flush">
        <Reveal as="p" className="cols__label">President’s Office · Planning and Investment · National Planning Commission</Reveal>
        <Reveal as="h1" className="hero__title" delay={80}>The 25-year road to 2050</Reveal>
        <Reveal as="p" className="hero__lead" delay={160}>Vision 2050 says where Tanzania is going. The Long-Term Perspective Plan says how it gets there: sequenced, financed and accountable.</Reveal>
        <Reveal className="hero__cta" delay={240}>
          <Link className="btn" to="/ltpp/roadmap">See the roadmap</Link>
          <Link className="btn btn--ghost" to="/dira">Explore Vision 2050</Link>
        </Reveal>
      </section>

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">What it aims for by 2050</div>
        <div>
          <div className="grid-stats">
            {targets.map((t, i) => (
              <Reveal key={t.id} className="stat" delay={i * 60}>
                <span className="stat__num">{t.value}</span>
                <p className="stat__unitline">{t.unit}</p>
                <p className="stat__label">{t.stat}</p>
                <p className="stat__note">{t.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <hr className="rule" />

      <Reveal as="section" className="cols">
        <div className="cols__label">What it is</div>
        <div className="stack">
          <p className="lede measure">The LTPP 2050 is Tanzania's 25-year strategic roadmap for implementing Vision 2050. It translates the national aspiration into sequenced priorities, implementation arrangements, financing strategies and measurable outcomes, and ties long-term goals to the five-year and annual plans that deliver them.</p>
        </div>
      </Reveal>

      <hr className="rule" />

      <section className="cols">
        <div className="cols__label">The 3i strategy</div>
        <div>
          <p className="measure">The plan is delivered through three moves that build on one another.</p>
          <ol className="threei">
            {threei.map((t, n) => (
              <li key={t.num} className="threei__cell">
                <div className="threei__item"><span className="threei__i">{t.name}</span><span className="threei__d">{t.summary}</span></div>
                {n < threei.length - 1 && <span className="threei__plus" aria-hidden="true">+</span>}
              </li>
            ))}
          </ol>
        </div>
      </section>

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
          <p className="measure">The LTPP sits between Vision 2050 and the five-year plans. Vision 2050 sets the destination; the LTPP sequences the journey; each Five-Year Development Plan delivers a leg of it, starting with FYDP IV.</p>
          <p>
            <Link className="btn" to="/dira">Vision 2050</Link>{' '}
            <Link className="btn btn--ghost" to="/fydp">FYDP IV</Link>{' '}
            <Link className="btn btn--ghost" to="/framework">The delivery framework</Link>
          </p>
          <p className="viz__note" style={{ marginTop: '1rem' }}>Source: Long-Term Perspective Plan 2026/27 to 2050/51. United Republic of Tanzania, National Planning Commission.</p>
        </div>
      </section>
    </div>
  )
}
