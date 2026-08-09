import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import DiraApp from './DiraApp.jsx'
import Hub from './routes/Hub.jsx'
import About from './routes/About.jsx'
import ComingSoon from './routes/ComingSoon.jsx'

// Document sections are lazy-loaded so each downloads only when visited.
const FrameworkApp = lazy(() => import('./framework/FrameworkApp.jsx'))
const FydpApp = lazy(() => import('./fydp/FydpApp.jsx'))
const LtppApp = lazy(() => import('./ltpp/LtppApp.jsx'))

/*
  Platform router. The landing page (Hub) owns "/". Each document lives under its
  own namespace; Dira 2050 is the only one built so far, the rest show a
  coming-soon placeholder. Old pre-platform Dira URLs (e.g. /vision) redirect to
  their new /dira home so existing links and bookmarks keep working.
*/

// Old top-level Dira paths that must forward to /dira/...
const LEGACY = [
  '/vision', '/pillars', '/pillars/:id', '/enablers/:id', '/targets',
  '/timeline', '/what-it-means', '/data', '/design', '/debug', '/pro/*',
]

function LegacyRedirect() {
  const loc = useLocation()
  return <Navigate to={`/dira${loc.pathname}${loc.search}`} replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Hub />} />
      <Route path="/about" element={<About />} />
      <Route path="/dira/*" element={<DiraApp />} />
      <Route path="/framework/*" element={<Suspense fallback={<div className="container section" />}><FrameworkApp /></Suspense>} />
      <Route path="/fydp/*" element={<Suspense fallback={<div className="container section" />}><FydpApp /></Suspense>} />
      <Route path="/ltpp/*" element={<Suspense fallback={<div className="container section" />}><LtppApp /></Suspense>} />
      <Route path="/comms/*" element={<ComingSoon docKey="comms" />} />
      {LEGACY.map((p) => <Route key={p} path={p} element={<LegacyRedirect />} />)}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
