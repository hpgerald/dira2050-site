import { Routes, Route, Link } from 'react-router-dom'
import { usePageTitle } from '../usePageTitle.js'
import FydpNav from './FydpNav.jsx'
import FydpHome from './FydpHome.jsx'
import FydpEconomy from './FydpEconomy.jsx'
import FydpSectors from './FydpSectors.jsx'
import FydpSector from './FydpSector.jsx'
import FydpFinancing from './FydpFinancing.jsx'
import FydpFinInstruments from './FydpFinInstruments.jsx'
import FydpFinPrivate from './FydpFinPrivate.jsx'
import FydpFinPublic from './FydpFinPublic.jsx'
import FydpFlagships from './FydpFlagships.jsx'
import FydpFlagship from './FydpFlagship.jsx'
import FydpRisks from './FydpRisks.jsx'
import FydpData from './FydpData.jsx'
import FydpQuiz from './FydpQuiz.jsx'

/*
  Fourth Five-Year Development Plan (FYDP IV) section. English-only, mounted at
  /fydp/*. Uses the main Dira site's design language, not the PRO system.
*/
function FydpHeader() {
  return (
    <header className="nav nav--section">
      <div className="nav__inner">
        <Link to="/fydp" className="nav__brand">
          FYDP IV <span className="nav__brand-sub">Explained</span>
        </Link>
        <div className="nav__right">
          <Link to="/dira" className="nav__hub">Vision 2050</Link>
          <Link to="/framework" className="nav__hub">Framework</Link>
          <Link to="/" className="nav__hub">All plans</Link>
        </div>
      </div>
    </header>
  )
}

export default function FydpApp() {
  usePageTitle('Fourth Five-Year Development Plan', 'FYDP IV 2026/27 to 2030/31: the first five years of Vision 2050.')
  return (
    <div className="app">
      <a className="skip-link" href="#main">Skip to content</a>
      <FydpHeader />
      <FydpNav />
      <main id="main">
        <Routes>
          <Route index element={<FydpHome />} />
          <Route path="economy" element={<FydpEconomy />} />
          <Route path="sectors" element={<FydpSectors />} />
          <Route path="sectors/:id" element={<FydpSector />} />
          <Route path="financing" element={<FydpFinancing />} />
          <Route path="financing/instruments" element={<FydpFinInstruments />} />
          <Route path="financing/private-capital" element={<FydpFinPrivate />} />
          <Route path="financing/public-corporations" element={<FydpFinPublic />} />
          <Route path="flagships" element={<FydpFlagships />} />
          <Route path="flagships/:id" element={<FydpFlagship />} />
          <Route path="risks" element={<FydpRisks />} />
          <Route path="data" element={<FydpData />} />
          <Route path="quiz" element={<FydpQuiz />} />
          <Route path="*" element={<FydpHome />} />
        </Routes>
      </main>
    </div>
  )
}
