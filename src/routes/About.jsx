import { Link } from 'react-router-dom'
import { usePageTitle } from '../usePageTitle.js'
import Reveal from '../components/Reveal.jsx'
import { useLang } from '../i18n.jsx'

/*
  Platform-level About. One uniform page for the whole platform, reached from the
  hub. Bilingual, with its own minimal header (back to hub + language toggle).
*/
export default function About() {
  const { lang, setLang, t } = useLang()
  usePageTitle(t('about.label'), t('about.lead'))

  return (
    <div className="app">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="hub__bar">
        <Link to="/" className="hub__brand">Dira 2050 <span className="hub__brand-sub">· Platform</span></Link>
        <div className="nav__right">
          <Link to="/" className="nav__hub">← {t('about.backHub')}</Link>
          <div className="langtoggle" role="group" aria-label={t('nav.langLabel')}>
            <button type="button" aria-pressed={lang === 'en'} className={`langtoggle__btn ${lang === 'en' ? 'is-active' : ''}`} onClick={() => setLang('en')}>EN</button>
            <button type="button" aria-pressed={lang === 'sw'} className={`langtoggle__btn ${lang === 'sw' ? 'is-active' : ''}`} onClick={() => setLang('sw')}>SW</button>
          </div>
        </div>
      </header>

      <main id="main" className="container section stack">
        <div className="cols">
          <div className="cols__label">{t('about.label')}</div>
          <div>
            <h1>{t('about.title')}</h1>
            <p className="lede measure">{t('about.lead')}</p>
          </div>
        </div>

        <hr className="rule rule--strong" />

        <Reveal as="section" className="cols">
          <div className="cols__label">{t('about.noteLabel')}</div>
          <div><p className="measure">{t('about.noteBody')}</p></div>
        </Reveal>

        <hr className="rule" />

        <Reveal as="section" className="cols">
          <div className="cols__label">{t('about.sourceLabel')}</div>
          <div><p className="measure">{t('about.sourceBody')}</p></div>
        </Reveal>

        <hr className="rule" />

        <Reveal as="section" className="cols">
          <div className="cols__label">{t('about.independentLabel')}</div>
          <div><p className="measure">{t('about.independentBody')}</p></div>
        </Reveal>

        <hr className="rule rule--strong" />

        <Reveal as="section" className="cols">
          <div className="cols__label">{t('about.founderLabel')}</div>
          <div className="stack">
            <p className="measure">{t('about.founderP1')}</p>
            <p className="measure">{t('about.founderP2')}</p>
            <p className="measure">{t('about.founderP3')}</p>
            <dl className="contact">
              <div><dt>Email</dt><dd><a href="mailto:hpgerald@gmail.com">hpgerald@gmail.com</a></dd></div>
              <div><dt>Phone</dt><dd><a href="tel:+255763453400">+255 763 453 400</a></dd></div>
              <div><dt>LinkedIn</dt><dd><a href="https://www.linkedin.com/in/gtesha/" target="_blank" rel="noopener noreferrer">linkedin.com/in/gtesha</a></dd></div>
            </dl>
          </div>
        </Reveal>
      </main>
    </div>
  )
}
