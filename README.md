# FinManager

Offline-first personal money manager monorepo. Phase 1 contains the application shell and API foundation; it does not include authentication or financial data entry.

## Requirements

- Node.js 20 or later
- pnpm 9 or later
- MongoDB for an `ok` API health response

## Setup

```sh
pnpm install
```

Copy `apps/api/.env.example` to `apps/api/.env` and adjust `MONGODB_URI` if needed. The API starts even when MongoDB is unavailable; `/api/health` reports `degraded` until the database connects.

## Commands

```sh
pnpm dev       # Run web (http://localhost:5173) and API (http://localhost:4000)
pnpm build     # Build shared, API, and web packages
pnpm lint      # Lint all packages
pnpm typecheck # Type-check all packages
pnpm test      # Run package tests when present
```

The web app uses Vite's PWA plugin. Production builds include an installable standalone manifest and precached app shell. The theme preference is saved in `localStorage` under `finmanager-theme`.
