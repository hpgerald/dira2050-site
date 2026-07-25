import { useEffect, useState } from 'react'
import { loadData } from './lib/data.js'

// Loads the dataset bundle once and exposes { data, loading, error }.
export function useData() {
  const [state, setState] = useState({ data: null, loading: true, error: null })
  useEffect(() => {
    let alive = true
    loadData()
      .then((data) => alive && setState({ data, loading: false, error: null }))
      .catch((error) => alive && setState({ data: null, loading: false, error }))
    return () => {
      alive = false
    }
  }, [])
  return state
}
