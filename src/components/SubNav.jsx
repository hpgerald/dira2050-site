import { useState } from 'react'
import { NavLink } from 'react-router-dom'

/*
  Shared section sub-navigation (Framework / FYDP / LTPP). On desktop it is a row
  of links; on mobile it collapses into a hamburger dropdown (no horizontal
  scrolling). `links` is [to, label, end?]; `quiz` is an optional [to, label].
*/
export default function SubNav({ label, links, quiz }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <nav className="subnav" aria-label={label}>
      <div className="container subnav__inner">
        <button type="button" className="subnav__toggle" aria-expanded={open} aria-controls="subnav-links"
          onClick={() => setOpen((v) => !v)}>
          <span className="subnav__toggle-txt">Menu</span>
          <span className="subnav__toggle-ic" aria-hidden="true"><span /><span /><span /></span>
        </button>
        <div id="subnav-links" className={`subnav__links ${open ? 'is-open' : ''}`}>
          {links.map(([to, text, end]) => (
            <NavLink key={to} to={to} end={end} onClick={close}
              className={({ isActive }) => `subnav__link ${isActive ? 'is-active' : ''}`}>
              {text}
            </NavLink>
          ))}
          {quiz && (
            <NavLink to={quiz[0]} onClick={close}
              className={({ isActive }) => `subnav__link subnav__link--quiz ${isActive ? 'is-active' : ''}`}>
              {quiz[1]}
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  )
}
