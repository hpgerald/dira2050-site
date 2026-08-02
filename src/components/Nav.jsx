import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useLang } from '../i18n.jsx'

export default function Nav() {
  const { lang, setLang, t } = useLang()
  const [open, setOpen] = useState(false)

  const LINKS = [
    ['/vision', t('nav.vision')],
    ['/pillars', t('nav.pillars')],
    ['/targets', t('nav.targets')],
    ['/timeline', t('nav.timeline')],
    ['/what-it-means', t('nav.forYou')],
    ['/data', t('nav.data')],
  ]

  return (
    <header className="nav">
      <div className="nav__inner">
        <Link to="/" className="nav__brand" onClick={() => setOpen(false)}>
          {t('nav.brand')} <span className="nav__brand-sub">{t('nav.brandSub')}</span>
        </Link>

        <nav className={`nav__links ${open ? 'is-open' : ''}`} aria-label="Primary">
          {LINKS.map(([to, label]) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="nav__right">
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
