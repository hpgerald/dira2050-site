/*
  Progress-monitoring architecture. `progressProvider` is a swappable adapter:
  the default returns no live data, so the UI shows a clean "monitoring pending"
  state. A future backend implements the same async `fetch(ids)` -> { id: { current, asOf } }
  contract (e.g. an official indicators API) and everything else keeps working.
*/
export const progressProvider = {
  name: 'none',
  // eslint-disable-next-line no-unused-vars
  async fetch(ids) {
    return {} // future: return official current values keyed by target id
  },
}

const num = (v) => (v == null || v === '' || Number.isNaN(Number(v)) ? null : Number(v))

// Direction-aware progress 0–100 from baseline → target given a current value.
export function pct(baseline, target, current) {
  const b = num(baseline), t = num(target), c = num(current)
  if (b == null || t == null || c == null) return null
  if (t === b) return c >= t ? 100 : 0
  const p = ((c - b) / (t - b)) * 100
  return Math.max(0, Math.min(100, p))
}

export function statusKey(baseline, target, current) {
  const p = pct(baseline, target, current)
  if (p == null) return 'Nodata'
  if (p >= 100) return 'Met'
  if (p >= 50) return 'On'
  return 'Behind'
}
