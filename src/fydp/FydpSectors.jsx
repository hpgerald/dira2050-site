import { Link } from 'react-router-dom'
import { useFydp } from './data.js'
import { usePageTitle } from '../usePageTitle.js'
import Reveal from '../components/Reveal.jsx'

export default function FydpSectors() {
  usePageTitle('Strategic pathways · FYDP IV', 'All forty-eight pathways across the economy, people, environment, enablers and governance.')
  const { data, loading } = useFydp()
  if (loading) return <div className="container section"><p>Loading…</p></div>
  const { pathways, pathwayKpis } = data

  // A pathway is clickable once its KPI table has been added.
  const hasDetail = new Set(pathwayKpis.map((k) => k.pathway))

  // Group by cluster, preserving first-seen order.
  const groups = []
  const seen = {}
  pathways.forEach((p) => {
    if (!seen[p.cluster]) { seen[p.cluster] = []; groups.push([p.cluster, seen[p.cluster]]) }
    seen[p.cluster].push(p)
  })

  return (
    <div className="container section stack">
      <Reveal as="section" className="cols">
        <div className="cols__label">Strategic pathways</div>
        <div>
          <h1>Everything the plan will move on</h1>
          <p className="lede measure">FYDP IV works through forty-eight strategic pathways, grouped into six clusters. Together they cover the whole economy, its people, its environment, its enablers and how the country is governed.</p>
        </div>
      </Reveal>

      <hr className="rule rule--strong" />

      {groups.map(([cluster, items], gi) => (
        <Reveal as="section" key={cluster} className="cols" delay={gi ? 30 : 0}>
          <div className="cols__label">{cluster}</div>
          <div>
            <ul className="chiplist">
              {items.map((p) => (hasDetail.has(p.id)
                ? <li key={p.id}><Link className="chip chip--soft chip--link" to={`/fydp/sectors/${p.id}`}>{p.name} →</Link></li>
                : <li key={p.id} className="chip chip--soft chip--muted">{p.name}</li>))}
            </ul>
          </div>
        </Reveal>
      ))}

      <hr className="rule rule--strong" />
      <section className="pager">
        <Link className="pager__link" to="/fydp/economy">← The economy</Link>
        <Link className="pager__link pager__link--next" to="/fydp/financing">Financing →</Link>
      </section>
    </div>
  )
}
