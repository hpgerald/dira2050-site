import { useData } from '../useData.js'
import { usePageTitle } from '../usePageTitle.js'

export default function Timeline() {
  usePageTitle('Timeline')
  const { data, loading, error } = useData()
  if (loading) return <p className="container section">Loading…</p>
  if (error) return <p className="container section" role="alert">Could not load data.</p>

  const items = [...data.milestones].sort((a, b) => a.year - b.year)

  return (
    <div className="container section stack">
      <div className="cols">
        <div className="cols__label">Timeline</div>
        <div>
          <h1>From 2000 to 2050.</h1>
          <p className="measure">Dira 2050 builds on decades of progress and runs on a 25-year plan. Here are the
          markers that matter — where Tanzania started, where it is, and where it's headed.</p>
        </div>
      </div>

      <hr className="rule rule--strong" />

      <ol className="timeline">
        {items.map((m) => (
          <li key={`${m.year}-${m.title}`} className="tline">
            <div className="tline__year">{m.year}</div>
            <div className="tline__body">
              <span className="tline__phase">{m.phase}</span>
              <h3 className="tline__title">{m.title}</h3>
              <p className="tline__desc">{m.description}</p>
              {m.source_page && <p className="tline__src">Vision 2050, p.{m.source_page}</p>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
