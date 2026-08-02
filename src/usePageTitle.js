import { useEffect } from 'react'

// Sets per-route <title> and meta description (helps SEO and link previews).
export function usePageTitle(title, description) {
  useEffect(() => {
    document.title = title ? `${title} · Dira 2050 Explained` : 'Dira 2050 Explained · Tanzania Development Vision 2050, made clear'
    if (description) {
      setMeta('name', 'description', description)
      setMeta('property', 'og:description', description)
      setMeta('name', 'twitter:description', description)
    }
  }, [title, description])
}

function setMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}
