import { useEffect, useRef } from 'react'

/*
  A thin reading-progress bar fixed to the top of the page, tracking how far the
  document is scrolled. Updates via rAF-throttled scroll (Lenis dispatches it).
  Purely decorative, so it is hidden from assistive tech and does nothing under
  reduced motion beyond jumping to the current position.
*/
export default function ScrollProgress() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    let ticking = false
    const update = () => {
      ticking = false
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      const pct = max > 0 ? (h.scrollTop || window.scrollY) / max : 0
      el.style.transform = `scaleX(${Math.min(1, Math.max(0, pct)).toFixed(4)})`
    }
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update) } }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return <div className="scrollprog" aria-hidden="true"><div ref={ref} className="scrollprog__bar" /></div>
}
