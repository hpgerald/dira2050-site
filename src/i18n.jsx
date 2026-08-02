import { createContext, useContext, useEffect, useState } from 'react'
import STRINGS from './strings.js'

/*
  Bilingual support. English is the default; Swahili (sw) is the second language.
  The choice persists in localStorage and drives both the UI strings (via t) and
  which data folder the loader reads (English at /data, Swahili at /data/sw).
*/
const LanguageContext = createContext(null)
const STORAGE_KEY = 'dira-lang'

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) || 'en' } catch { return 'en' }
  })

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, lang) } catch { /* ignore */ }
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (l) => setLangState(l === 'sw' ? 'sw' : 'en')

  // t('page.key') with dotted paths; falls back to English, then the key itself.
  const t = (path) => {
    const get = (obj) => path.split('.').reduce((o, k) => (o ? o[k] : undefined), obj)
    return get(STRINGS[lang]) ?? get(STRINGS.en) ?? path
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
