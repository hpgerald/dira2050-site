import { useState, useEffect } from 'react'
import Papa from 'papaparse'

// English-only datasets for the Dira 2050 Communication Strategy.
const BASE = import.meta.env.BASE_URL
const FILES = {
  pillars: 'pillars.csv',
  objectives: 'objectives.csv',
  themes: 'themes.csv',
  principles: 'principles.csv',
  messages: 'messages.csv',
  audiences: 'audiences.csv',
  channels: 'channels.csv',
}

let cache = null

function parse(text) {
  const { data } = Papa.parse(text.trim(), { header: true, dynamicTyping: true, skipEmptyLines: true })
  return data
}

export async function loadComms() {
  if (cache) return cache
  const entries = await Promise.all(
    Object.entries(FILES).map(async ([key, file]) => {
      const res = await fetch(`${BASE}data/comms/${file}`)
      return [key, parse(await res.text())]
    }),
  )
  cache = Object.fromEntries(entries)
  return cache
}

export const pipes = (v) => (v ? String(v).split('|').map((s) => s.trim()).filter(Boolean) : [])

export function useComms() {
  const [data, setData] = useState(null)
  useEffect(() => {
    let alive = true
    loadComms().then((d) => alive && setData(d))
    return () => { alive = false }
  }, [])
  return { data, loading: !data }
}
