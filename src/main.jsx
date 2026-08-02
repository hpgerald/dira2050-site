import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, useLocation } from 'react-router-dom'
import App from './App.jsx'
import { LanguageProvider } from './i18n.jsx'
import './design/tokens.css'
import './design/components.css'

// Real, crawlable URLs (good for SEO). GitHub Pages has no server rewrites, so a
// 404.html redirect (see public/404.html) restores deep links on hard refresh.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <LanguageProvider>
        <ScrollToTop />
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
