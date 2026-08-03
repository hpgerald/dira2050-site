import { useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

// ScrollProgress - a thin flag-green bar tracking page scroll (cinematic cue).
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return <motion.div className="pro-progress" style={{ scaleX }} aria-hidden="true" />
}

// Statement - a full-bleed, oversized editorial statement (the vision line).
export function Statement({ children, cite }) {
  return (
    <section className="pro-statement">
      <div className="pro__wrap">
        <motion.p className="pro-statement__text"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease: [0.16, 0.84, 0.44, 1] }}>
          {children}
        </motion.p>
        {cite && <p className="pro-statement__cite">{cite}</p>}
      </div>
    </section>
  )
}

/*
  PRO primitive library (Phase 1). Reusable, bilingual-agnostic (text passed in),
  accessible building blocks for every PRO story. Motion via framer-motion,
  reveal-on-scroll respects prefers-reduced-motion automatically.
*/

// Reveal - fades/rises content in as it scrolls into view.
export function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={`pro-reveal ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 0.84, 0.44, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ProSection - a full-width band with optional variant (alt / night).
// `h1` renders the title as the page's <h1> (one per page, for accessibility).
export function ProSection({ eyebrow, title, lead, variant, children, id, h1 }) {
  const Title = h1 ? 'h1' : 'h2'
  return (
    <section id={id} className={`pro-section ${variant ? `pro-section--${variant}` : ''}`}>
      <div className="pro__wrap">
        {(eyebrow || title || lead) && (
          <Reveal>
            {eyebrow && <p className="pro-section__eyebrow">{eyebrow}</p>}
            {title && <Title className="pro-section__title">{title}</Title>}
            {lead && <p className="pro-section__lead">{lead}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}

// BigStat - an oversized figure with label. `accentValue` renders in accent.
export function BigStat({ value, unit, label, sub }) {
  return (
    <div className="pro-stat">
      <div className="pro-stat__num"><em>{value}</em>{unit && <span className="pro-stat__unit">{unit}</span>}</div>
      <p className="pro-stat__label">{label}</p>
      {sub && <p className="pro-stat__sub">{sub}</p>}
    </div>
  )
}

// ProCard - clickable content card with an accent rule.
export function ProCard({ title, body, accent, footer, as: As = 'div', ...rest }) {
  return (
    <As className={`pro-card ${rest.href || rest.to || rest.onClick ? 'pro-card--link' : ''}`} {...rest}>
      <div className="pro-card__accent" style={accent ? { background: accent } : undefined} />
      <h3 className="pro-card__title">{title}</h3>
      {body && <p className="pro-card__body">{body}</p>}
      {footer && <div className="pro-card__foot">{footer}</div>}
    </As>
  )
}

// Quote - a large editorial pull-quote.
export function Quote({ children, cite }) {
  return (
    <blockquote className="pro-quote">
      <p className="pro-quote__text">{children}</p>
      {cite && <cite className="pro-quote__cite">{cite}</cite>}
    </blockquote>
  )
}

// Comparison - before → after, side by side.
export function Comparison({ label, nowLabel, nowValue, goalLabel, goalValue }) {
  return (
    <figure className="pro-compare" aria-label={label}>
      <div className="pro-compare__side">
        <p className="pro-compare__k">{nowLabel}</p>
        <p className="pro-compare__v">{nowValue}</p>
      </div>
      <div className="pro-compare__arrow" aria-hidden="true">→</div>
      <div className="pro-compare__side pro-compare__side--goal">
        <p className="pro-compare__k">{goalLabel}</p>
        <p className="pro-compare__v">{goalValue}</p>
      </div>
    </figure>
  )
}

// Leap - an animated before→after magnitude bar. Both values are drawn on one
// shared scale so the size of the change is visible at a glance; the bars grow
// on scroll-in. Direction-aware: growth shows a multiple (×5.5), a decline shows
// the percentage cut (−100%). now/then are raw numbers; labels are passed in.
export function Leap({ label, unit, nowLabel, thenLabel, now, then, growthWord, cutWord }) {
  const a = Number(now), b = Number(then)
  const max = Math.max(a, b, 1)
  const grew = b >= a
  const grow = { duration: 1, ease: [0.16, 0.84, 0.44, 1] }
  let badge, caption
  if (grew) {
    const f = a > 0 ? b / a : null
    badge = f == null ? '–' : (f >= 10 ? `${Math.round(f)}×` : `${f.toFixed(1)}×`)
    caption = growthWord
  } else {
    const drop = a > 0 ? Math.round(((a - b) / a) * 100) : 0
    badge = `−${drop}%`
    caption = cutWord
  }
  const fmtN = (v) => Number(v).toLocaleString('en-US')
  return (
    <div className="pro-leap">
      <p className="pro-leap__head">
        <span className="pro-leap__label">{label}</span>
        {unit && <span className="pro-leap__unit"> · {unit}</span>}
      </p>
      <div className="pro-leap__body">
        <div className="pro-leap__bars">
          <div className="pro-leap__row">
            <span className="pro-leap__k">{nowLabel}</span>
            <span className="pro-leap__track">
              <motion.span className="pro-leap__fill pro-leap__fill--now"
                initial={{ width: 0 }} whileInView={{ width: `${(a / max) * 100}%` }}
                viewport={{ once: true, margin: '-40px' }} transition={grow} />
            </span>
            <span className="pro-leap__v">{fmtN(a)}</span>
          </div>
          <div className="pro-leap__row">
            <span className="pro-leap__k">{thenLabel}</span>
            <span className="pro-leap__track">
              <motion.span className="pro-leap__fill pro-leap__fill--then"
                initial={{ width: 0 }} whileInView={{ width: `${(b / max) * 100}%` }}
                viewport={{ once: true, margin: '-40px' }} transition={{ ...grow, delay: 0.12 }} />
            </span>
            <span className="pro-leap__v">{fmtN(b)}</span>
          </div>
        </div>
        <div className="pro-leap__badge" aria-hidden="true">
          <span className={`pro-leap__factor ${grew ? '' : 'pro-leap__factor--cut'}`}>{badge}</span>
          <span className="pro-leap__caption">{caption}</span>
        </div>
      </div>
    </div>
  )
}

// Callout - highlighted note.
export function Callout({ title, children }) {
  return (
    <aside className="pro-callout">
      <span className="pro-callout__mark" aria-hidden="true" />
      <div>
        {title && <p className="pro-callout__title">{title}</p>}
        <p className="pro-callout__body">{children}</p>
      </div>
    </aside>
  )
}

// InfoPanel - a labelled key/value list. `rows` = [[key, value], ...].
export function InfoPanel({ rows = [] }) {
  return (
    <div className="pro-panel">
      {rows.map(([k, v], i) => (
        <div key={i} className="pro-panel__row">
          <span className="pro-panel__k">{k}</span>
          <span>{v}</span>
        </div>
      ))}
    </div>
  )
}

// Expandable - accessible progressive-disclosure block.
export function Expandable({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="pro-exp">
      <button className="pro-exp__btn" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span>{title}</span>
        <span className="pro-exp__sign" aria-hidden="true">+</span>
      </button>
      {open && <div className="pro-exp__body">{children}</div>}
    </div>
  )
}

// ProTimeline - vertical milestone list. `items` = [{ year, title, desc }].
export function ProTimeline({ items = [] }) {
  return (
    <ol className="pro-timeline">
      {items.map((it, i) => (
        <li key={i} className="pro-tl">
          <div className="pro-tl__year">{it.year}</div>
          <p className="pro-tl__title">{it.title}</p>
          <p className="pro-tl__desc">{it.desc}</p>
        </li>
      ))}
    </ol>
  )
}
