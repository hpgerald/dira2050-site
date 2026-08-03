import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../../useData.js'
import { getPillars, getEnablers } from '../../lib/data.js'
import { useLang } from '../../i18n.jsx'
import { usePageTitle } from '../../usePageTitle.js'
import { ProSection, Reveal } from '../components/primitives.jsx'

const norm = (s) => (s || '').toString().toLowerCase()
const FACETS = ['all', 'goal', 'target', 'pillar', 'driver', 'sector', 'foundation', 'principle', 'theme']

// Build the unified, cross-linked entity index from data + authored sets.
function buildEntities(data, t) {
  if (!data) return []
  const e = []
  getPillars(data).forEach((p) => e.push({ id: p.id, type: 'pillar', title: p.name, summary: p.summary, to: `/pro/story/pillar/${p.id}` }))
  getEnablers(data).forEach((d) => e.push({ id: d.id, type: 'driver', title: d.name, summary: d.summary, to: `/pro/story/driver/${d.id}` }))
  data.foundation.forEach((f) => e.push({ id: f.id, type: 'foundation', title: f.name, summary: f.description }))
  data.sectors.forEach((s) => e.push({ id: s.id, type: 'sector', title: s.name, summary: s.vision_2050, to: `/pro/sectors/${s.id}` }))
  data.targets.forEach((tg) => e.push({ id: tg.id, type: 'target', title: tg.indicator, summary: tg.plain_language, to: '/targets', pillar_id: tg.pillar_id, enabler_id: tg.enabler_id }))
  t('vision.goals').forEach((g, i) => e.push({ id: `goal-${i}`, type: 'goal', title: g[0], summary: g[1], to: '/vision' }))
  t('pro.explore.principles').forEach((p, i) => e.push({ id: `prin-${i}`, type: 'principle', title: p[0], summary: p[1] }))
  t('pro.explore.themes').forEach((th, i) => e.push({ id: `theme-${i}`, type: 'theme', title: th[0], summary: th[1] }))
  return e
}

// Resolve an entity's connections to other entities.
function related(entity, all) {
  const find = (type, id) => all.find((x) => x.type === type && x.id === id)
  let out = []
  if (entity.type === 'target') out = [find('pillar', entity.pillar_id), find('driver', entity.enabler_id)]
  else if (entity.type === 'driver') out = all.filter((x) => x.type === 'target' && x.enabler_id === entity.id).slice(0, 3)
  else if (entity.type === 'pillar') out = all.filter((x) => x.type === 'target' && x.pillar_id === entity.id).slice(0, 3)
  else if (entity.type === 'sector') out = [find('pillar', 'economy')]
  return out.filter(Boolean)
}

export default function ProExplore() {
  const { t } = useLang()
  usePageTitle(t('pro.explore.title'), t('pro.explore.lead'))
  const { data, loading } = useData()
  const [query, setQuery] = useState('')
  const [facet, setFacet] = useState('all')

  const entities = useMemo(() => buildEntities(data, t), [data, t])
  const counts = useMemo(() => {
    const c = { all: entities.length }
    entities.forEach((e) => { c[e.type] = (c[e.type] || 0) + 1 })
    return c
  }, [entities])

  const results = useMemo(() => {
    const q = norm(query)
    return entities.filter((e) => (facet === 'all' || e.type === facet))
      .filter((e) => !q || norm(e.title).includes(q) || norm(e.summary).includes(q))
  }, [entities, facet, query])

  if (loading) return <ProSection><p>{t('common.loading')}</p></ProSection>

  return (
    <ProSection h1 title={t('pro.explore.title')} lead={t('pro.explore.lead')}>
      <div className="pro-explore" style={{ marginTop: '2rem' }}>
        <input
          type="search"
          className="pro-search"
          placeholder={t('pro.explore.searchPlaceholder')}
          aria-label={t('pro.explore.searchPlaceholder')}
          value={query}
          onChange={(ev) => setQuery(ev.target.value)}
        />

        <div className="pro-facets" role="group" aria-label={t('pro.explore.title')}>
          {FACETS.filter((f) => f === 'all' || counts[f]).map((f) => (
            <button key={f} type="button" aria-pressed={facet === f}
              className={`pro-facet ${facet === f ? 'is-active' : ''}`} onClick={() => setFacet(f)}>
              {f === 'all' ? t('pro.explore.facet.all') : t(`pro.explore.facet.${f}`)}
              <span className="pro-facet__n">{counts[f] || 0}</span>
            </button>
          ))}
        </div>

        <p className="pro-explore__count" aria-live="polite">{t('pro.explore.count')(results.length)}</p>

        {results.length === 0 ? (
          <p className="pro-section__lead">{t('pro.explore.noResults')}</p>
        ) : (
          <div className="pro-results">
            {results.map((e, i) => {
              const rel = related(e, entities)
              const Card = e.to ? Link : 'div'
              return (
                <Reveal key={`${e.type}-${e.id}`} delay={Math.min(i, 8) * 0.02}>
                  <article className="pro-result">
                    <span className="pro-result__type">{t(`pro.explore.badge.${e.type}`)}</span>
                    <Card {...(e.to ? { to: e.to, className: 'pro-result__titlelink' } : { className: 'pro-result__titlelink' })}>
                      <h3 className="pro-result__title">{e.title}</h3>
                    </Card>
                    {e.summary && <p className="pro-result__sum">{e.summary}</p>}
                    {rel.length > 0 && (
                      <p className="pro-result__rel">
                        <span className="pro-result__rellabel">{t('pro.explore.related')}:</span>
                        {rel.map((r) => (r.to
                          ? <Link key={`${r.type}-${r.id}`} className="pro-chip" to={r.to}>{r.title}</Link>
                          : <span key={`${r.type}-${r.id}`} className="pro-chip">{r.title}</span>))}
                      </p>
                    )}
                    {e.to && <Link className="pro-result__open" to={e.to}>{t('pro.explore.open')} →</Link>}
                  </article>
                </Reveal>
              )
            })}
          </div>
        )}
      </div>
    </ProSection>
  )
}
