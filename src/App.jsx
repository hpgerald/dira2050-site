import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
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
import DataPage from './routes/DataPage.jsx'
import About from './routes/About.jsx'
import DesignSystem from './routes/DesignSystem.jsx'
import Debug from './routes/Debug.jsx'
import NotFound from './routes/NotFound.jsx'

// PRO is lazy-loaded so its libraries (framer-motion, later d3) only download
// when a visitor enters /pro; the base site bundle stays light.
const ProApp = lazy(() => import('./pro/ProApp.jsx'))

// Phase 8: all content pages live. Full site.
export default function App() {
  return (
    <div className="app">
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/pillars" element={<PillarsIndex />} />
          <Route path="/pillars/:id" element={<PillarDetail />} />
          <Route path="/enablers/:id" element={<EnablerDetail />} />
          <Route path="/targets" element={<TargetsDashboard />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/what-it-means" element={<WhatItMeans />} />
          <Route path="/data" element={<DataPage />} />
          <Route path="/pro/*" element={<Suspense fallback={<div className="container section" />}><ProApp /></Suspense>} />
          <Route path="/about" element={<About />} />
          <Route path="/design" element={<DesignSystem />} />
          <Route path="/debug" element={<Debug />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
