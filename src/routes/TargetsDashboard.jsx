import { useMemo, useState } from 'react'
import { useData } from '../useData.js'
import TargetCard from '../components/TargetCard.jsx'
import { isNumber } from '../lib/format.js'
import { usePageTitle } from '../usePageTitle.js'

const FILTERS = [
  { key: 'all', label: 'All', match: () => true },
  { key: 'economy', label: 'Economy', match: (t) => t.pillar_id === 'economy' },
  { key: 'people', label: 'People', match: (t) => t.pillar_id === 'people' },
  { key: 'environment', label: 'Environment', match: (t) => t.pillar_id === 'environment' },
  { key: 'drivers', label: 'Drivers', match: (t) => !!t.enabler_id },
]

export default function TargetsDashboard() {
  usePageTitle('Targets')
  const { data, loading, error } = useData()
  const [active, setActive] = useState('all')

  const filtered = useMemo(() => {
    if (!data) return []
    const f = FILTERS.find((x) => x.key === active) || FILTERS[0]
    return data.targets.filter(f.match)
  }, [data, active])

  if (loading) return <p className="container section">Loading…</p>
  if (error) return <p className="container section" role="alert">Could not load data.</p>

  const measurable = data.targets.filter((t) => isNumber(t.target_value)).length

  return (
    <div className="container section stack">
      <div className="cols">
        <div className="cols__label">Targets</div>
        <div>
          <h1>{data.targets.length} targets. One deadline: 2050.</h1>
          <p className="measure">Where Tanzania is now, and where Dira 2050 aims to be. {measurable} of these carry a
          measurable 2050 figure — the bars show how big each leap really is. Every figure links back to a page in the
          source document.</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="filterbar" role="group" aria-label="Filter targets">
        {FILTERS.map((f) => {
          const count = data.targets.filter(f.match).length
          return (
            <button key={f.key} type="button"
              className={`filterbar__btn ${active === f.key ? 'is-active' : ''}`}
              aria-pressed={active === f.key}
              onClick={() => setActive(f.key)}>
              {f.label} <span className="filterbar__n">{count}</span>
            </button>
          )
        })}
      </div>

      <hr className="rule rule--strong" />

      <p className="resultcount" aria-live="polite">{filtered.length} target{filtered.length === 1 ? '' : 's'}</p>

      <div className="tgrid">
        {filtered.map((t) => <TargetCard key={t.id} t={t} />)}
      </div>
    </div>
  )
}
