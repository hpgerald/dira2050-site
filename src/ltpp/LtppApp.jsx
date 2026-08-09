import { Routes, Route, Link } from 'react-router-dom'
import { usePageTitle } from '../usePageTitle.js'
import LtppNav from './LtppNav.jsx'
import LtppHome from './LtppHome.jsx'
import LtppRoadmap from './LtppRoadmap.jsx'
import LtppArchitecture from './LtppArchitecture.jsx'
import LtppFinancing from './LtppFinancing.jsx'
import LtppData from './LtppData.jsx'
import LtppQuiz from './LtppQuiz.jsx'

/*
  Long-Term Perspective Plan (LTPP 2050) section. English-only, mounted at
  /ltpp/*. Uses the main Dira site's design language, not the PRO system.
*/
function LtppHeader() {
  return (
    <header className="nav nav--section">
      <div className="nav__inner">
        <Link to="/ltpp" className="nav__brand">
          LTPP 2050 <span className="nav__brand-sub">Explained</span>
        </Link>
        <div className="nav__right">
          <Link to="/dira" className="nav__hub">Vision 2050</Link>
          <Link to="/fydp" className="nav__hub">FYDP IV</Link>
          <Link to="/" className="nav__hub">All plans</Link>
        </div>
      </div>
    </header>
  )
}

export default function LtppApp() {
  usePageTitle('Long-Term Perspective Plan 2050', 'LTPP 2050: the 25-year roadmap that turns Vision 2050 into sequenced, financed action.')
  return (
    <div className="app">
      <a className="skip-link" href="#main">Skip to content</a>
      <LtppHeader />
      <LtppNav />
      <main id="main">
        <Routes>
          <Route index element={<LtppHome />} />
          <Route path="roadmap" element={<LtppRoadmap />} />
          <Route path="architecture" element={<LtppArchitecture />} />
          <Route path="financing" element={<LtppFinancing />} />
          <Route path="data" element={<LtppData />} />
          <Route path="quiz" element={<LtppQuiz />} />
          <Route path="*" element={<LtppHome />} />
        </Routes>
      </main>
    </div>
  )
}
