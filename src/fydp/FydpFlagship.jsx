import { useParams, Link } from 'react-router-dom'
import { useFydp, pipes } from './data.js'
import { usePageTitle } from '../usePageTitle.js'
import Reveal from '../components/Reveal.jsx'

const ENABLERS = ['Energy', 'Water', 'Ports', 'Roads', 'Standard Gauge Railway', 'ICT']

export default function FydpFlagship() {
  const { id } = useParams()
  const { data, loading } = useFydp()
  const list = data ? data.flagships : []
  const idx = list.findIndex((x) => x.id === id)
  const f = idx >= 0 ? list[idx] : null
  usePageTitle(f ? `${f.name} · FYDP IV` : 'Flagship · FYDP IV', f ? f.focus : '')

  if (loading) return <div className="container section"><p>Loading…</p></div>
  if (!f) {
    return (
      <div className="container section stack">
        <h1>Flagship not found</h1>
        <p><Link className="btn" to="/fydp/flagships">Back to the flagships</Link></p>
      </div>
    )
  }

  const prev = list[idx - 1], next = list[idx + 1]

  return (
    <div className="container section stack">
      <Reveal as="section" className="cols">
        <div className="cols__label">Flagship {f.num}</div>
        <div>
          <h1>{f.name}</h1>
          <p className="lede measure">{f.focus}</p>
        </div>
      </Reveal>

      <hr className="rule rule--strong" />

      <Reveal as="section" className="cols">
        <div className="cols__label">What it is</div>
        <div className="stack">
          <p className="measure">{f.description}</p>
          <p className="fl-where"><span className="fl-where__lbl">Where</span> {f.region}</p>
        </div>
      </Reveal>

      <hr className="rule" />

      <section className="cols">
        <div className="cols__label">Key components</div>
        <div>
          <ul className="deflist">
            {pipes(f.components).map((c, i) => (
              <Reveal as="li" key={c} delay={i * 40}>{c}</Reveal>
            ))}
          </ul>
        </div>
      </section>

      <hr className="rule" />

      <Reveal as="section" className="cols">
        <div className="cols__label">Value chains it builds</div>
        <div>
          <ul className="chiplist">
            {pipes(f.value_chains).map((v) => <li key={v} className="chip chip--soft">{v}</li>)}
          </ul>
        </div>
      </Reveal>

      <hr className="rule" />

      <Reveal as="section" className="cols">
        <div className="cols__label">What holds it up</div>
        <div className="stack">
          <p className="measure">Like every flagship, it depends on enabling infrastructure being built alongside it, including 3,500 MW of new power over the plan period.</p>
          <ul className="chiplist">
            {ENABLERS.map((e) => <li key={e} className="chip chip--soft">{e}</li>)}
          </ul>
        </div>
      </Reveal>

      <hr className="rule rule--strong" />

      <section className="pager">
        {prev
          ? <Link className="pager__link" to={`/fydp/flagships/${prev.id}`}>← {prev.name}</Link>
          : <Link className="pager__link" to="/fydp/flagships">← All flagships</Link>}
        {next
          ? <Link className="pager__link pager__link--next" to={`/fydp/flagships/${next.id}`}>{next.name} →</Link>
          : <Link className="pager__link pager__link--next" to="/fydp/risks">Risks →</Link>}
      </section>
    </div>
  )
}
