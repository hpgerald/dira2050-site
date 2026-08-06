import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../useData.js'
import { pipes } from '../lib/data.js'
import Basis from '../components/Basis.jsx'
import { usePageTitle } from '../usePageTitle.js'
import { useLang } from '../i18n.jsx'

/*
  One block of the Opportunities & Strategic Intelligence layer, on its own page.
  The main For You page links here; the same data and CSS as the old combined
  view, just split so each section stands alone. Bilingual via t().
*/
const STRAT_ORDER = ['Priority', 'Dependency', 'Capability gap', 'Bottleneck', 'Leverage point', 'Risk']
const ORDER = ['opportunities', 'sector-outlook', 'opportunity-map', 'skills', 'briefing']
const CONFIG = {
  'opportunities': { labelKey: 'si.opportunities', introKey: 'si.oppIntro' },
  'sector-outlook': { labelKey: 'si.outlookLabel', introKey: 'si.outlookIntro' },
  'opportunity-map': { labelKey: 'si.mapLabel', introKey: 'si.mapIntro' },
  'skills': { labelKey: 'si.skillsLabel', introKey: 'si.skillsIntro' },
  'briefing': { labelKey: 'si.briefingLabel', introKey: 'si.briefingIntro' },
}

export default function ForYouIntel({ block }) {
  const { t } = useLang()
  const cfg = CONFIG[block]
  usePageTitle(t(cfg.labelKey), t(cfg.introKey))
  const { data, loading, error } = useData()
  if (loading) return <p className="container section">{t('common.loading')}</p>
  if (error) return <p className="container section" role="alert">{t('common.error')}</p>

  const i = ORDER.indexOf(block)
  const next = ORDER[i + 1]

  return (
    <div className="container section stack">
      <div className="cols">
        <div className="cols__label">{t('si.eyebrow')}</div>
        <div>
          <h1>{t(cfg.labelKey)}</h1>
          <p className="measure">{t(cfg.introKey)}</p>
          <p className="si-legend">
            <Basis value="Documented" /> {t('si.legendDoc')}
            <Basis value="Inferred" /> {t('si.legendInf')}
          </p>
        </div>
      </div>

      <hr className="rule rule--strong" />

      <section className="si">
        {block === 'opportunities' && <Opportunities data={data} t={t} />}
        {block === 'sector-outlook' && <SectorOutlook data={data} t={t} />}
        {block === 'opportunity-map' && <OpportunityMap data={data} t={t} />}
        {block === 'skills' && <Skills data={data} t={t} />}
        {block === 'briefing' && <Briefing data={data} t={t} />}
      </section>

      <hr className="rule rule--strong" />
      <section className="pager">
        <Link className="pager__link" to="/dira/what-it-means">← {t('si.back')}</Link>
        {next && <Link className="pager__link pager__link--next" to={`/dira/what-it-means/${next}`}>{t(CONFIG[next].labelKey)} →</Link>}
      </section>
    </div>
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

function Opportunities({ data, t }) {
  const audiences = data.intelAudiences
  const [aud, setAud] = useState(audiences[0]?.id)
  const active = audiences.find((a) => a.id === aud) || audiences[0]
  return (
    <div className="si-block">
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
  )
}

function SectorOutlook({ data, t }) {
  const sectors = [...data.intelSectors].sort((a, b) => b.attention - a.attention)
  return (
    <div className="si-block">
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
  )
}

function OpportunityMap({ data, t }) {
  const oppTypes = useMemo(() => ['All', ...Array.from(new Set(data.intelOpportunities.map((o) => o.type)))], [data])
  const [oppType, setOppType] = useState('All')
  const opps = oppType === 'All' ? data.intelOpportunities : data.intelOpportunities.filter((o) => o.type === oppType)
  return (
    <div className="si-block">
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
  )
}

function Skills({ data, t }) {
  const skills = [...data.intelSkills].sort((a, b) =>
    (b.demand === 'High') - (a.demand === 'High') || a.category.localeCompare(b.category))
  return (
    <div className="si-block">
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
  )
}

function Briefing({ data, t }) {
  const strat = STRAT_ORDER
    .map((c) => [c, data.intelStrategic.filter((s) => s.category === c)])
    .filter(([, rows]) => rows.length)
  return (
    <div className="si-block">
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
  )
}
