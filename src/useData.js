import { useEffect, useState } from 'react'
import { loadData } from './lib/data.js'
import { useLang } from './i18n.jsx'

// Loads the dataset bundle for the current language and re-loads when the
// language changes. Exposes { data, loading, error }.
export function useData() {
  const { lang } = useLang()
  const [state, setState] = useState({ data: null, loading: true, error: null })
  useEffect(() => {
    let alive = true
    setState((s) => ({ ...s, loading: true }))
    loadData(lang)
      .then((data) => alive && setState({ data, loading: false, error: null }))
      .catch((error) => alive && setState({ data: null, loading: false, error }))
    return () => { alive = false }
  }, [lang])
  return state
}
