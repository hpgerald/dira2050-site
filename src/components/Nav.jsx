import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const LINKS = [
  ['/vision', 'Vision'],
  ['/pillars', 'Pillars'],
  ['/targets', 'Targets'],
  ['/timeline', 'Timeline'],
  ['/what-it-means', 'For You'],
  ['/data', 'Data'],
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="nav">
      <div className="nav__inner">
        <Link to="/" className="nav__brand" onClick={() => setOpen(false)}>
          Dira&nbsp;2050 <span className="nav__brand-sub">Explained</span>
        </Link>
        <button className="nav__toggle" aria-expanded={open} aria-label="Menu" onClick={() => setOpen((v) => !v)}>
          <span /><span /><span />
        </button>
        <nav className={`nav__links ${open ? 'is-open' : ''}`} aria-label="Primary">
          {LINKS.map(([to, label]) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
