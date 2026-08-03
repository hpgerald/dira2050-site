import { useParams, Link } from 'react-router-dom'
import { useData } from '../../useData.js'
import { getSector, kpisForSector, outlookForSector, pipes } from '../../lib/data.js'
import { isNumber } from '../../lib/format.js'
import { useLang } from '../../i18n.jsx'
import { usePageTitle } from '../../usePageTitle.js'
import StoryTemplate from '../components/StoryTemplate.jsx'
import { ProSection, InfoPanel } from '../components/primitives.jsx'
import Basis from '../../components/Basis.jsx'
import NotFound from '../../routes/NotFound.jsx'

// Stable sector → opportunity mapping (ids, so it works in both languages).
const SECTOR_OPPS = {
  agriculture: ['o6'], tourism: ['o9'], manufacturing: ['o3'], mining: ['o1'],
  'blue-economy': ['o10'], 'sports-creative': ['o14'], financial: ['o13'], construction: ['o8'], services: ['o5'],
}

export default function ProSector() {
  const { id } = useParams()
  const { t } = useLang()
  const { data, loading } = useData()
  const s = data ? getSector(data, id) : null
  usePageTitle(s ? s.name : t('pro.sector.title'))

  if (loading) return <ProSection><p>{t('common.loading')}</p></ProSection>
  if (!s) return <NotFound />

  const kpis = kpisForSector(data, id)
  const outlook = outlookForSector(data, id)
  const priorities = pipes(s.priorities)
  const opps = (SECTOR_OPPS[id] || []).map((oid) => data.intelOpportunities.find((o) => o.id === oid)).filter(Boolean)
  const others = data.sectors.filter((x) => x.id !== id)

  const blocks = []

  // The 2050 ambition
  if (s.vision_2050) blocks.push({
    label: t('pro.sector.ambition'),
    node: <p className="pro-section__lead" style={{ color: 'var(--pro-soft)' }}>{s.vision_2050}</p>,
  })

  // Why it matters - documented rationale + momentum signal
  if (outlook?.rationale) blocks.push({
    label: t('pro.sector.why'), variant: 'alt',
    node: (
      <div>
        {outlook.signal && (
          <p className="pro-sec__momentum">
            <span className="pro-sec__momolabel">{t('pro.sector.momentum')}</span>
            <span className={`pro-sec__signal pro-sec__signal--${String(outlook.signal).toLowerCase()}`}>{t(`maps.signal.${outlook.signal}`)}</span>
          </p>
        )}
        <p className="pro-section__lead" style={{ color: 'var(--pro-soft)' }}>{outlook.rationale}</p>
        <p className="pro-sec__src">
          <Basis value={outlook.basis} />
          {outlook.source_page ? <span className="pro-sec__page">{t('pro.sector.pageAbbr')}{outlook.source_page}</span> : null}
        </p>
      </div>
    ),
  })

  // What it will take - the enablers (analytical)
  if (priorities.length) blocks.push({
    label: t('pro.sector.take'),
    variant: outlook?.rationale ? undefined : 'alt',
    node: (
      <div>
        <ul className="pro-sec__take">
          {priorities.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
        <p className="pro-sec__src" style={{ marginTop: '1rem' }}><Basis value="Inferred" /></p>
      </div>
    ),
  })

  // Key figures (only some sectors have measured KPIs)
  if (kpis.length) blocks.push({
    label: t('pro.sector.kpis'), variant: 'alt',
    node: <InfoPanel rows={kpis.map((k) => [k.indicator, `${isNumber(k.baseline_value) ? Number(k.baseline_value).toLocaleString('en-US') : '–'} ${k.unit || ''}${k.baseline_year ? ` (${k.baseline_year})` : ''}`])} />,
  })

  // Opportunities within the sector
  if (opps.length) blocks.push({
    label: t('pro.sector.opportunities'),
    node: <p className="pro-chips">{opps.map((o) => <Link key={o.id} className="pro-chip" to="/pro/opportunities">{o.title}</Link>)}</p>,
  })

  // Explore other sectors
  blocks.push({
    label: t('pro.sector.connections'), variant: 'alt',
    node: <p className="pro-chips">{others.map((o) => <Link key={o.id} className="pro-chip" to={`/pro/sectors/${o.id}`}>{o.name}</Link>)}</p>,
  })

  return (
    <StoryTemplate
      badge={t('pro.sector.badge')}
      title={s.name}
      summary={s.current_contribution}
      fullPageTo="/pro/sectors"
      fullPageLabel={t('pro.sector.title')}
      blocks={blocks}
    />
  )
}
