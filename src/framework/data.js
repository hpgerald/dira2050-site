import { useState, useEffect } from 'react'
import Papa from 'papaparse'

// English-only datasets for the National Delivery Framework section. Files live
// in /public/data/framework and are extracted from the official document.
const BASE = import.meta.env.BASE_URL
const FILES = {
  alignment: 'alignment.csv',
  cycle: 'cycle.csv',
  priorityAreas: 'priority_areas.csv',
  paComponents: 'pa_components.csv',
  institutions: 'institutions.csv',
  plans: 'plans.csv',
  shift: 'shift.csv',
  scoring: 'scoring.csv',
  principles: 'principles.csv',
  methods: 'methods.csv',
  signals: 'signals.csv',
  escalation: 'escalation.csv',
}

let cache = null

function parse(text) {
  const { data } = Papa.parse(text.trim(), { header: true, dynamicTyping: true, skipEmptyLines: true })
  return data
}

export async function loadFramework() {
  if (cache) return cache
  const entries = await Promise.all(
    Object.entries(FILES).map(async ([key, file]) => {
      const res = await fetch(`${BASE}data/framework/${file}`)
      return [key, parse(await res.text())]
    }),
  )
  cache = Object.fromEntries(entries)
  return cache
}

export const pipes = (v) => (v ? String(v).split('|').map((s) => s.trim()).filter(Boolean) : [])

export function useFramework() {
  const [data, setData] = useState(null)
  useEffect(() => {
    let alive = true
    loadFramework().then((d) => alive && setData(d))
    return () => { alive = false }
  }, [])
  return { data, loading: !data }
}
