// Small formatting helpers so numbers read cleanly for a general audience.

export function formatValue(value, unit) {
  if (value === null || value === undefined || value === '') return '—'
  const n = typeof value === 'number' ? value : Number(value)
  const num = Number.isNaN(n) ? value : n.toLocaleString('en-US')
  return unit ? `${num} ${unit}` : `${num}`
}

// Returns a short label like "26.5% of GDP" or "US$7,000".
export function shortMetric(value, unit) {
  if (value === null || value === undefined || value === '') return '—'
  return `${Number(value).toLocaleString('en-US')} ${unit ?? ''}`.trim()
}

export const isNumber = (v) => v !== null && v !== undefined && v !== '' && !Number.isNaN(Number(v))
