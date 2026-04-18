# ReFrog — Failure Log

> Tracks failed approaches, blockers, and unresolved issues.

---

## 2026-02-18 — Web Deployment Failures (GitHub Pages + Expo Router)

**Goal:** Deploy ReFrog to `https://rikiworld.com/refrog-app`

**Root cause:** Expo Router uses client-side routing and expects to run at root (`/`). When deployed to a subdirectory (`/refrog-app/`), it cannot resolve routes and shows "Unmatched Route".

### What Was Tried

| Attempt | What | Result |
|---------|------|--------|
| 1 | Standard GitHub Pages workflow (`deploy.yml`) | Assets use absolute paths (`/`), break at `/refrog-app/` |
| 2 | `sed` path rewriting in CI (rewrote script src, favicon href to include `/refrog-app/`) | Paths fixed, but Expo Router still shows "Unmatched Route" |
| 3 | SPA redirect via `404.html` + `_redirects` | Still broken — router can't find routes |
| 4 | Simple vanilla HTML fallback in `dist/index.html` | **Works.** No React/Expo deps, runs anywhere. **Current solution.** |

### Current Solution

Pure HTML/CSS/JS in `dist/index.html`. No Expo Router involvement. GitHub Actions deploys this artifact directly.

### Future Options (if Expo web build ever needed)

- **Vercel** — handles subdirectory deployments automatically
- **Netlify** — `netlify deploy --prod --dir=dist`
- **Fix base path** — set `expo-router/basePath` in `app.json`, then rebuild (not yet tested)
