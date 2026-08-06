import { Routes, Route, Link } from 'react-router-dom'
import { usePageTitle } from '../usePageTitle.js'
import FrameworkNav from './FrameworkNav.jsx'
import FrameworkHome from './FrameworkHome.jsx'
import FrameworkCycle from './FrameworkCycle.jsx'
import FrameworkPriorityAreas from './FrameworkPriorityAreas.jsx'
import FrameworkSystem from './FrameworkSystem.jsx'
import FrameworkQuiz from './FrameworkQuiz.jsx'

/*
  National Delivery Framework section. English-only, mounted at /framework/*.
  Uses the main Dira site's design language (base components.css).
*/
function FrameworkHeader() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <Link to="/framework" className="nav__brand">
          National Delivery Framework <span className="nav__brand-sub">Explained</span>
        </Link>
        <div className="nav__right">
          <Link to="/dira" className="nav__hub">Vision 2050</Link>
          <Link to="/" className="nav__hub">All plans</Link>
        </div>
      </div>
    </header>
  )
}

export default function FrameworkApp() {
  usePageTitle('National Delivery Framework', 'How Tanzania delivers and tracks its development plans.')
  return (
    <div className="app">
      <a className="skip-link" href="#main">Skip to content</a>
      <FrameworkHeader />
      <FrameworkNav />
      <main id="main">
        <Routes>
          <Route index element={<FrameworkHome />} />
          <Route path="cycle" element={<FrameworkCycle />} />
          <Route path="priority-areas" element={<FrameworkPriorityAreas />} />
          <Route path="system" element={<FrameworkSystem />} />
          <Route path="quiz" element={<FrameworkQuiz />} />
          <Route path="*" element={<FrameworkHome />} />
        </Routes>
      </main>
    </div>
  )
}
