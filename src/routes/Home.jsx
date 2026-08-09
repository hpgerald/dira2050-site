import { Link } from 'react-router-dom'
import { useData } from '../useData.js'
import { getPillars, getEnablers } from '../lib/data.js'
import DriverIndex from '../components/Pentagram.jsx'
import StatCard from '../components/StatCard.jsx'
import Reveal from '../components/Reveal.jsx'
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
          <Reveal as="span" className="eyebrow">{t('home.eyebrow')}</Reveal>
          <Reveal as="h1" className="hero__title" delay={80}>{t('home.titleA')}<br />{t('home.titleB')}</Reveal>
          <Reveal as="p" className="hero__lead" delay={160}>{t('home.lead')}</Reveal>
          <Reveal as="ul" className="hero__facts" delay={220}>
            {t('home.facts').map((f) => <li key={f} className="hero__fact">{f}</li>)}
          </Reveal>
          <Reveal as="p" className="hero__leadsub" delay={280}>{t('home.leadSub')}</Reveal>
          <Reveal as="p" className="hero__cta" delay={340}>
            <Link className="btn" to="/dira/vision">{t('home.ctaStart')}</Link>
            <Link className="btn btn--ghost" to="/dira/targets">{t('home.ctaTargets')}</Link>
          </Reveal>
        </div>
      </section>

      <hr className="rule rule--strong" />

      {loading && <p className="container section">{t('common.loading')}</p>}
      {error && <p className="container section" role="alert">{t('common.error')}</p>}

      {!loading && !error && (
        <>
          <Reveal as="section" className="container section cols">
            <div className="cols__label">{t('home.goalLabel')}</div>
            <div className="grid-stats">
              {headline(data).map((tg) => (
                <StatCard key={tg.id} value={tg.target_value ?? '–'} unit={tg.unit} label={tg.indicator}
                  baseline={tg.baseline_value} baselineYear={tg.baseline_year} targetYear={tg.target_year} />
              ))}
            </div>
          </Reveal>

          <hr className="rule" />

          <Reveal as="section" className="container section cols">
            <div className="cols__label">{t('home.pillarsLabel')}</div>
            <div>
              <p className="measure">{t('home.pillarsIntro')}</p>
              <DriverIndex items={getPillars(data)} basePath="/dira/pillars" ariaLabel={t('home.pillarsLabel')} />
            </div>
          </Reveal>

          <hr className="rule" />

          <Reveal as="section" className="container section cols">
            <div className="cols__label">{t('home.driversLabel')}</div>
            <div>
              <p className="measure">{t('home.driversIntro')}</p>
              <DriverIndex items={getEnablers(data)} basePath="/dira/enablers" ariaLabel={t('home.driversLabel')} />
            </div>
          </Reveal>

          <hr className="rule rule--strong" />

          <Reveal as="section" className="container section">
            <div className="closing">
              <h2>{t('home.closingH2')}</h2>
              <p className="measure">{t('home.closingP')}</p>
              <p><Link className="btn" to="/dira/what-it-means">{t('home.closingCta')}</Link></p>
            </div>
          </Reveal>
        </>
      )}
    </>
  )
}
