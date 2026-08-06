import { useParams, Link } from 'react-router-dom'
import { useFydp } from './data.js'
import { usePageTitle } from '../usePageTitle.js'
import Reveal from '../components/Reveal.jsx'
import Kpis from './Kpis.jsx'

// Detail page for a single strategic pathway (FYDP IV, Chapter 3).
export default function FydpSector() {
  const { id } = useParams()
  const { data, loading } = useFydp()

  // Only pathways that carry KPI rows get a detail page; keep those in order.
  const list = data ? data.pathways.filter((p) => data.pathwayKpis.some((k) => k.pathway === p.id)) : []
  const idx = list.findIndex((x) => x.id === id)
  const s = idx >= 0 ? list[idx] : null
  usePageTitle(s ? `${s.name} · FYDP IV` : 'Pathway · FYDP IV', s ? s.summary : '')

  if (loading) return <div className="container section"><p>Loading…</p></div>
  if (!s) {
    return (
      <div className="container section stack">
        <h1>Pathway not found</h1>
        <p><Link className="btn" to="/fydp/sectors">Back to the pathways</Link></p>
      </div>
    )
  }

  const kpis = data.pathwayKpis.filter((k) => k.pathway === id)
  const prev = list[idx - 1], next = list[idx + 1]

  return (
    <div className="container section stack">
      <Reveal as="section" className="cols">
        <div className="cols__label">{s.cluster}</div>
        <div>
          <h1>{s.name}</h1>
          {s.summary ? <p className="lede measure">{s.summary}</p> : null}
        </div>
      </Reveal>

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">Targets by 2030/31</div>
        <div className="stack">
          <p className="measure">Where each measure stands now, and where FYDP IV aims to take it by 2030/31.</p>
          <Reveal><Kpis items={kpis} /></Reveal>
          <p className="viz__note">Baseline years vary by indicator, as published. Source page {s.source_page}.</p>
        </div>
      </section>

      <hr className="rule rule--strong" />

      <section className="pager">
        {prev
          ? <Link className="pager__link" to={`/fydp/sectors/${prev.id}`}>← {prev.name}</Link>
          : <Link className="pager__link" to="/fydp/sectors">← All pathways</Link>}
        {next
          ? <Link className="pager__link pager__link--next" to={`/fydp/sectors/${next.id}`}>{next.name} →</Link>
          : <Link className="pager__link pager__link--next" to="/fydp/financing">Financing →</Link>}
      </section>
    </div>
  )
}
