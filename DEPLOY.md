# Deploying Dira 2050 Explained

The site is a static Vite build — it works on any static host with zero server config, because it uses hash routing (deep links like `/#/targets` need no server rewrites).

## Build

```
npm install
npm run build      # outputs to dist/
```

## Deploy the `dist/` folder

**Netlify** — drag the `dist/` folder onto app.netlify.com, or connect the repo with:
- Build command: `npm run build`
- Publish directory: `dist`

**Vercel** — import the repo; framework preset "Vite"; output dir `dist`.

**GitHub Pages** —
1. `npm run build`
2. push the contents of `dist/` to a `gh-pages` branch (or use the `gh-pages` npm package).
3. Because `vite.config.js` uses `base: './'` (relative paths) and hash routing, it works from a project sub-path (e.g. `username.github.io/dira2050-site/`) with no extra config.

## Notes
- Fonts load from Google Fonts (preconnected). For a fully offline/self-hosted build, download Inter and swap the `<link>` in `index.html` for local `@font-face`.
- All data is static CSV in `dist/data/` — updating a figure is just editing a CSV and rebuilding.
