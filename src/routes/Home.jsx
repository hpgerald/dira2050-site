import { Link } from 'react-router-dom'
import { useData } from '../useData.js'
import { getPillars, getEnablers } from '../lib/data.js'
import DriverIndex from '../components/Pentagram.jsx'
import StatCard from '../components/StatCard.jsx'
import { usePageTitle } from '../usePageTitle.js'
import { useLang } from '../i18n.jsx'

// Pick specific headline targets by id (the three biggest national numbers).
function headline(data) {
  const byId = Object.fromEntries(data.targets.map((t) => [t.id, t]))
  return ['t1', 't2', 't4'].map((id) => byId[id]).filter(Boolean)
}

export default function Home() {
  const { t } = useLang()
  usePageTitle(null, t('home.lead'))
  const { data, loading, error } = useData()

  return (
    <>
      <section className="hero">
        <div className="container">
          <span className="eyebrow">{t('home.eyebrow')}</span>
          <h1 className="hero__title">{t('home.titleA')}<br />{t('home.titleB')}</h1>
          <p className="hero__lead">{t('home.lead')}</p>
          <ul className="hero__facts">
            {t('home.facts').map((f) => <li key={f} className="hero__fact">{f}</li>)}
          </ul>
          <p className="hero__leadsub">{t('home.leadSub')}</p>
          <p className="hero__cta">
            <Link className="btn" to="/dira/vision">{t('home.ctaStart')}</Link>
            <Link className="btn btn--ghost" to="/dira/targets">{t('home.ctaTargets')}</Link>
          </p>
        </div>
      </section>

      <hr className="rule rule--strong" />

      {loading && <p className="container section">{t('common.loading')}</p>}
      {error && <p className="container section" role="alert">{t('common.error')}</p>}

      {!loading && !error && (
        <>
          <section className="container section cols">
            <div className="cols__label">{t('home.goalLabel')}</div>
            <div className="grid-stats">
              {headline(data).map((tg) => (
                <StatCard key={tg.id} value={tg.target_value ?? '–'} unit={tg.unit} label={tg.indicator}
                  baseline={tg.baseline_value} baselineYear={tg.baseline_year} targetYear={tg.target_year} />
              ))}
            </div>
          </section>

          <hr className="rule" />

          <section className="container section cols">
            <div className="cols__label">{t('home.pillarsLabel')}</div>
            <div>
              <p className="measure">{t('home.pillarsIntro')}</p>
              <DriverIndex items={getPillars(data)} basePath="/dira/pillars" ariaLabel={t('home.pillarsLabel')} />
            </div>
          </section>

          <hr className="rule" />

          <section className="container section cols">
            <div className="cols__label">{t('home.driversLabel')}</div>
            <div>
              <p className="measure">{t('home.driversIntro')}</p>
              <DriverIndex items={getEnablers(data)} basePath="/dira/enablers" ariaLabel={t('home.driversLabel')} />
            </div>
          </section>

          <hr className="rule rule--strong" />

          <section className="container section">
            <div className="closing">
              <h2>{t('home.closingH2')}</h2>
              <p className="measure">{t('home.closingP')}</p>
              <p><Link className="btn" to="/dira/what-it-means">{t('home.closingCta')}</Link></p>
            </div>
          </section>
        </>
      )}
    </>
  )
}
