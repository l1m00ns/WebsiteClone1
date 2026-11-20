<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# paste-co.de Clone

A static, pixel-accurate recreation of [paste-co.de](https://paste-co.de) — the game-cheat source archive and community hub — built with Next.js and Tailwind CSS.

## Stack

- **Next.js 16** — App Router, React 19, TypeScript strict
- **Tailwind CSS v4** — oklch design tokens and custom glass surfaces
- **shadcn/ui + Base UI** — primitives and dialogs
- **Lucide React** — icons, plus extracted brand and game assets
- **Static JSON snapshots** — no runtime calls to the source API

## Commands

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript
- `npm run check` — lint + typecheck + build

Node.js 24+ is required.

## Architecture

- `src/app/` — one folder per route; dynamic routes use async `params`/`searchParams` (Next.js 16).
- `src/components/site/` — shared shell (header, footer, ambient background) and page-specific clients.
- `src/data/` — public API snapshots: projects, games, Roblox offsets/FFlags, forums, community offsets, search index.
- `src/content/` — cleaned HTML for guides and legal pages, plus their metadata.
- `src/lib/data.ts` — typed accessors over the snapshots; `src/lib/format.ts` — number/date formatting.
- `public/` — mirrored source assets (`brand`, `game-icons`, `sponsors`, `fonts`).
- `docs/research/paste-co.de/` — captured source pages, CSS, API payloads, and screenshots.
- `scripts/pastecode/` — extraction and asset-mirroring helpers.

## Conventions

- TypeScript strict, no `any`; named exports; PascalCase components; camelCase helpers.
- Tailwind utilities or scoped CSS in `globals.css`; avoid inline styles except for dynamic values.
- Preserve the source's spacing, typography, radii, and glass treatments. Do not redesign during fidelity work.
- All content comes from the snapshots. Do not add runtime fetches to `paste-co.de`.
- Downloads, uploads, reports, and auth use `DemoAction` (or the existing signed-out state) instead of simulating a session.
- Format counts with `formatNumber` and dates with the shared helpers so output stays consistent.

## Verification

- Run `npm run check` before considering a change complete.
- Compare against the source at desktop (912–1128 px) and mobile (390 px). The source screenshots live in `docs/research/paste-co.de/shots/`.
- Check for horizontal overflow at 390 px; intended scroll areas (tab and filter rows) are the only exception.
