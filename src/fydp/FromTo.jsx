// From -> to trajectory bars on a shared scale (base design, monochrome).
export default function FromTo({ items }) {
  return (
    <div className="fromto">
      {items.map((it) => {
        const from = Number(it.from), to = Number(it.to), max = Math.max(from, to) || 1
        return (
          <div key={it.id} className="fromto__row">
            <p className="fromto__ind">{it.indicator} <span className="fromto__unit">· {it.unit}</span></p>
            <div className="fromto__bars">
              <div className="fromto__bar">
                <span className="fromto__k">Now</span>
                <span className="fromto__track"><span className="fromto__fill fromto__fill--now" style={{ width: `${(from / max) * 100}%` }} /></span>
                <span className="fromto__v">{it.from}</span>
              </div>
              <div className="fromto__bar">
                <span className="fromto__k">2030/31</span>
                <span className="fromto__track"><span className="fromto__fill fromto__fill--to" style={{ width: `${(to / max) * 100}%` }} /></span>
                <span className="fromto__v">{it.to}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
