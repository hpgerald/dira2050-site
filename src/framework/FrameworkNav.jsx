import { NavLink } from 'react-router-dom'

const LINKS = [
  ['/framework', 'Overview', true],
  ['/framework/cycle', 'Delivery cycle', false],
  ['/framework/priority-areas', 'Priority areas', false],
  ['/framework/system', 'Delivery system', false],
]

export default function FrameworkNav() {
  return (
    <nav className="subnav" aria-label="Framework sections">
      <div className="container subnav__inner">
        {LINKS.map(([to, label, end]) => (
          <NavLink key={to} to={to} end={end}
            className={({ isActive }) => `subnav__link ${isActive ? 'is-active' : ''}`}>
            {label}
          </NavLink>
        ))}
        <NavLink to="/framework/quiz"
          className={({ isActive }) => `subnav__link subnav__link--quiz ${isActive ? 'is-active' : ''}`}>
          Knowledge check
        </NavLink>
      </div>
    </nav>
  )
}
