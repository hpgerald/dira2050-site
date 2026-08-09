import { Routes, Route, Link } from 'react-router-dom'
import { usePageTitle } from '../usePageTitle.js'
import CommsNav from './CommsNav.jsx'
import CommsHome from './CommsHome.jsx'
import CommsFramework from './CommsFramework.jsx'
import CommsMessages from './CommsMessages.jsx'
import CommsChannels from './CommsChannels.jsx'
import CommsData from './CommsData.jsx'
import CommsQuiz from './CommsQuiz.jsx'

/*
  Dira 2050 Communication Strategy section. English-only, mounted at /comms/*.
  Uses the main Dira site's design language, not the PRO system.
*/
function CommsHeader() {
  return (
    <header className="nav nav--section">
      <div className="nav__inner">
        <Link to="/comms" className="nav__brand">
          Communication Strategy <span className="nav__brand-sub">Explained</span>
        </Link>
        <div className="nav__right">
          <Link to="/dira" className="nav__hub">Vision 2050</Link>
          <Link to="/" className="nav__hub">All plans</Link>
        </div>
      </div>
    </header>
  )
}

export default function CommsApp() {
  usePageTitle('Dira 2050 Communication Strategy', 'How the Vision reaches every citizen: the strategy to build an informed, engaged and participatory nation.')
  return (
    <div className="app">
      <a className="skip-link" href="#main">Skip to content</a>
      <CommsHeader />
      <CommsNav />
      <main id="main">
        <Routes>
          <Route index element={<CommsHome />} />
          <Route path="framework" element={<CommsFramework />} />
          <Route path="messages" element={<CommsMessages />} />
          <Route path="channels" element={<CommsChannels />} />
          <Route path="data" element={<CommsData />} />
          <Route path="quiz" element={<CommsQuiz />} />
          <Route path="*" element={<CommsHome />} />
        </Routes>
      </main>
    </div>
  )
}
