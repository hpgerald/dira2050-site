import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useLang } from '../i18n.jsx'

export default function Nav() {
  const { lang, setLang, t } = useLang()
  const [open, setOpen] = useState(false)

  const LINKS = [
    ['/dira/vision', t('nav.vision')],
    ['/dira/pillars', t('nav.pillars')],
    ['/dira/targets', t('nav.targets')],
    ['/dira/timeline', t('nav.timeline')],
    ['/dira/what-it-means', t('nav.forYou')],
    ['/dira/data', t('nav.data')],
    ['/dira/quiz', t('nav.quiz'), 'quiz'],
  ]

  return (
    <header className="nav">
      <div className="nav__inner">
        <Link to="/dira" className="nav__brand" onClick={() => setOpen(false)}>
          {t('nav.brand')} <span className="nav__brand-sub">{t('nav.brandSub')}</span>
        </Link>

        <nav className={`nav__links ${open ? 'is-open' : ''}`} aria-label="Primary">
          {LINKS.map(([to, label, mod]) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)}
              className={({ isActive }) => [isActive ? 'is-active' : '', mod ? `nav__link--${mod}` : ''].filter(Boolean).join(' ') || undefined}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="nav__right">
          <Link to="/" className="nav__hub" onClick={() => setOpen(false)}>{t('nav.hub')}</Link>
          <div className="langtoggle" role="group" aria-label={t('nav.langLabel')}>
            <button type="button" aria-pressed={lang === 'en'}
              className={`langtoggle__btn ${lang === 'en' ? 'is-active' : ''}`} onClick={() => setLang('en')}>EN</button>
            <button type="button" aria-pressed={lang === 'sw'}
              className={`langtoggle__btn ${lang === 'sw' ? 'is-active' : ''}`} onClick={() => setLang('sw')}>SW</button>
          </div>
          <button className="nav__toggle" aria-expanded={open} aria-label={t('nav.menu')} onClick={() => setOpen((v) => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  )
}
