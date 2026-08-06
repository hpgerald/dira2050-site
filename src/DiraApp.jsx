import { Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Home from './routes/Home.jsx'
import Vision from './routes/Vision.jsx'
import PillarsIndex from './routes/PillarsIndex.jsx'
import PillarDetail from './routes/PillarDetail.jsx'
import EnablerDetail from './routes/EnablerDetail.jsx'
import TargetsDashboard from './routes/TargetsDashboard.jsx'
import Timeline from './routes/Timeline.jsx'
import WhatItMeans from './routes/WhatItMeans.jsx'
import ForYouIntel from './routes/ForYouIntel.jsx'
import DataPage from './routes/DataPage.jsx'
import About from './routes/About.jsx'
import DesignSystem from './routes/DesignSystem.jsx'
import Debug from './routes/Debug.jsx'
import DiraQuiz from './routes/DiraQuiz.jsx'
import NotFound from './routes/NotFound.jsx'

/*
  The Dira 2050 site. Mounted by the platform router at /dira/*, so its routes
  are relative. It keeps its own Nav (with the bilingual toggle) and Footer.
*/
export default function DiraApp() {
  return (
    <div className="app">
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="vision" element={<Vision />} />
          <Route path="pillars" element={<PillarsIndex />} />
          <Route path="pillars/:id" element={<PillarDetail />} />
          <Route path="enablers/:id" element={<EnablerDetail />} />
          <Route path="targets" element={<TargetsDashboard />} />
          <Route path="timeline" element={<Timeline />} />
          <Route path="what-it-means" element={<WhatItMeans />} />
          <Route path="what-it-means/opportunities" element={<ForYouIntel block="opportunities" />} />
          <Route path="what-it-means/sector-outlook" element={<ForYouIntel block="sector-outlook" />} />
          <Route path="what-it-means/opportunity-map" element={<ForYouIntel block="opportunity-map" />} />
          <Route path="what-it-means/skills" element={<ForYouIntel block="skills" />} />
          <Route path="what-it-means/briefing" element={<ForYouIntel block="briefing" />} />
          <Route path="data" element={<DataPage />} />
          <Route path="quiz" element={<DiraQuiz />} />
          <Route path="pro/*" element={<Navigate to="/dira" replace />} />
          <Route path="about" element={<About />} />
          <Route path="design" element={<DesignSystem />} />
          <Route path="debug" element={<Debug />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
