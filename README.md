# borisr.dev

Boris Rossovsky's personal website — rebuilt from scratch. A showcase, not a
resume: music, art, projects, and tools. No analytics, no cookies, no blog.

Live site: [borisr.dev](https://borisr.dev) (Netlify). The redesign plan lives
in [PLAN.md](PLAN.md).

Staging (previews): [borisr-redesign.netlify.app](https://borisr-redesign.netlify.app)
— the separate Netlify staging site. Work lands via PRs against `main`
(no direct pushes to `main`); Netlify builds a deploy preview per PR and
production deploys on merge. Squash on merge.

## Stack

- **Astro 7** (static output) + **TypeScript strict**
- **Svelte 5 islands** (`@astrojs/svelte`) — interactive bits only; static
  content stays in Astro. SvelteKit was passed over: this is a content site,
  not an app.
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Biome** for lint + format. **pnpm**, **Node 22.23.5+** (see `.nvmrc`).

## Run it

```sh
pnpm install
pnpm dev      # local dev server
pnpm build    # static build into dist/
pnpm preview  # serve the production build
pnpm lint     # biome check src
pnpm format   # biome format --write src
```

Deploy is via Netlify. Do not create Netlify sites from here; the staging
site is linked to this repo. Work lands via PRs against `main` — Netlify
builds a deploy preview per PR, and merging to `main` deploys staging.
Do not push to `main` directly.

## Separation of concerns (hard rule)

| Layer | Where | Rule |
|---|---|---|
| Content / data | `src/data/site.ts` | The only place copy, links, and labels live. Components and pages never hardcode them. |
| Design tokens | `src/styles/tokens.css` | The only place colors, typefaces, and the type scale live. Themes are CSS custom properties (`.theme-a` / `.theme-b` / `.theme-c`, `.light` variant). |
| Components | `src/components/` | Presentational only. Astro for static, Svelte for interactive islands. No data fetching, no content strings, no colors/type inside — styling comes from the tokens. |
| Pages | `src/pages/` | Thin composition: import data + components, lay them out. No inline styles, no business logic. |

Themes differ **only** in tokens + layout composition. There is one set of
shared components and one set of shared data — never a per-direction copy.

## Design directions

Three home-page directions under `/design/`, same content, different look.
Each has a dark/light toggle (dark default, persisted in `localStorage`).

- **A — Tube amp** (`/design/a`): warm serif. Fraunces + Inter + IBM Plex
  Mono, amber ochre accent, centered narrow column.
- **B — Instrument** (`/design/b`): matched family. Instrument Serif +
  Instrument Sans + IBM Plex Mono, steel blue accent, left-aligned, ruled
  section labels.
- **C — Workbench** (`/design/c`): grotesque + mono. Clash Display +
  Satoshi (Fontshare) + JetBrains Mono, signal orange accent,
  index-numbered sections.

`/design/` lists all three. `/` is the real home page in the Workbench
theme (direction C); the three `/design/*` pages stay as reference.

## Site structure

- **Real pages** (Workbench theme, `src/layouts/SiteLayout.astro`): `/`
  (intro + section teasers), `/art`, `/music`, `/projects`, `/tools`,
  `/contact`. Thin composition over the shared components.
- **Navigation**: one fixed bottom bar on every page (Home, Art, Music,
  Projects, Tools, Contact; current page marked by a short vertical
  accent bar, hover by a dot). The dark/light toggle is a separate
  fixed top-right `<button>` (sun/moon icon, 44px), so toggling never
  shifts any layout.
- **Grid**: one centered column (`--grid-max: 56rem`,
  `--grid-gutter: 1.5rem` in the tokens); header, sections, cards,
  footer, and bottom bar all sit on it via `.site-wrap`.
- **Tools proxy**: `netlify.toml` rewrites
  `/tools/brighter-shores-routefinder/*` (200, `force = true`) to the
  standalone Routefinder Netlify site, so the tool runs under borisr.dev.
  The proxy is not verifiable locally — check it on the staging deploy.

### Adding or changing a direction

1. Add a theme block to `src/styles/tokens.css` (`.theme-x` + `.theme-x.light`).
2. Add `src/pages/design/x.astro` using `DesignLayout` with `theme="x"`,
   composing the shared components from `src/components/`.
3. Add the font links in that page's `fonts` prop.
4. Add it to `designIndex.directions` in `src/data/site.ts`.
5. `pnpm build` must pass before pushing.

## Content

Everything user-facing is in `src/data/site.ts`: intro, nav, home teasers,
music links (Bandcamp album `3553260334`, SoundCloud, Newgrounds), art feed
links (Instagram, TikTok `@ravanger666`), the Routefinder project card, the
`/tools/brighter-shores-routefinder` tools entry (with live status and the
fan-made disclaimer), socials, email (`contact@borisr.dev`, assembled in JS
by the footer script for every `.email-link` on the page — footer and
contact page — so the plain address isn't in the HTML source).

## Media policy

No heavy media in the repo: no images, videos, or audio files. The Art
section renders placeholder tiles; the live feed will pull from
Instagram/TikTok's CDNs later, not from this repo. Thumbnails only if
actually needed as lazy-loading placeholders, kept tiny. (The only asset
committed is the 228-byte SVG favicon.)

## Repo conventions

- Small logical commits, conventional-commit style (`feat:`, `fix:`,
  `chore:`, `docs:`). Squash on merge.
- `pnpm build` and `pnpm lint` must pass before pushing.
- The Bandcamp/SoundCloud embeds use the vendors' default player colors on
  purpose: the theme accent is a CSS token and can't reach an iframe URL at
  build time, and keeping colors solely in `src/styles/` wins over matching
  the players to the palette.
- The Bandcamp player uses its native large layout with the tracklist on
  (`size=large`, `tracklist=true`, 470px tall, max 350px wide) — never
  CSS-stretched.
