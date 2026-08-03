import { Link } from 'react-router-dom'
import { useData } from '../../useData.js'
import { getPillars, getEnablers } from '../../lib/data.js'
import { useLang } from '../../i18n.jsx'

/*
  StrategyMap - the canonical, top-to-bottom view of the Vision's hierarchy:
  Vision → Pillars (goals) → Drivers (enablers) → Sectors (delivery).
  Reading order is the hierarchy, so it's legible with no interaction and works
  on mobile. Every tier item links to its detail page. Data-driven + bilingual.
*/
export default function StrategyMap() {
  const { t } = useLang()
  const { data, loading } = useData()
  if (loading || !data) return null

  const pillars = getPillars(data)
  const drivers = getEnablers(data)
  const sectors = data.sectors

  return (
    <div className="pro-smap">
      <div className="pro-smap__vision">
        <span className="pro-smap__eyebrow pro-smap__eyebrow--on">{t('pro.graph.tiers.vision')}</span>
        <span className="pro-smap__vname">{t('pro.graph.visionNode')}</span>
      </div>
      <span className="pro-smap__stem" aria-hidden="true" />

      <p className="pro-smap__eyebrow pro-smap__eyebrow--goal">{t('pro.graph.tiers.pillars')}</p>
      <div className="pro-smap__tier pro-smap__tier--pillars">
        {pillars.map((p) => (
          <Link key={p.id} className="pro-smap__pillar" to={`/pro/story/pillar/${p.id}`}>
            <span className="pro-smap__bar" />
            <span className="pro-smap__name">{p.short_name || p.name}</span>
          </Link>
        ))}
      </div>
      <span className="pro-smap__stem" aria-hidden="true" />

      <p className="pro-smap__eyebrow">{t('pro.graph.tiers.drivers')}</p>
      <div className="pro-smap__tier pro-smap__tier--drivers">
        {drivers.map((d) => (
          <Link key={d.id} className="pro-smap__driver" to={`/pro/story/driver/${d.id}`}>{d.name}</Link>
        ))}
      </div>
      <span className="pro-smap__stem" aria-hidden="true" />

      <p className="pro-smap__eyebrow pro-smap__eyebrow--muted">{t('pro.graph.tiers.sectors')}</p>
      <div className="pro-smap__tier pro-smap__tier--sectors">
        {sectors.map((s) => (
          <Link key={s.id} className="pro-smap__sector" to={`/pro/sectors/${s.id}`}>{s.name}</Link>
        ))}
      </div>
    </div>
  )
}
