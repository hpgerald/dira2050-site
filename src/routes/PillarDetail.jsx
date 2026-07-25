import { useParams, Link } from 'react-router-dom'
import { useData } from '../useData.js'
import { getPillars, getPillar, targetsForPillar } from '../lib/data.js'
import TargetList from '../components/TargetList.jsx'
import NotFound from './NotFound.jsx'
import { usePageTitle } from '../usePageTitle.js'

export default function PillarDetail() {
  const { id } = useParams()
  const { data, loading, error } = useData()
  const pillar = data ? getPillar(data, id) : null
  usePageTitle(pillar ? pillar.short_name : 'Pillar')
  if (loading) return <p className="container section">Loading…</p>
  if (error) return <p className="container section" role="alert">Could not load data.</p>
  if (!pillar) return <NotFound />

  const all = getPillars(data)
  const idx = all.findIndex((p) => p.id === id)
  const prev = all[idx - 1]
  const next = all[idx + 1]
  const targets = targetsForPillar(data, id)

  return (
    <article className="container section stack">
      <p className="eyebrow"><Link to="/pillars">Pillars</Link> · Pillar {idx + 1} of {all.length}</p>
      <div className="cols">
        <div className="cols__label">Pillar {String(idx + 1).padStart(2, '0')}</div>
        <div>
          <h1>{pillar.name}</h1>
          <p className="lede measure">{pillar.summary}</p>
        </div>
      </div>

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">What it aims for · by 2050</div>
        <div><TargetList targets={targets} /></div>
      </section>

      <hr className="rule" />

      <nav className="pager">
        {prev ? <Link className="pager__link" to={`/pillars/${prev.id}`}>← {prev.short_name}</Link> : <span />}
        {next ? <Link className="pager__link pager__link--next" to={`/pillars/${next.id}`}>{next.short_name} →</Link> : <span />}
      </nav>
    </article>
  )
}
