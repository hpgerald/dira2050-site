import { useRef, useEffect } from 'react'

/*
  Scroll-driven parallax. Translates the element on the Y axis as it moves
  through the viewport, for depth on the cinematic set-pieces. Uses the native
  scroll event (Lenis dispatches it) throttled with requestAnimationFrame, and
  disables itself under prefers-reduced-motion. speed > 0 moves slower than the
  page (recedes); negative moves faster (leads).
*/
export default function Parallax({ as: As = 'div', speed = 0.12, className = '', style, children, ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return undefined

    let ticking = false
    const update = () => {
      ticking = false
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      // -1 (below) .. 0 (centered) .. 1 (above)
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh
      const shift = -progress * speed * 100
      el.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`
    }
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update) } }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [speed])

  return (
    <As ref={ref} className={`parallax ${className}`.trim()} style={{ willChange: 'transform', ...style }} {...rest}>
      {children}
    </As>
  )
}
