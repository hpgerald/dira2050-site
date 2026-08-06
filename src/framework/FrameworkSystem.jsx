import { Link } from 'react-router-dom'
import { useFramework } from './data.js'
import { usePageTitle } from '../usePageTitle.js'
import Reveal from '../components/Reveal.jsx'
import { ScoreScale, Cadence, Methods, DigitalIntel, Escalation } from './frameworkViz.jsx'

// The national delivery system as a vertical org flow (base CSS, no framer-motion).
const TIERS = [
  [{ name: 'Cabinet', note: 'Sets strategic direction' }],
  [{ name: 'National Planning Commission', note: 'Central authority · tracks and tests' }],
  [
    { name: 'Sector Ministries (MDAs)', note: 'Deliver sector plans' },
    { name: 'Ministry for Regional Admin & Local Government', note: 'Aligns local delivery' },
  ],
  [{ name: 'Regional Secretariats', note: 'Coordinate and validate regional data' }],
  [{ name: 'Local Government Authorities', note: 'Deliver at the local level' }],
]

export default function FrameworkSystem() {
  usePageTitle('The delivery system · National Framework', 'Who does what, from Cabinet to the local council, all reporting into one platform.')
  const { data, loading } = useFramework()
  if (loading) return <div className="container section"><p>Loading…</p></div>
  const { institutions, scoring, methods, signals, escalation } = data

  return (
    <div className="container section stack">
      <Reveal as="section" className="cols">
        <div className="cols__label">The delivery system</div>
        <div>
          <h1>Who does what</h1>
          <p className="lede measure">Roles are clear from Cabinet down to the local council. Every level reports its performance into one digital platform, e-Delivery.</p>
        </div>
      </Reveal>

      <hr className="rule" />

      <Reveal>
        <div className="dsys">
          {TIERS.map((row, ti) => (
            <div key={ti}>
              <div className={`dsys__row ${row.length > 1 ? 'dsys__row--split' : ''}`}>
                {row.map((b) => (
                  <div key={b.name} className={`dsys__box ${ti === 0 ? 'dsys__box--lead' : ''}`}>
                    <span className="dsys__name">{b.name}</span>
                    <span className="dsys__note">{b.note}</span>
                  </div>
                ))}
              </div>
              {ti < TIERS.length - 1 && <span className="dsys__stem" aria-hidden="true" />}
            </div>
          ))}
          <p className="dsys__foot">All performance data flows up into <strong>e-Delivery</strong>, the national digital results platform and dashboards.</p>
        </div>
      </Reveal>

      <hr className="rule" />

      <Reveal as="section" className="cols">
        <div className="cols__label">Roles in full</div>
        <div className="stack">
          <ul className="deflist">
            {institutions.map((n) => (
              <li key={n.id}><strong>{n.name}.</strong> {n.role}</li>
            ))}
          </ul>
        </div>
      </Reveal>

      <hr className="rule" />

      <Reveal as="section" className="cols">
        <div className="cols__label">How progress is monitored</div>
        <div className="stack">
          <p className="measure">Five core methods run continuously, from real-time dashboards to field verification and periodic evaluation.</p>
          <Methods items={methods} />
        </div>
      </Reveal>

      <hr className="rule" />

      <Reveal as="section" className="cols">
        <div className="cols__label">Early warning</div>
        <div className="stack">
          <p className="measure">The methods feed a single digital layer. It pulls data from across government into one place and watches it in real time, so a delay shows up while there is still time to act.</p>
          <DigitalIntel sources={signals} />
        </div>
      </Reveal>

      <hr className="rule" />

      <Reveal as="section" className="cols">
        <div className="cols__label">Scorecards</div>
        <div className="stack">
          <p className="measure">Every indicator is scored against its target, weighted, and rolled up into institutional, sector and national scorecards, then rated on a common four-band scale.</p>
          <ScoreScale bands={scoring} />
        </div>
      </Reveal>

      <hr className="rule" />

      <Reveal as="section" className="cols">
        <div className="cols__label">The reporting rhythm</div>
        <div className="stack">
          <p className="measure">Ratings are applied on a fixed cadence, so problems surface early and trigger corrective action rather than a year-end surprise.</p>
          <Cadence />
        </div>
      </Reveal>

      <hr className="rule" />

      <Reveal as="section" className="cols">
        <div className="cols__label">When something is off track</div>
        <div className="stack">
          <p className="measure">A poor rating does not just sit in a report. It moves up a clear ladder until someone with the authority to act deals with it.</p>
          <Escalation tiers={escalation} />
        </div>
      </Reveal>

      <hr className="rule rule--strong" />

      <section className="pager">
        <Link className="pager__link" to="/framework/priority-areas">← Priority areas</Link>
        <Link className="pager__link pager__link--next" to="/dira">Vision 2050 →</Link>
      </section>
    </div>
  )
}
