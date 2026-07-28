import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Static build for GitHub Pages project site at /dira2050-site/.
// `base` must match the repo name so assets and routing resolve on Pages.
// (For a different repo name, change this and the router basename follows it.)
export default defineConfig({
  plugins: [react()],
  base: '/dira2050-site/',
})
