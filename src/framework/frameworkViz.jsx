/*
  Small base-design (monochrome, no framer-motion) visualizations for the
  National Framework. Each reads documented structure and renders it cleanly.
*/

// Results chain: governance unlocks transformation unlocks outcomes.
export function ResultsChain() {
  const steps = [
    { code: 'I', name: 'Governance', sub: 'unlocks the rest' },
    { code: 'II', name: 'Transformation', sub: 'turns reform into growth' },
    { code: 'III', name: 'Outcomes', sub: 'the payoff for people' },
  ]
  return (
    <div>
      <ol className="rchain">
        {steps.map((s, i) => (
          <li key={s.code} className="rchain__cell">
            <div className="rchain__step">
              <span className="rchain__code">{s.code}</span>
              <span className="rchain__name">{s.name}</span>
              <span className="rchain__sub">{s.sub}</span>
            </div>
            {i < steps.length - 1 && <span className="rchain__arrow" aria-hidden="true">→</span>}
          </li>
        ))}
      </ol>
      <p className="viz__note">Guided by the principle “Do First What Unlocks the Rest”: remove the key constraints first, so later investments can succeed.</p>
    </div>
  )
}

// The 3i pathway: Investment, Infusion, Innovation.
export function ThreeI() {
  const items = [
    { i: 'Investment', d: 'mobilised into priorities' },
    { i: 'Infusion', d: 'of technology, systems and knowledge' },
    { i: 'Innovation', d: 'to lift productivity and services' },
  ]
  return (
    <div>
      <ol className="threei">
        {items.map((it, n) => (
          <li key={it.i} className="threei__cell">
            <div className="threei__item">
              <span className="threei__i">{it.i}</span>
              <span className="threei__d">{it.d}</span>
            </div>
            {n < items.length - 1 && <span className="threei__plus" aria-hidden="true">+</span>}
          </li>
        ))}
      </ol>
      <p className="viz__note">The 3i pathway is how structural transformation actually happens, carried from the Long Term Perspective Plan through every programme and project.</p>
    </div>
  )
}

// Flagship milestone pipeline: the ordered delivery stages.
export function FlagshipPipeline({ stages }) {
  return (
    <ol className="pipe" aria-label="Flagship delivery milestones">
      {stages.map((s, i) => (
        <li key={s} className="pipe__step">
          <span className="pipe__n">{i + 1}</span>
          <span className="pipe__label">{s}</span>
        </li>
      ))}
    </ol>
  )
}

// Performance rating bands (a filled-segment meter per band) + scoring flow.
export function ScoreScale({ bands }) {
  const flow = ['Indicator scored vs target', 'Weighted by importance', 'Aggregated up', 'National scorecard']
  return (
    <div>
      <ul className="bands">
        {bands.map((b) => (
          <li key={b.id} className="band">
            <span className="band__meter" aria-hidden="true">
              {[1, 2, 3, 4].map((n) => <i key={n} className={n <= Number(b.level) ? 'on' : ''} />)}
            </span>
            <span className="band__name">{b.band}</span>
            <span className="band__meaning">{b.meaning}</span>
          </li>
        ))}
      </ul>
      <ol className="flowline" aria-label="How scoring works">
        {flow.map((f, i) => (
          <li key={f} className="flowline__step">
            {f}{i < flow.length - 1 && <span className="flowline__arrow" aria-hidden="true">→</span>}
          </li>
        ))}
      </ol>
    </div>
  )
}

// Guiding principles grid.
export function Principles({ items }) {
  return (
    <div className="prin">
      {items.map((p) => (
        <div key={p.id} className="prin__card">
          <h3 className="prin__name">{p.name}</h3>
          <p className="prin__intent">{p.intent}</p>
          <p className="prin__out"><span className="prin__lbl">Result</span>{p.outcome}</p>
        </div>
      ))}
    </div>
  )
}

// Monitoring & evaluation methods table.
export function Methods({ items }) {
  return (
    <ul className="meth">
      {items.map((m) => (
        <li key={m.id} className="meth__row">
          <div className="meth__head">
            <span className="meth__name">{m.method}</span>
            <span className="meth__tag">{m.kind}</span>
          </div>
          <p className="meth__purpose">{m.purpose}</p>
          <p className="meth__when">{m.cadence}</p>
        </li>
      ))}
    </ul>
  )
}

// Digital Intelligence Layer: many data sources into one live evidence base.
export function DigitalIntel({ sources }) {
  return (
    <div className="dintel">
      <ul className="dintel__sources">
        {sources.map((s) => <li key={s.id} className="chip chip--soft">{s.source}</li>)}
      </ul>
      <span className="dintel__arrow" aria-hidden="true">→</span>
      <div className="dintel__hub">
        <span className="dintel__hub-t">Digital Intelligence Layer</span>
        <span className="dintel__hub-s">one live national evidence base</span>
      </div>
      <span className="dintel__arrow" aria-hidden="true">→</span>
      <div className="dintel__out">Early warning, so problems are caught as they start.</div>
    </div>
  )
}

// Escalation ladder: where an unresolved issue goes next.
export function Escalation({ tiers }) {
  return (
    <ol className="escal">
      {tiers.map((t) => (
        <li key={t.id} className="escal__step" style={{ marginLeft: `${(Number(t.level) - 1) * 1.6}rem` }}>
          <span className="escal__lvl">{t.level}</span>
          <div>
            <span className="escal__tier">{t.tier}</span>
            <span className="escal__act">{t.action}</span>
          </div>
        </li>
      ))}
    </ol>
  )
}

// Reporting cadence: monthly, quarterly, annual.
export function Cadence() {
  const rows = [
    { k: 'Monthly', v: 'Performance data updates in e-Delivery.' },
    { k: 'Quarterly', v: 'Reviews resolve implementation bottlenecks.' },
    { k: 'Annual', v: 'A national report on progress against the plan.' },
  ]
  return (
    <ul className="cadence">
      {rows.map((r) => (
        <li key={r.k} className="cadence__row">
          <span className="cadence__k">{r.k}</span>
          <span className="cadence__v">{r.v}</span>
        </li>
      ))}
    </ul>
  )
}
