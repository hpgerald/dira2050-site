import { useState, useEffect } from 'react'
import Papa from 'papaparse'

// English-only datasets for the Long-Term Perspective Plan (LTPP 2050).
const BASE = import.meta.env.BASE_URL
const FILES = {
  targets: 'targets.csv',
  levels: 'levels.csv',
  threei: 'threei.csv',
  roadmap: 'roadmap.csv',
  toc: 'toc.csv',
  financing: 'financing.csv',
  structural: 'structural.csv',
}

let cache = null

function parse(text) {
  const { data } = Papa.parse(text.trim(), { header: true, dynamicTyping: true, skipEmptyLines: true })
  return data
}

export async function loadLtpp() {
  if (cache) return cache
  const entries = await Promise.all(
    Object.entries(FILES).map(async ([key, file]) => {
      const res = await fetch(`${BASE}data/ltpp/${file}`)
      return [key, parse(await res.text())]
    }),
  )
  cache = Object.fromEntries(entries)
  return cache
}

export const pipes = (v) => (v ? String(v).split('|').map((s) => s.trim()).filter(Boolean) : [])

export function useLtpp() {
  const [data, setData] = useState(null)
  useEffect(() => {
    let alive = true
    loadLtpp().then((d) => alive && setData(d))
    return () => { alive = false }
  }, [])
  return { data, loading: !data }
}
