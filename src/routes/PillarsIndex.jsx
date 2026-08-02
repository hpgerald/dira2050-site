import { useData } from '../useData.js'
import { getPillars, getEnablers } from '../lib/data.js'
import DriverIndex from '../components/Pentagram.jsx'
import { usePageTitle } from '../usePageTitle.js'
import { useLang } from '../i18n.jsx'

export default function PillarsIndex() {
  const { t } = useLang()
  usePageTitle(t('framework.label'), t('framework.intro'))
  const { data, loading, error } = useData()
  if (loading) return <p className="container section">{t('common.loading')}</p>
  if (error) return <p className="container section" role="alert">{t('common.error')}</p>

  return (
    <div className="container section stack">
      <div className="cols">
        <div className="cols__label">{t('framework.label')}</div>
        <div>
          <h1>{t('framework.title')}</h1>
          <p className="measure">{t('framework.intro')}</p>
        </div>
      </div>

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">{t('framework.foundationLabel')}</div>
        <div>
          <p className="measure">{t('framework.foundationIntro')}</p>
          <ul className="deflist">
            {data.foundation.map((f) => (
              <li key={f.id}><strong>{f.name}.</strong> {f.description}</li>
            ))}
          </ul>
        </div>
      </section>

      <hr className="rule" />

      <section className="cols">
        <div className="cols__label">{t('framework.pillarsLabel')}</div>
        <div><DriverIndex items={getPillars(data)} basePath="/pillars" ariaLabel={t('framework.pillarsLabel')} /></div>
      </section>

      <hr className="rule" />

      <section className="cols">
        <div className="cols__label">{t('framework.driversLabel')}</div>
        <div><DriverIndex items={getEnablers(data)} basePath="/enablers" ariaLabel={t('framework.driversLabel')} /></div>
      </section>
    </div>
  )
}
