import { useRef, useEffect, useState } from 'react'

/*
  Lightweight scroll-reveal for the base (non-PRO) design. No framer-motion:
  just an IntersectionObserver that adds `.is-in` when the element enters view,
  with the animation done in CSS (see .reveal in components.css). Honours the
  user's "reduce motion" setting by showing content immediately.

  Usage: <Reveal as="li" className="goal" delay={i * 60}> ... </Reveal>
*/
export default function Reveal({ as: As = 'div', className = '', delay = 0, style, children, ...rest }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) { setInView(true); return undefined }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setInView(true); io.disconnect() } })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <As
      ref={ref}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`.trim()}
      style={{ ...(delay ? { transitionDelay: `${delay}ms` } : null), ...style }}
      {...rest}
    >
      {children}
    </As>
  )
}
