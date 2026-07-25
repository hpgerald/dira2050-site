import { useEffect } from 'react'

// Sets the document title per route (helps SEO and browser history on the SPA).
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — Dira 2050 Explained` : 'Dira 2050 Explained'
  }, [title])
}
