// FYDP IV sector KPIs rendered as "now -> 2030/31".
//
// Values come in several shapes and each is drawn to match its meaning:
//   exact number      -> solid bar
//   range "a-b"       -> a band spanning the target zone
//   "<x" ceiling      -> a hatched bar capped at x (stay at or below)
//   ">x" / "x+" floor -> a solid bar to x with an onward arrow (reach x or more)
//   ranking / ratio   -> a clean "now -> target" text row (e.g. 120/133 -> 50th)
//   no target set     -> baseline shown on its own, marked "target not yet set"
// Integers above 999 get thousands separators; decimals and years are left alone.

const groupInt = (intPart) => intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

const fmt = (v) => {
  if (v == null) return v
  const s = String(v).trim()
  const m = s.match(/^(-?)(\d+)(\.\d+)?$/)
  if (!m) return s
  return m[1] + groupInt(m[2]) + (m[3] || '')
}

// Parse a value into a kind plus a numeric "anchor" used for bar length.
const parse = (v) => {
  if (v == null || String(v).trim() === '') return { kind: 'none' }
  const t = String(v).trim()
  let m
  if (/^-?\d+(\.\d+)?$/.test(t)) return { kind: 'num', n: Number(t), label: fmt(t) }
  if ((m = t.match(/^[<≤]\s*(\d+(?:\.\d+)?)$/))) return { kind: 'max', n: Number(m[1]), label: '≤ ' + fmt(m[1]) }
  if ((m = t.match(/^[>≥]\s*(\d+(?:\.\d+)?)$/))) return { kind: 'min', n: Number(m[1]), label: '≥ ' + fmt(m[1]) }
  if ((m = t.match(/^(\d+(?:\.\d+)?)\s*\+$/))) return { kind: 'min', n: Number(m[1]), label: fmt(m[1]) + '+' }
  if ((m = t.match(/^(\d+(?:\.\d+)?)\s*[-–]\s*(\d+(?:\.\d+)?)$/))) return { kind: 'range', lo: Number(m[1]), hi: Number(m[2]), label: fmt(m[1]) + ' to ' + fmt(m[2]) }
  return { kind: 'text', label: t }
}

const anchor = (p) => (p.kind === 'range' ? p.hi : (p.kind === 'text' || p.kind === 'none' ? null : p.n))
const pct = (x, scale) => `${Math.max(0, Math.min(100, (x / scale) * 100))}%`

// Rankings ("120/133", "50th", "Top 10") place a position where 1 is best.
const parseRank = (v) => {
  if (v == null) return null
  const t = String(v).trim()
  let m
  if ((m = t.match(/^(\d+)\s*\/\s*(\d+)$/))) return { rank: +m[1], of: +m[2] }
  if ((m = t.match(/^(\d+)(?:st|nd|rd|th)$/i))) return { rank: +m[1] }
  if ((m = t.match(/^top\s*(\d+)$/i))) return { rank: +m[1] }
  return null
}

function RankBar({ N, fr, tr, from, to }) {
  const p = (r) => `${((r - 1) / (N - 1)) * 100}%`
  const lo = Math.min(fr.rank, tr.rank), hi = Math.max(fr.rank, tr.rank)
  return (
    <div className="rank">
      <div className="rank__track">
        <span className="rank__line" />
        <span className="rank__span" style={{ left: p(lo), right: `calc(100% - ${p(hi)})` }} />
        <span className="rank__tick rank__tick--to" style={{ left: p(tr.rank) }}><span className="rank__lab rank__lab--top">{to}</span></span>
        <span className="rank__tick rank__tick--now" style={{ left: p(fr.rank) }}><span className="rank__lab rank__lab--bot">{from}</span></span>
      </div>
      <div className="rank__ends"><span>1 · best</span><span>lower is better</span><span>{N}</span></div>
    </div>
  )
}

function TargetBar({ t, scale }) {
  if (t.kind === 'range') {
    return (
      <span className="fromto__track">
        <span className="fromto__fill fromto__fill--rangebg" style={{ width: pct(t.hi, scale) }} />
        <span className="fromto__band" style={{ left: pct(t.lo, scale), width: pct(t.hi - t.lo, scale) }} />
      </span>
    )
  }
  if (t.kind === 'max') {
    return (
      <span className="fromto__track">
        <span className="fromto__fill fromto__fill--cap" style={{ width: pct(t.n, scale) }} />
      </span>
    )
  }
  if (t.kind === 'min') {
    return (
      <span className="fromto__track">
        <span className="fromto__fill fromto__fill--to" style={{ width: pct(t.n, scale) }} />
        <span className="fromto__caparrow" style={{ left: pct(t.n, scale) }} aria-hidden="true">▸</span>
      </span>
    )
  }
  return (
    <span className="fromto__track">
      <span className="fromto__fill fromto__fill--to" style={{ width: pct(t.n, scale) }} />
    </span>
  )
}

export default function Kpis({ items }) {
  return (
    <div className="fromto">
      {items.map((k) => {
        const from = parse(k.from), to = parse(k.to)
        const fa = anchor(from), ta = anchor(to)
        const scalable = fa != null && fa >= 0 && ta != null && ta >= 0 && from.kind !== 'text'
        const head = to.kind === 'min' ? 1.18 : 1.03
        const scale = (Math.max(fa || 0, ta || 0) || 1) * head
        // Ranking rows: both sides are ranks and a denominator is known.
        const fr = parseRank(k.from), tr = parseRank(k.to)
        const N = (fr && fr.of) || (tr && tr.of) || null
        const isRank = fr && tr && N && N > 1 && !scalable
        return (
          <div key={k.indicator} className="fromto__row">
            <p className="fromto__ind">{k.indicator}{k.year ? <span className="fromto__unit"> · {k.year}</span> : null}</p>
            {isRank ? (
              <RankBar N={N} fr={fr} tr={tr} from={k.from} to={k.to} />
            ) : scalable ? (
              <div className="fromto__bars">
                <div className="fromto__bar">
                  <span className="fromto__k">Now</span>
                  <span className="fromto__track"><span className="fromto__fill fromto__fill--now" style={{ width: pct(fa, scale) }} /></span>
                  <span className="fromto__v">{from.label}</span>
                </div>
                <div className="fromto__bar">
                  <span className="fromto__k">2030/31</span>
                  <TargetBar t={to} scale={scale} />
                  <span className="fromto__v">{to.label}</span>
                </div>
              </div>
            ) : to.kind === 'none' ? (
              <p className="fromto__plain"><span className="fromto__k">Now</span> <strong>{from.label}</strong> <span className="fromto__target-tbd">target not yet set</span></p>
            ) : (
              <p className="fromto__plain"><span className="fromto__k">Now</span> <strong>{from.label}</strong> <span className="fromto__arrow" aria-hidden="true">→</span> <span className="fromto__k">2030/31</span> <strong>{to.label}</strong></p>
            )}
          </div>
        )
      })}
    </div>
  )
}
