import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import App from './App.jsx'
import { LanguageProvider } from './i18n.jsx'
import './design/tokens.css'
import './design/components.css'

// Real, crawlable URLs (good for SEO). GitHub Pages has no server rewrites, so a
// 404.html redirect (see public/404.html) restores deep links on hard refresh.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

const prefersReduced = () =>
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// A module-level handle so ScrollToTop can jump instantly on route change
// while Lenis still drives smooth wheel/scroll within a page.
let lenis = null

function SmoothScroll() {
  useEffect(() => {
    if (prefersReduced()) return
    lenis = new Lenis({ duration: 1.05, lerp: 0.1, smoothWheel: true })
    let raf
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy(); lenis = null }
  }, [])
  return null
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// Cinematic but quiet route transition: fade+lift the page on each navigation.
function RouteTransition({ children }) {
  const { pathname } = useLocation()
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduced()) return
    el.classList.remove('route-in')
    // force reflow so the animation restarts
    void el.offsetWidth
    el.classList.add('route-in')
  }, [pathname])
  return <div ref={ref} className="route-in">{children}</div>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <LanguageProvider>
        <SmoothScroll />
        <ScrollToTop />
        <RouteTransition>
          <App />
        </RouteTransition>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
