import { Link } from 'react-router-dom'
import { useData } from '../../useData.js'
import { useLang } from '../../i18n.jsx'
import { usePageTitle } from '../../usePageTitle.js'
import { ProSection, Reveal, ProCard } from '../components/primitives.jsx'

export default function ProAudiences() {
  const { t } = useLang()
  usePageTitle(t('pro.audience.title'), t('pro.audience.lead'))
  const { data, loading } = useData()
  if (loading) return <ProSection><p>{t('common.loading')}</p></ProSection>

  return (
    <ProSection h1 title={t('pro.audience.title')} lead={t('pro.audience.lead')} eyebrow={t('pro.audience.choose')}>
      <div className="pro-cards" style={{ marginTop: '2rem' }}>
        {data.intelAudiences.map((a, i) => (
          <Reveal key={a.id} delay={Math.min(i, 8) * 0.03}>
            <ProCard as={Link} to={`/pro/for/${a.id}`} title={a.audience} body={a.why}
              footer={<p className="pro-card__link" style={{ marginTop: '1rem' }}>{t('pro.explore.open')} →</p>} />
          </Reveal>
        ))}
      </div>
    </ProSection>
  )
}
