import { Link } from 'react-router-dom'
import { useLtpp } from './data.js'
import { usePageTitle } from '../usePageTitle.js'
import Reveal from '../components/Reveal.jsx'

export default function LtppFinancing() {
  usePageTitle('Financing · LTPP 2050', 'The USD 3.6 trillion the plan needs, and where it comes from.')
  const { data, loading } = useLtpp()
  if (loading) return <div className="container section"><p>Loading…</p></div>
  const { financing, structural } = data

  const groups = []
  const seen = {}
  financing.forEach((f) => {
    if (!seen[f.group]) { seen[f.group] = []; groups.push([f.group, seen[f.group]]) }
    seen[f.group].push(f)
  })
  const maxShare = Math.max(...structural.map((s) => Number(s.share_2050)))

  return (
    <div className="container section stack">
      <Reveal as="section" className="cols">
        <div className="cols__label">Financing</div>
        <div>
          <h1>US$3.6 trillion over 25 years</h1>
          <p className="lede measure">Reaching a one-trillion-dollar economy will take sustained investment of about US$3.6 trillion across the plan period, mobilised predominantly through a vibrant private sector and complemented by public resources.</p>
        </div>
      </Reveal>

      <hr className="rule rule--strong" />

      {groups.map(([group, rows], gi) => (
        <Reveal as="section" key={group} className="cols" delay={gi ? 30 : 0}>
          <div className="cols__label">{group}</div>
          <div>
            <ul className="deflist">
              {rows.map((r) => <li key={r.id}><strong>{r.name}.</strong> {r.detail}</li>)}
            </ul>
          </div>
        </Reveal>
      ))}

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">Structural transformation</div>
        <div className="stack">
          <p className="measure">The money is meant to reshape the economy itself. By 2050 the plan expects the composition of GDP to shift toward industry and high-value services, with agriculture smaller in share but far more productive.</p>
          <div className="alloc">
            {structural.map((s) => (
              <div key={s.id} className="alloc__row">
                <span className="alloc__name">{s.sector}</span>
                <span className="alloc__track"><span className="alloc__fill" style={{ width: `${(Number(s.share_2050) / maxShare) * 100}%` }} /></span>
                <span className="alloc__val">{s.share_2050}<span className="alloc__unit">% of GDP</span></span>
              </div>
            ))}
          </div>
          <p className="viz__note">Projected 2050 GDP composition. Inflation is to be held within a 3 to 5 percent range. Source page 12.</p>
        </div>
      </section>

      <hr className="rule rule--strong" />
      <section className="pager">
        <Link className="pager__link" to="/ltpp/architecture">← The architecture</Link>
        <Link className="pager__link pager__link--next" to="/fydp/financing">FYDP IV financing →</Link>
      </section>
    </div>
  )
}
