import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useLang } from '../../i18n.jsx'

// Sub-navigation within the PRO section. Grows as modules are added.
export default function ProNav() {
  const { t } = useLang()
  const ref = useRef(null)

  // The global site nav (.nav) is sticky at top:0. This sub-nav is also sticky,
  // so it must dock *below* the site nav rather than on top of it. Measure the
  // site nav's real height (varies by breakpoint / wrapping) and expose it as a
  // CSS variable the stylesheet uses for `top`. Re-measure on resize.
  useEffect(() => {
    const siteNav = document.querySelector('.nav')
    const el = ref.current
    if (!el) return
    const apply = () => {
      const h = siteNav ? Math.round(siteNav.getBoundingClientRect().height) : 0
      el.style.setProperty('--pro-nav-offset', `${h}px`)
    }
    apply()
    const ro = siteNav && 'ResizeObserver' in window ? new ResizeObserver(apply) : null
    if (ro && siteNav) ro.observe(siteNav)
    window.addEventListener('resize', apply)
    return () => {
      window.removeEventListener('resize', apply)
      if (ro) ro.disconnect()
    }
  }, [])

  const links = [
    ['/pro', t('pro.subnav.story'), true],
    ['/pro/explore', t('pro.subnav.explore'), false],
    ['/pro/graph', t('pro.subnav.graph'), false],
    ['/pro/opportunities', t('pro.subnav.opps'), false],
    ['/pro/skills', t('pro.subnav.skills'), false],
    ['/pro/for', t('pro.subnav.audiences'), false],
    ['/pro/regions', t('pro.subnav.regions'), false],
    ['/pro/sectors', t('pro.subnav.sectors'), false],
    ['/pro/charts', t('pro.subnav.charts'), false],
    ['/pro/evidence', t('pro.subnav.evidence'), false],
    ['/pro/ask', t('pro.subnav.ask'), false],
    ['/pro/progress', t('pro.subnav.progress'), false],
  ]
  return (
    <nav className="pro-subnav" aria-label="PRO" ref={ref}>
      <div className="pro__wrap pro-subnav__inner">
        {links.map(([to, label, end]) => (
          <NavLink key={to} to={to} end={end}
            className={({ isActive }) => `pro-subnav__link ${isActive ? 'is-active' : ''}`}>
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
