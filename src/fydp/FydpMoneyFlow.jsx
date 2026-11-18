import { useEffect, useRef, useState } from 'react'

/*
  Signature set-piece for FYDP financing: the money, end to end. Three sources
  (left) pool into the single envelope (centre), which fans out to the eleven
  investment clusters (right). The plan gives no source-by-cluster matrix, so
  the centre is one pooled envelope rather than crossing flows, keeping it
  honest. A left-to-right clip wipe reveals the flow. Reduce-motion safe.
*/

const W = 860, H = 640
const TOP = 56, BOT = 596
const SX = 104, SW = 16
const TXA = 430, TW = 20
const DX = 724, DW = 16

// short, controlled labels for the destination clusters
const SHORT = {
  transport: 'Transport & logistics', energy: 'Energy & extractives', industry: 'Industry & trade',
  agriculture: 'Agriculture & fisheries', education: 'Education & skills', health: 'Health & protection',
  water: 'Water & urban', ict: 'ICT & digital', tourism: 'Tourism & services',
  environment: 'Environment & climate', governance: 'Governance & R&D',
}

function band(xA, y0a, y1a, xB, y0b, y1b) {
  const mx = (xA + xB) / 2
  return `M ${xA} ${y0a} C ${mx} ${y0a} ${mx} ${y0b} ${xB} ${y0b} L ${xB} ${y1b} C ${mx} ${y1b} ${mx} ${y1a} ${xA} ${y1a} Z`
}

// stack items into vertical segments over [TOP,BOT] with gaps, sized by value
function stack(values, gap) {
  const total = values.reduce((a, v) => a + v, 0)
  const h = (BOT - TOP) - gap * (values.length - 1)
  let y = TOP
  return values.map((v) => {
    const seg = { y0: y, y1: y + (v / total) * h }
    y = seg.y1 + gap
    return seg
  })
}

export default function FydpMoneyFlow({ financing, allocation }) {
  const [p, setP] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  const uid = useRef(`mf${Math.random().toString(36).slice(2, 7)}`)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const run = () => {
      if (started.current) return
      started.current = true
      if (reduce) { setP(1); return }
      let raf, start
      const dur = 1300, ease = (x) => 1 - Math.pow(1 - x, 3)
      const step = (ts) => {
        if (start === undefined) start = ts
        const k = Math.min(1, (ts - start) / dur)
        setP(ease(k))
        if (k < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { run(); io.disconnect() } })
    }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const srcSeg = stack(financing.map((f) => Number(f.share)), 8)
  const trunkLeft = stack(financing.map((f) => Number(f.share)), 2)
  const destVals = allocation.map((a) => Number(a.usd_billion))
  const destSeg = stack(destVals, 4)
  const trunkRight = stack(destVals, 1)

  const clip = `${uid.current}-wipe`

  return (
    <figure className="mflow" ref={ref}>
      <svg viewBox={`0 0 ${W} ${H}`} className="mflow__svg" role="img"
           aria-label="How the FYDP IV financing envelope flows from three sources to eleven investment clusters">
        <defs>
          <clipPath id={clip}><rect x="0" y="0" width={W * p} height={H} /></clipPath>
        </defs>

        {/* column headers */}
        <text x={SX + SW / 2} y={40} textAnchor="middle" className="mflow__head">WHERE IT COMES FROM</text>
        <text x={TXA + TW / 2} y={40} textAnchor="middle" className="mflow__head">THE ENVELOPE</text>
        <text x={DX + DW / 2} y={40} textAnchor="middle" className="mflow__head">WHERE IT GOES</text>

        <g clipPath={`url(#${clip})`}>
          {/* left ribbons: source -> trunk-left */}
          {financing.map((f, i) => (
            <path key={`lr${f.id}`} className="mflow__ribbon"
                  d={band(SX + SW, srcSeg[i].y0, srcSeg[i].y1, TXA, trunkLeft[i].y0, trunkLeft[i].y1)} />
          ))}
          {/* right ribbons: trunk-right -> dest */}
          {allocation.map((a, i) => (
            <path key={`rr${a.id}`} className="mflow__ribbon"
                  d={band(TXA + TW, trunkRight[i].y0, trunkRight[i].y1, DX, destSeg[i].y0, destSeg[i].y1)} />
          ))}
        </g>

        {/* trunk */}
        <rect x={TXA} y={TOP} width={TW} height={BOT - TOP} className="mflow__trunk" style={{ opacity: p }} />

        {/* source bars + labels */}
        {financing.map((f, i) => (
          <g key={f.id} style={{ opacity: p }}>
            <rect x={SX} y={srcSeg[i].y0} width={SW} height={srcSeg[i].y1 - srcSeg[i].y0} className="mflow__src" />
            <text x={SX - 10} y={(srcSeg[i].y0 + srcSeg[i].y1) / 2 - 3} textAnchor="end" className="mflow__name">{f.source}</text>
            <text x={SX - 10} y={(srcSeg[i].y0 + srcSeg[i].y1) / 2 + 13} textAnchor="end" className="mflow__val">TZS {f.tzs_trillion}tn · {f.share}%</text>
          </g>
        ))}

        {/* dest bars + labels */}
        {allocation.map((a, i) => (
          <g key={a.id} style={{ opacity: p }}>
            <rect x={DX} y={destSeg[i].y0} width={DW} height={destSeg[i].y1 - destSeg[i].y0} className="mflow__dest" />
            <text x={DX + DW + 10} y={(destSeg[i].y0 + destSeg[i].y1) / 2 + 4} textAnchor="start" className="mflow__dname">
              {SHORT[a.id] || a.cluster} <tspan className="mflow__dval">US${a.usd_billion}bn</tspan>
            </text>
          </g>
        ))}
      </svg>
      <p className="mflow__note">Left: the three financing sources (TZS 477.7tn total). Right: investment demand by cluster (~US$183bn). The plan does not map individual sources to clusters, so the centre is the single pooled envelope. Source page 92, 93.</p>
    </figure>
  )
}
