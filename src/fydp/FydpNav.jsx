import { NavLink } from 'react-router-dom'

const LINKS = [
  ['/fydp', 'Overview', true],
  ['/fydp/economy', 'Economy', false],
  ['/fydp/sectors', 'Pathways', false],
  ['/fydp/financing', 'Financing', false],
  ['/fydp/flagships', 'Flagships', false],
  ['/fydp/risks', 'Risks', false],
]

export default function FydpNav() {
  return (
    <nav className="subnav" aria-label="FYDP IV sections">
      <div className="container subnav__inner">
        {LINKS.map(([to, label, end]) => (
          <NavLink key={to} to={to} end={end}
            className={({ isActive }) => `subnav__link ${isActive ? 'is-active' : ''}`}>
            {label}
          </NavLink>
        ))}
        <NavLink to="/fydp/quiz"
          className={({ isActive }) => `subnav__link subnav__link--quiz ${isActive ? 'is-active' : ''}`}>
          Knowledge check
        </NavLink>
      </div>
    </nav>
  )
}
