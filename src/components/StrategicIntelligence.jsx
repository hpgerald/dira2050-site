import { useMemo, useState } from 'react'
import { pipes } from '../lib/data.js'
import Basis from './Basis.jsx'

/*
  Opportunities & Strategic Intelligence — the analytical "second heart" of the
  platform. It goes beyond summarising the document to surface the opportunities,
  skills, sector outlook and strategic signals implied by it. Everything is tagged
  Documented (stated in the text) vs Inferred (our analysis). Monochrome, built
  from the intel_*.csv datasets.
*/
const STRAT_ORDER = ['Priority', 'Dependency', 'Capability gap', 'Bottleneck', 'Leverage point', 'Risk']

export default function StrategicIntelligence({ data }) {
  const audiences = data.intelAudiences
  const [aud, setAud] = useState(audiences[0]?.id)
  const active = audiences.find((a) => a.id === aud) || audiences[0]

  const oppTypes = useMemo(
    () => ['All', ...Array.from(new Set(data.intelOpportunities.map((o) => o.type)))],
    [data],
  )
  const [oppType, setOppType] = useState('All')
  const opps = oppType === 'All'
    ? data.intelOpportunities
    : data.intelOpportunities.filter((o) => o.type === oppType)

  const sectors = [...data.intelSectors].sort((a, b) => b.attention - a.attention)
  const skills = [...data.intelSkills].sort((a, b) =>
    (b.demand === 'High') - (a.demand === 'High') || a.category.localeCompare(b.category))
  const strat = STRAT_ORDER
    .map((c) => [c, data.intelStrategic.filter((s) => s.category === c)])
    .filter(([, rows]) => rows.length)

  return (
    <section className="si" aria-labelledby="si-title">
      <hr className="rule rule--strong" />
      <div className="cols">
        <div className="cols__label">Deep dive</div>
        <div>
          <span className="eyebrow">Opportunities &amp; Strategic Intelligence</span>
          <h2 id="si-title">Don't just read the plan — find your place in it.</h2>
          <p className="measure">Every national strategy quietly signals where investment, jobs, skills and growth
          are heading. This layer extracts that intelligence from Dira 2050 and turns it into decisions you can act on.</p>
          <p className="si-legend">
            <Basis value="Documented" /> stated in the document.
            <Basis value="Inferred" /> our analysis of what it implies.
          </p>
        </div>
      </div>

      {/* 1 · Audience-specific intelligence */}
      <div className="si-block">
        <div className="cols">
          <div className="cols__label">Intelligence for…</div>
          <div>
            <div className="si-audbar" role="group" aria-label="Choose your role">
              {audiences.map((a) => (
                <button key={a.id} type="button" aria-pressed={a.id === aud}
                  className={`si-aud ${a.id === aud ? 'is-active' : ''}`} onClick={() => setAud(a.id)}>
                  {a.audience}
                </button>
              ))}
            </div>

            <div className="si-panel">
              <p className="si-why">{active.why}</p>
              <div className="si-grid">
                <IntelList label="Opportunities" items={pipes(active.opportunities)} />
                <IntelList label="Actions to consider" items={pipes(active.actions)} />
                <IntelList label="Skills to build" items={pipes(active.skills)} />
                <IntelList label="Sectors to watch" items={pipes(active.sectors)} />
                <IntelList label="Institutions to engage" items={pipes(active.engage)} />
              </div>
              <p className="si-tagline"><Basis value="Inferred" /> tailored analysis for {active.audience.toLowerCase()}.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2 · Sector outlook */}
      <div className="si-block">
        <div className="cols">
          <div className="cols__label">Sector outlook</div>
          <div>
            <p className="measure">Where the document points the most attention. Bars show relative strategic
            emphasis (1–5), read from the plan's targets, drivers and named sectors.</p>
            <ul className="si-sectors">
              {sectors.map((s) => (
                <li key={s.sector} className="si-sector">
                  <div className="si-sector__head">
                    <span className="si-sector__name">{s.sector}</span>
                    <span className="si-sector__signal">{s.signal}</span>
                  </div>
                  <span className="si-meter" aria-hidden="true">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i} className={`si-meter__seg ${i <= s.attention ? 'on' : ''}`} />
                    ))}
                  </span>
                  <p className="si-sector__why">{s.rationale} <Basis value={s.basis} /></p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 3 · Opportunity map */}
      <div className="si-block">
        <div className="cols">
          <div className="cols__label">Opportunity map</div>
          <div>
            <div className="filterbar" role="group" aria-label="Filter opportunities">
              {oppTypes.map((t) => (
                <button key={t} className={`filterbar__btn ${oppType === t ? 'is-active' : ''}`}
                  aria-pressed={oppType === t} onClick={() => setOppType(t)}>{t}</button>
              ))}
            </div>
            <div className="si-opps">
              {opps.map((o) => (
                <article key={o.id} className="si-opp">
                  <div className="si-opp__top"><span className="si-opp__type">{o.type}</span><Basis value={o.basis} /></div>
                  <h4 className="si-opp__title">{o.title}</h4>
                  <p className="si-opp__desc">{o.description}</p>
                  <p className="si-opp__meta"><span>{o.who}</span><span className="si-opp__link">{o.linked_area} · p.{o.source_page}</span></p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4 · Skill demand */}
      <div className="si-block">
        <div className="cols">
          <div className="cols__label">Skills in demand</div>
          <div>
            <p className="measure">The competencies the plan will pull on — what to study, teach or reskill into.</p>
            <ul className="si-skills">
              {skills.map((s) => (
                <li key={s.skill} className="si-skill">
                  <div className="si-skill__head">
                    <span className="si-skill__name">{s.skill}</span>
                    <span className={`si-demand si-demand--${String(s.demand).toLowerCase()}`}>{s.demand} demand</span>
                  </div>
                  <p className="si-skill__why">{s.why_matters}</p>
                  <p className="si-skill__where"><span>{s.where_in_strategy}</span> <Basis value={s.basis} /></p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 5 · Strategic briefing */}
      <div className="si-block">
        <div className="cols">
          <div className="cols__label">Strategic briefing</div>
          <div>
            <p className="measure">The systemic picture: what the plan prioritises, what it depends on, where it's
            weak, and the levers most likely to move it.</p>
            {strat.map(([cat, rows]) => (
              <div key={cat} className="si-strat">
                <h4 className="si-strat__cat">{cat}{rows.length > 1 ? 's' : ''}</h4>
                <ul className="si-strat__list">
                  {rows.map((r, i) => (
                    <li key={i} className="si-strat__item">
                      <span>{r.insight}</span> <Basis value={r.basis} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function IntelList({ label, items }) {
  if (!items.length) return null
  return (
    <div className="si-list">
      <p className="si-list__label">{label}</p>
      <ul>{items.map((it, i) => <li key={i}>{it}</li>)}</ul>
    </div>
  )
}
