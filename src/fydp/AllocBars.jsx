// Where the USD 183 billion goes: demand by sector/priority cluster (Table 5.1),
// drawn as ranked horizontal bars on a shared scale.
export default function AllocBars({ items }) {
  const rows = [...items].sort((a, b) => Number(b.usd_billion) - Number(a.usd_billion))
  const total = rows.reduce((s, r) => s + Number(r.usd_billion), 0)
  const max = Math.max(...rows.map((r) => Number(r.usd_billion)))
  return (
    <div className="alloc">
      {rows.map((r) => {
        const v = Number(r.usd_billion)
        const share = Math.round((v / total) * 100)
        return (
          <div key={r.id} className="alloc__row">
            <span className="alloc__name">{r.cluster}</span>
            <span className="alloc__track"><span className="alloc__fill" style={{ width: `${(v / max) * 100}%` }} /></span>
            <span className="alloc__val">{v.toFixed(1)}<span className="alloc__unit"> bn · {share}%</span></span>
          </div>
        )
      })}
    </div>
  )
}
