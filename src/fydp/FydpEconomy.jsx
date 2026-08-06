import { Link } from 'react-router-dom'
import { useFydp } from './data.js'
import { usePageTitle } from '../usePageTitle.js'
import Reveal from '../components/Reveal.jsx'
import FromTo from './FromTo.jsx'

const THREEI = [
  ['Investment', 'mobilised into priorities'],
  ['Infusion', 'of technology and knowledge'],
  ['Innovation', 'to lift productivity'],
]

export default function FydpEconomy() {
  usePageTitle('The economy · FYDP IV', 'The macro trajectory to 2030/31 and the reforms behind it.')
  const { data, loading } = useFydp()
  if (loading) return <div className="container section"><p>Loading…</p></div>
  const { macro, reforms } = data

  return (
    <div className="container section stack">
      <Reveal as="section" className="cols">
        <div className="cols__label">The economy</div>
        <div>
          <h1>Faster growth, and a bigger tax base to fund it</h1>
          <p className="lede measure">FYDP IV aims to roughly double the growth rate while raising far more revenue at home, so the country depends less on borrowing.</p>
        </div>
      </Reveal>

      <hr className="rule" />

      <section className="cols">
        <div className="cols__label">The trajectory</div>
        <div className="stack">
          <p className="measure">Where the key numbers are now, and where the plan wants them by 2030/31.</p>
          <Reveal><FromTo items={macro} /></Reveal>
        </div>
      </section>

      <hr className="rule" />

      <section className="cols">
        <div className="cols__label">The reforms behind it</div>
        <div className="stack">
          <p className="measure">FYDP IV is deliberately reform-first. The plan argues that governance, regulation and public-sector performance are the foundation for investment and productivity, so those are strengthened first; only then does the weight shift to expanding investment, infrastructure and the productive sectors. Its strategic reform agenda runs across six tracks.</p>
          <ul className="deflist">
            {reforms.map((r) => <li key={r.id}><strong>{r.name}.</strong> {r.focus}</li>)}
          </ul>
          <div>
            <p className="cols__label" style={{ padding: 0, margin: '.6rem 0' }}>The 3i pathway</p>
            <ol className="threei">
              {THREEI.map(([i, d], n) => (
                <li key={i} className="threei__cell">
                  <div className="threei__item"><span className="threei__i">{i}</span><span className="threei__d">{d}</span></div>
                  {n < THREEI.length - 1 && <span className="threei__plus" aria-hidden="true">+</span>}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <hr className="rule rule--strong" />
      <section className="pager">
        <Link className="pager__link" to="/fydp">← Overview</Link>
        <Link className="pager__link pager__link--next" to="/fydp/sectors">Strategic pathways →</Link>
      </section>
    </div>
  )
}
