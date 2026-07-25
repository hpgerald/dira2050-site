import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Static build. `base: './'` keeps asset paths relative so the site works on
// GitHub Pages, Netlify, Vercel or any sub-path without extra config.
export default defineConfig({
  plugins: [react()],
  base: './',
})
