import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, useLocation } from 'react-router-dom'
import App from './App.jsx'
import './design/tokens.css'
import './design/components.css'

// Scroll to top on every route change.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

// HashRouter keeps deep links working on any static host (GitHub Pages etc.)
// without server-side rewrite rules.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <ScrollToTop />
      <App />
    </HashRouter>
  </React.StrictMode>,
)
