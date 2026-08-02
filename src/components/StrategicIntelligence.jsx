import { useMemo, useState } from 'react'
import { pipes } from '../lib/data.js'
import Basis from './Basis.jsx'
import { useLang } from '../i18n.jsx'

/*
  Opportunities & Strategic Intelligence - the analytical "second heart" of the
  platform. Enum-like values (type, basis, demand, signal, category) stay in
  English in the CSVs and are translated for display, so grouping/filtering work
  identically in both languages.
*/
const STRAT_ORDER = ['Priority', 'Dependency', 'Capability gap', 'Bottleneck', 'Leverage point', 'Risk']

export default function StrategicIntelligence({ data }) {
  const { t } = useLang()
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
        <div className="cols__label">{t('si.deepDive')}</div>
        <div>
          <span className="eyebrow">{t('si.eyebrow')}</span>
          <h2 id="si-title">{t('si.h2')}</h2>
          <p className="measure">{t('si.lead')}</p>
          <p className="si-legend">
            <Basis value="Documented" /> {t('si.legendDoc')}
            <Basis value="Inferred" /> {t('si.legendInf')}
          </p>
        </div>
      </div>

      {/* Audience-specific intelligence */}
      <div className="si-block">
        <div className="cols">
          <div className="cols__label">{t('si.forLabel')}</div>
          <div>
            <div className="si-audbar" role="group" aria-label={t('si.forLabel')}>
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
                <IntelList label={t('si.opportunities')} items={pipes(active.opportunities)} />
                <IntelList label={t('si.actions')} items={pipes(active.actions)} />
                <IntelList label={t('si.skills')} items={pipes(active.skills)} />
                <IntelList label={t('si.sectors')} items={pipes(active.sectors)} />
                <IntelList label={t('si.engage')} items={pipes(active.engage)} />
              </div>
              <p className="si-tagline"><Basis value="Inferred" /> {t('si.tailored')(active.audience.toLowerCase())}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sector outlook */}
      <div className="si-block">
        <div className="cols">
          <div className="cols__label">{t('si.outlookLabel')}</div>
          <div>
            <p className="measure">{t('si.outlookIntro')}</p>
            <ul className="si-sectors">
              {sectors.map((s) => (
                <li key={s.sector} className="si-sector">
                  <div className="si-sector__head">
                    <span className="si-sector__name">{s.sector}</span>
                    <span className="si-sector__signal">{t(`maps.signal.${s.signal}`)}</span>
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

      {/* Opportunity map */}
      <div className="si-block">
        <div className="cols">
          <div className="cols__label">{t('si.mapLabel')}</div>
          <div>
            <div className="filterbar" role="group" aria-label={t('si.mapLabel')}>
              {oppTypes.map((ty) => (
                <button key={ty} className={`filterbar__btn ${oppType === ty ? 'is-active' : ''}`}
                  aria-pressed={oppType === ty} onClick={() => setOppType(ty)}>{ty === 'All' ? t('targets.filters.all') : t(`maps.oppType.${ty}`)}</button>
              ))}
            </div>
            <div className="si-opps">
              {opps.map((o) => (
                <article key={o.id} className="si-opp">
                  <div className="si-opp__top"><span className="si-opp__type">{t(`maps.oppType.${o.type}`)}</span><Basis value={o.basis} /></div>
                  <h4 className="si-opp__title">{o.title}</h4>
                  <p className="si-opp__desc">{o.description}</p>
                  <p className="si-opp__meta"><span>{o.who}</span><span className="si-opp__link">{o.linked_area} · {t('common.pageAbbr')}{o.source_page}</span></p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skill demand */}
      <div className="si-block">
        <div className="cols">
          <div className="cols__label">{t('si.skillsLabel')}</div>
          <div>
            <p className="measure">{t('si.skillsIntro')}</p>
            <ul className="si-skills">
              {skills.map((s) => (
                <li key={s.skill} className="si-skill">
                  <div className="si-skill__head">
                    <span className="si-skill__name">{s.skill}</span>
                    <span className={`si-demand si-demand--${String(s.demand).toLowerCase()}`}>{t('si.demand')(t(`maps.demand.${s.demand}`))}</span>
                  </div>
                  <p className="si-skill__why">{s.why_matters}</p>
                  <p className="si-skill__where"><span>{s.where_in_strategy}</span> <Basis value={s.basis} /></p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Strategic briefing */}
      <div className="si-block">
        <div className="cols">
          <div className="cols__label">{t('si.briefingLabel')}</div>
          <div>
            <p className="measure">{t('si.briefingIntro')}</p>
            {strat.map(([cat, rows]) => (
              <div key={cat} className="si-strat">
                <h4 className="si-strat__cat">{rows.length > 1 ? t(`maps.categoryPlural.${cat}`) : t(`maps.category.${cat}`)}</h4>
                <ul className="si-strat__list">
                  {rows.map((r, i) => (
                    <li key={i} className="si-strat__item"><span>{r.insight}</span> <Basis value={r.basis} /></li>
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
