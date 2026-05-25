# PolyCalm

A Vite + React + TypeScript interactive 3D simulation prototype using React Three Fiber, Three.js, Drei, Rapier, and Zustand.

## Local development

```bash
npm install
npm run dev
```

## Verification

```bash
npm test
npm run build
npm run test:e2e
```

`npm run test:e2e` runs Playwright smoke tests against a production preview. If the Playwright browser cache is empty on a new machine, run:

```bash
npx playwright install chromium
```

## Coolify deployment

Recommended first deployment path: **Dockerfile**.

Coolify settings:

- Source: GitHub repository
- Branch: feature branch or `main`
- Build pack: Dockerfile
- Dockerfile path: `Dockerfile`
- Exposed port: `80`
- Health check path: `/`

The Docker image builds the Vite app with `npm ci && npm run build`, then serves `dist/` through nginx with SPA fallback routing.

Alternative static deployment settings if using a static build pack:

- Install command: `npm ci`
- Build command: `npm run build`
- Publish/output directory: `dist`

## Current scenes

- Magnet
- Fog
- Garden
- Codex
