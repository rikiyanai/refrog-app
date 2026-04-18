# ReFrog Web Deployment - Handoff Document

## Current Status

**Goal:** Deploy ReFrog app to `https://rikiworld.com/refrog-app`

**Problem:** GitHub Pages not working correctly with Expo Router subdirectory deployment.

## What Was Tried

### 1. Standard GitHub Pages Workflow
- Created `.github/workflows/deploy.yml` using GitHub Actions
- Issue: Expo Router outputs assets with absolute paths (`/`), but site is at `/refrog-app/`

### 2. Path Rewriting
- Added `sed` commands in workflow to rewrite paths to include `/refrog-app/`
- Fixed `index.html` script src, favicon href
- Still showing "Unmatched Route" error from Expo Router

### 3. SPA Redirect (404.html)
- Copied index.html to 404.html
- Added `_redirects` file
- Still not working properly

### 4. Simple HTML Fallback (CURRENT)
- Created simple vanilla HTML/JS version in `dist/index.html`
- No React/Expo dependencies
- Pure HTML/CSS/JS - should work anywhere
- Just committed to repo

## The Real Issue

Expo Router uses client-side routing and expects to be at root (`/`). When deployed to a subdirectory (`/refrog-app/`), the router can't find its routes and shows "Unmatched Route".

## Solutions to Try

### Option A: Vercel (Recommended)
```bash
npm i -g vercel
cd /Users/r/Projects/refrog-app
vercel
# Follow prompts, will auto-detect Expo
# Then add custom domain in Vercel dashboard
```

Vercel handles subdirectory deployments automatically.

### Option B: Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```

### Option C: Fix Expo Router Base Path
Need to configure Expo Router to know it's at `/refrog-app/`. This requires:
1. Setting `expo-router/basePath` in app.json
2. Properly configuring the build

### Option D: Use the Simple HTML Version
The simple HTML version in `dist/index.html` should work. Need to verify it deployed correctly.

## Files Modified

- `app.json` - Added basePath
- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `dist/index.html` - Simple HTML fallback

## Repo
https://github.com/rikiyanai/refrog-app

## Custom Domain
- rikiworld.com configured for this repo
- Should work at https://rikiworld.com/refrog-app/
