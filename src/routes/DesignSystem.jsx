import { useData } from '../useData.js'
import { getEnablers } from '../lib/data.js'
import DriverIndex from '../components/Pentagram.jsx'
import StatCard from '../components/StatCard.jsx'

const GREYS = [
  ['--white', 'White'], ['--g-100', 'Grey 100'], ['--g-300', 'Grey 300'],
  ['--g-500', 'Grey 500'], ['--g-700', 'Grey 700'], ['--black', 'Black'],
]

export default function DesignSystem() {
  const { data, loading } = useData()
  const enablers = loading ? [] : getEnablers(data)

  return (
    <div className="container section stack">
      <div className="cols">
        <div className="cols__label">Design system</div>
        <div>
          <h1>An editorial system in black, white and grey.</h1>
          <p className="measure">Inspired by Pentagram: neo-grotesque type, a strict grid, thin rules and generous
          whitespace. Meaning comes from scale, weight and layout, never colour.</p>
        </div>
      </div>

      <hr className="rule rule--strong" />

      {/* The Drivers hub as an editorial index */}
      <section className="cols">
        <div className="cols__label">The hub · Drivers</div>
        <div>
          <p className="measure">The five Drivers are the site's primary navigation, presented as a numbered index.
          Each row is a large type target that inverts to black on hover or keyboard focus.</p>
          <DriverIndex items={enablers} onSelect={() => {}} ariaLabel="The five Drivers" />
        </div>
      </section>

      <hr className="rule rule--strong" />

      {/* Greyscale */}
      <section className="cols">
        <div className="cols__label">Palette</div>
        <div>
          <h3>Monochrome only</h3>
          <div className="ds__swatches">
            {GREYS.map(([v, label]) => (
              <div key={v} className="ds__swatch"
                style={{ background: `var(${v})`, color: (v === '--black' || v === '--g-700' || v === '--g-500') ? '#fff' : '#111' }}>
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="rule rule--strong" />

      {/* Type scale */}
      <section className="cols">
        <div className="cols__label">Typography</div>
        <div className="ds__scale">
          <span className="eyebrow">Eyebrow: Inter, uppercase, tracked</span>
          <h1>Display heading</h1>
          <h2>Section heading</h2>
          <h3>Subsection heading</h3>
          <p className="measure">Body copy is Inter at 17px with comfortable leading. Short sentences. Plain words.
          Written for everyone.</p>
        </div>
      </section>

      <hr className="rule rule--strong" />

      {/* Stat cards */}
      <section className="cols">
        <div className="cols__label">Figures</div>
        <div className="grid-stats">
          <StatCard value="1" unit="trillion USD" label="Economy size by 2050" note="From a lower-middle-income base." />
          <StatCard value="7,000" unit="USD" label="Income per person" baseline={1277} baselineYear={2023} />
          <StatCard value="3,000" unit="kWh" label="Electricity per person" baseline={170} baselineYear={2024} />
          <StatCard value="0" unit="%" label="Extreme poverty" baseline={26} baselineYear={2024} />
        </div>
      </section>

      <hr className="rule rule--strong" />

      {/* Buttons + chips */}
      <section className="cols">
        <div className="cols__label">Controls</div>
        <div className="stack">
          <p>
            <button className="btn">Explore the Vision</button>{' '}
            <button className="btn btn--ghost">See the data</button>
          </p>
          <p>
            <span className="chip">Economy</span>{' '}
            <span className="chip">People</span>{' '}
            <span className="chip chip--fill">Environment</span>
          </p>
        </div>
      </section>
    </div>
  )
}
