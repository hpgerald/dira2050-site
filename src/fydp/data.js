import { useState, useEffect } from 'react'
import Papa from 'papaparse'

// English-only datasets for the Fourth Five-Year Development Plan (FYDP IV).
const BASE = import.meta.env.BASE_URL
const FILES = {
  targets: 'targets.csv',
  financing: 'financing.csv',
  flagships: 'flagships.csv',
  reforms: 'reforms.csv',
  macro: 'macro.csv',
  pathways: 'pathways.csv',
  instruments: 'instruments.csv',
  privateStrategy: 'private_strategy.csv',
  allocation: 'allocation.csv',
  pscReforms: 'psc_reforms.csv',
  risks: 'risks.csv',
  pathwayKpis: 'pathway_kpis.csv',
}

let cache = null

function parse(text) {
  const { data } = Papa.parse(text.trim(), { header: true, dynamicTyping: true, skipEmptyLines: true })
  return data
}

export async function loadFydp() {
  if (cache) return cache
  const entries = await Promise.all(
    Object.entries(FILES).map(async ([key, file]) => {
      const res = await fetch(`${BASE}data/fydp/${file}`)
      return [key, parse(await res.text())]
    }),
  )
  cache = Object.fromEntries(entries)
  return cache
}

export const pipes = (v) => (v ? String(v).split('|').map((s) => s.trim()).filter(Boolean) : [])

export function useFydp() {
  const [data, setData] = useState(null)
  useEffect(() => {
    let alive = true
    loadFydp().then((d) => alive && setData(d))
    return () => { alive = false }
  }, [])
  return { data, loading: !data }
}
