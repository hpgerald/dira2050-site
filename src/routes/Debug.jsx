import { useData } from '../useData.js'
import {
  getPillars,
  getEnablers,
  nationalTargets,
} from '../lib/data.js'

// Phase 2 Definition of Done: boots, loads the real CSVs, shows correct counts.
export default function Debug() {
  const { data, loading, error } = useData()

  if (loading) return <p>Loading datasets…</p>
  if (error) return <p role="alert">Error loading data: {String(error.message)}</p>

  const counts = [
    ['Pillars', data.pillars.length],
    ['Drivers (enablers)', data.enablers.length],
    ['Foundation attributes', data.foundation.length],
    ['Targets', data.targets.length],
    ['— of which national', nationalTargets(data).length],
    ['Sectors', data.sectors.length],
    ['Sector KPIs', data.sectorKpis.length],
    ['Sector selection criteria', data.sectorCriteria.length],
    ['Driver aspirations', data.aspirations.length],
    ['Milestones', data.milestones.length],
    ['Glossary terms', data.glossary.length],
    ['Sources', data.sources.length],
  ]

  return (
    <section className="debug">
      <h1>Data layer check</h1>
      <p>All datasets loaded from <code>/public/data</code>.</p>

      <table className="debug__table">
        <thead>
          <tr><th>Dataset</th><th>Rows</th></tr>
        </thead>
        <tbody>
          {counts.map(([label, n]) => (
            <tr key={label}><td>{label}</td><td>{n}</td></tr>
          ))}
        </tbody>
      </table>

      <h2>Pillars</h2>
      <ul>
        {getPillars(data).map((p) => (
          <li key={p.id}><strong>{p.short_name}</strong> — {p.name}</li>
        ))}
      </ul>

      <h2>Drivers (pentagon points, in order)</h2>
      <ol>
        {getEnablers(data).map((e) => (
          <li key={e.id}>{e.name}</li>
        ))}
      </ol>
    </section>
  )
}
