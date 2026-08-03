import { useData } from '../../useData.js'
import { getEnablers, getSector } from '../../lib/data.js'
import { isNumber } from '../../lib/format.js'
import { useLang } from '../../i18n.jsx'
import { usePageTitle } from '../../usePageTitle.js'
import { ProSection } from '../components/primitives.jsx'
import { Treemap, SankeyFlow, SmallMultiples } from '../components/charts.jsx'

// Stable GDP shares (by sector id) - documented in the Vision; "Other" is the remainder.
const GDP_SHARE = { agriculture: 26.5, manufacturing: 8.1, mining: 9 }
const DRIVER_SECTORS = {
  energy: ['manufacturing', 'mining', 'agriculture'],
  logistics: ['manufacturing', 'mining', 'agriculture', 'tourism'],
  'science-tech': ['agriculture', 'manufacturing'],
  rnd: ['manufacturing'],
  digital: ['financial', 'services'],
}

export default function ProCharts() {
  const { t } = useLang()
  usePageTitle(t('pro.charts.title'), t('pro.charts.lead'))
  const { data, loading } = useData()
  if (loading) return <ProSection><p>{t('common.loading')}</p></ProSection>

  // Short label (drop the parenthetical) so chart cells/labels don't overflow.
  const sectorName = (id) => (getSector(data, id)?.name || id).replace(/\s*\(.*$/, '').trim()

  // Treemap: GDP composition
  const shareSum = Object.values(GDP_SHARE).reduce((a, b) => a + b, 0)
  const treeData = [
    ...Object.entries(GDP_SHARE).map(([id, v]) => ({ name: sectorName(id), value: v, label: `${v}%` })),
    { name: t('pro.charts.other'), value: +(100 - shareSum).toFixed(1), label: `${(100 - shareSum).toFixed(1)}%` },
  ]

  // Small multiples: every target with a baseline and a 2050 value
  const smItems = data.targets
    .filter((tg) => isNumber(tg.baseline_value) && isNumber(tg.target_value))
    .map((tg) => ({ label: tg.indicator, now: Number(tg.baseline_value), goal: Number(tg.target_value) }))

  return (
    <>
      <ProSection h1 title={t('pro.charts.title')} lead={t('pro.charts.lead')} />

      <ProSection variant="alt" eyebrow="01" title={t('pro.charts.treemapTitle')}>
        <div className="pro-chart" style={{ marginTop: '1.5rem' }}>
          <Treemap data={treeData} ariaLabel={t('pro.charts.treemapTitle')} />
          <p className="pro-chart__note">{t('pro.charts.treemapNote')}</p>
        </div>
      </ProSection>

      <ProSection eyebrow="02" title={t('pro.charts.sankeyTitle')}>
        <div className="pro-chart" style={{ marginTop: '1.5rem' }}>
          <SankeyFlow drivers={getEnablers(data)} sectorName={sectorName} edges={DRIVER_SECTORS} ariaLabel={t('pro.charts.sankeyTitle')} />
          <p className="pro-chart__note">{t('pro.charts.sankeyNote')}</p>
        </div>
      </ProSection>

      <ProSection variant="alt" eyebrow="03" title={t('pro.charts.smTitle')}>
        <div className="pro-chart" style={{ marginTop: '1.5rem' }}>
          <SmallMultiples items={smItems} nowLabel={t('pro.charts.now')} goalLabel={t('pro.charts.goal')} />
          <p className="pro-chart__note">{t('pro.charts.smNote')}</p>
        </div>
      </ProSection>
    </>
  )
}
