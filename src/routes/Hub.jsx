import { Link } from 'react-router-dom'
import { useLang } from '../i18n.jsx'
import { usePageTitle } from '../usePageTitle.js'

/*
  Platform landing page. Four planning documents form the spine (vision → 25-year
  path → first five years → delivery), with the Communication Strategy as a
  companion. Only Dira 2050 is live today; the rest link to a coming-soon page.
  Bilingual, like the Dira site, with its own compact language toggle.
*/
const PLANS = [
  { key: 'dira', to: '/dira', live: true },
  { key: 'ltpp', to: '/ltpp', live: false },
  { key: 'fydp', to: '/fydp', live: true },
  { key: 'framework', to: '/framework', live: true },
]
const COMPANION = { key: 'comms', to: '/comms', live: false }

function HubCard({ c, t }) {
  return (
    <Link to={c.to} className={`hub-card ${c.live ? 'is-live' : 'is-soon'}`}>
      <span className={`hub-card__status ${c.live ? 'is-live' : ''}`}>{c.live ? t('hub.live') : t('hub.soon')}</span>
      <h2 className="hub-card__title">{t(`hub.cards.${c.key}.title`)}</h2>
      <p className="hub-card__tag">{t(`hub.cards.${c.key}.tag`)}</p>
      {c.live && <span className="hub-card__cta">{t('hub.open')} →</span>}
    </Link>
  )
}

export default function Hub() {
  const { lang, setLang, t } = useLang()
  usePageTitle(t('hub.title'), t('hub.lead'))

  return (
    <div className="hub">
      <header className="hub__bar">
        <span className="hub__brand">Dira 2050 <span className="hub__brand-sub">· Platform</span></span>
        <div className="langtoggle" role="group" aria-label={t('nav.langLabel')}>
          <button type="button" aria-pressed={lang === 'en'} className={`langtoggle__btn ${lang === 'en' ? 'is-active' : ''}`} onClick={() => setLang('en')}>EN</button>
          <button type="button" aria-pressed={lang === 'sw'} className={`langtoggle__btn ${lang === 'sw' ? 'is-active' : ''}`} onClick={() => setLang('sw')}>SW</button>
        </div>
      </header>

      <div className="container hub__hero">
        <p className="hub__eyebrow">{t('hub.eyebrow')}</p>
        <h1 className="hub__title">{t('hub.title')}</h1>
        <p className="hub__lead">{t('hub.lead')}</p>
      </div>

      <div className="container hub__grid">
        {PLANS.map((c) => <HubCard key={c.key} c={c} t={t} />)}
      </div>

      <div className="container hub__companion">
        <p className="hub__companion-label">{t('hub.companionLabel')}</p>
        <HubCard c={COMPANION} t={t} />
        <p className="hub__companion-note">{t('hub.companionNote')}</p>
      </div>
    </div>
  )
}
