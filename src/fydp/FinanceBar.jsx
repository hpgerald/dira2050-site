// Financing envelope as a stacked bar (base design, monochrome).
const SHADES = ['#111111', '#767676', '#c9c9c9']

export default function FinanceBar({ items }) {
  return (
    <div className="fbar">
      <div className="fbar__track" role="img" aria-label="Financing by source">
        {items.map((it, i) => (
          <span key={it.id} className="fbar__seg" style={{ width: `${it.share}%`, background: SHADES[i % SHADES.length] }} />
        ))}
      </div>
      <ul className="fbar__legend">
        {items.map((it, i) => (
          <li key={it.id} className="fbar__row">
            <span className="fbar__key" style={{ background: SHADES[i % SHADES.length] }} aria-hidden="true" />
            <span className="fbar__src">{it.source}</span>
            <span className="fbar__pct">{it.share}%</span>
            <span className="fbar__amt">TZS {it.tzs_trillion}T</span>
            <span className="fbar__note">{it.note}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
