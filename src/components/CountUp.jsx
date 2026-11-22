import { useEffect, useRef, useState } from 'react'

/*
  Counts a number up from zero to its value when it first scrolls into view.
  Formats with thousands separators and preserves decimals. Falls straight to
  the final value under prefers-reduced-motion. Non-numeric values render as-is.
*/
function fmt(n, decimals) {
  return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

export default function CountUp({ value, className, duration = 1100 }) {
  const target = typeof value === 'number' ? value : Number(value)
  const numeric = value !== '' && value !== null && value !== undefined && !Number.isNaN(target)
  const decimals = numeric && String(value).includes('.') ? (String(value).split('.')[1] || '').length : 0
  const [n, setN] = useState(numeric ? 0 : null)
  const ref = useRef(null)
  const done = useRef(false)

  useEffect(() => {
    if (!numeric) return
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setN(target); return }
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting && !done.current) {
          done.current = true
          let raf, start
          const ease = (x) => 1 - Math.pow(1 - x, 3)
          const step = (ts) => {
            if (start === undefined) start = ts
            const k = Math.min(1, (ts - start) / duration)
            setN(target * ease(k))
            if (k < 1) raf = requestAnimationFrame(step)
          }
          raf = requestAnimationFrame(step)
          io.disconnect()
        }
      })
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [numeric, target, duration])

  if (!numeric) return <span ref={ref} className={className}>{value}</span>
  return <span ref={ref} className={className}>{fmt(n, decimals)}</span>
}
