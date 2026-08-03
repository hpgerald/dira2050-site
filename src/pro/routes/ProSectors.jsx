import { Link } from 'react-router-dom'
import { useData } from '../../useData.js'
import { useLang } from '../../i18n.jsx'
import { usePageTitle } from '../../usePageTitle.js'
import { ProSection, Reveal, ProCard } from '../components/primitives.jsx'

export default function ProSectors() {
  const { t } = useLang()
  usePageTitle(t('pro.sector.title'), t('pro.sector.lead'))
  const { data, loading } = useData()
  if (loading) return <ProSection><p>{t('common.loading')}</p></ProSection>

  return (
    <ProSection h1 title={t('pro.sector.title')} lead={t('pro.sector.lead')}>
      <div className="pro-cards" style={{ marginTop: '2rem' }}>
        {data.sectors.map((s, i) => (
          <Reveal key={s.id} delay={Math.min(i, 8) * 0.03}>
            <ProCard as={Link} to={`/pro/sectors/${s.id}`} title={s.name} body={s.current_contribution}
              footer={<p className="pro-card__link" style={{ marginTop: '1rem' }}>{t('pro.explore.open')} →</p>} />
          </Reveal>
        ))}
      </div>
    </ProSection>
  )
}
