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

**GitHub Pages (preferred).** Already configured for it: `base: './'` relative paths + hash routing
mean it works from a project sub-path (e.g. `username.github.io/dira2050-site/`) with no rewrites.
Two ways:

*Option 1 — GitHub Actions (recommended, auto-deploys on push).* Included: `.github/workflows/deploy.yml`.
1. Create a GitHub repo whose **root is this project folder** (the one with `package.json`) and push to `main`.
2. Repo → Settings → Pages → Build and deployment → Source: **GitHub Actions**.
3. Every push to `main` builds and publishes automatically. The live URL appears in the Actions run and under Settings → Pages.

*Option 2 — manual, one command.* The `deploy` script and `gh-pages` package are already in `package.json`.
1. `npm install`
2. `npm run build`
3. `npm run deploy`  (pushes `dist/` to a `gh-pages` branch)
4. Repo → Settings → Pages → Source: **Deploy from a branch** → branch `gh-pages` → `/ (root)`.

Note: if your repo root is the parent folder (`Vision 2050/`) rather than `dira2050-site/`, either move the
project to the repo root, or add `working-directory: dira2050-site` to the workflow's `run` steps and change
the artifact `path` to `dira2050-site/dist`.

## Notes
- Fonts load from Google Fonts (preconnected). For a fully offline/self-hosted build, download Inter and swap the `<link>` in `index.html` for local `@font-face`.
- All data is static CSV in `dist/data/` — updating a figure is just editing a CSV and rebuilding.
