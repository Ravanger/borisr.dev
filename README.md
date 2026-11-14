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
| Content / data | `src/data/site.ts` + `src/content/` (MDX collections) | The only place copy, links, and labels live. Components and pages never hardcode them. |
| Design tokens | `src/styles/tokens.css` | The only place colors, typefaces, and the type scale live. Themes are CSS custom properties (`.theme-a` / `.theme-b` / `.theme-c`, `.light` variant). |
| Components | `src/components/` | Presentational only. Astro for static, Svelte for interactive islands. No data fetching, no content strings, no colors/type inside — styling comes from the tokens. |
| Pages | `src/pages/` | Thin composition: import data + components, lay them out. No inline styles, no business logic. |

Themes differ **only** in tokens + layout composition. There is one set of
shared components and one set of shared data — never a per-direction copy.

No formal MVC/MVP/MVVM pattern: the site is static and content-first,
so there is nothing for a view-model to mediate — content and data live
in `src/data` and the MDX collections, presentation lives in Astro
components, the little interactive state there is (theme toggle, filters,
feed loading) is self-contained in Svelte runes islands, and data flows
one way from data to components. A formal pattern would be abstraction
with no benefit at this size; revisit if the site ever grows stateful
features.

## Design directions

Three home-page directions under `/design/`, same content, different look.
Each has a dark/light toggle (dark default, persisted in `localStorage`).

- **A — Tube amp** (`/design/a`): warm serif. Fraunces + Inter + IBM Plex
  Mono, amber ochre accent, centered narrow column.
- **B — Instrument** (`/design/b`): matched family. Instrument Serif +
  Instrument Sans + IBM Plex Mono, steel blue accent, left-aligned, ruled
  section labels.
- **C — Workbench** (`/design/c`): "bench at 2am". Big Shoulders Display
  + IBM Plex Sans + Departure Mono (all self-hosted woff2),
  phosphor `#8CFF6A` accent on near-black, index-numbered sections.

`/design/` lists all three. `/` is the real home page in the Workbench
theme (direction C); the three `/design/*` pages stay as reference.

## Site structure

- **Real pages** (Workbench theme, `src/layouts/SiteLayout.astro`): `/`
  (hero + stompbox board linking to Art, Music, Projects), `/art`, `/music`,
  `/projects`. Thin composition over the shared components.
  There is no `/contact` page — the footer is the contact point
  (JS-assembled email + GitHub only). There is no `/tools` index page
  either (folded into Projects 2026-11-14, issue #19) — the Routefinder
  stays live at `/tools/brighter-shores-routefinder` with no index
  behind it.
- **Project detail pages** (`src/content/projects/*.mdx`, one file per
  project, rendered by `src/pages/projects/[slug].astro`):
  `/projects/brighter-shores-routefinder`, `/projects/openparty`,
  `/projects/esp32-desk-gadget`. Short writeups from each repo's README,
  photos from the project's own repo (or its GitHub social preview),
  GitHub link on each page. Not a blog: no dates, no feed, no pagination.
- **Navigation**: one fixed bottom bar on every page (Home, Art, Music,
  Projects; current page marked by a short vertical accent bar,
  hover by a dot). A fixed top-left home link ("borisr.dev" → `/`)
  mirrors it on every page. The dark/light toggle is a separate fixed
  top-right `<button>` (sun/moon icon, 44px), so toggling never shifts
  any layout. The bottom-bar wordmark is horizontal by construction
  (`writing-mode: horizontal-tb`, no wrapping, never squeezed).
- **Grid**: one centered column (1200px max, 24px gutters desktop /
  16px mobile, in the tokens); header, sections, cards,
  footer, and bottom bar all sit on it via `.site-wrap`.
- **Projects filter**: All / Software / Framework / Hardware / Live
  buttons (`src/components/ProjectFilter.svelte`, client-side, no
  reload); categories come from each project's frontmatter, Live shows
  only projects with a live tool. The filter syncs to the URL
  (`?filter=<category>`, e.g. `?filter=live`) via `history.pushState` —
  no reload, shareable links, back/forward works; `All` clears the
  param (plain `/projects`).
- **Tools**: the Routefinder is embedded, not proxied — a full-height
  iframe on `/tools/brighter-shores-routefinder` (real borisr.dev page,
  site chrome stays visible), with an "open in a new tab" link to the
  direct URL. There is no `/tools` index page: live tools are a filter
  on `/projects` (`?filter=live`), and the home Tools teaser links
  there. Why no proxy: the app is a Vite build with base `"./"`,
  so under a subpath its relative JS/CSS resolve against `/tools/` and
  404 (blank page without a trailing slash); its router also assumes
  site root. The `netlify.toml` proxy rewrite was removed.
- **Fun layer** (issue #22): an oscilloscope trace on Home
  (`src/components/ScopeTrace.astro`, full-bleed 1px phosphor canvas
  behind the hero copy — idle slow sine, cursor speed drives
  amplitude/frequency and morphs it square-ish; static line under
  `prefers-reduced-motion`); a console greeting for devtools pokers
  (ASCII skull + the GitHub link); and the Konami code
  (↑ ↑ ↓ ↓ ← → ← → B A) → DEVOUR MODE, 10s of LED-red accent,
  full-fuzz trace and doubled grain, then it reverts — all in
  `src/components/FunLayer.astro`, included by `SiteLayout` on every
  page. No sound anywhere.

### Adding or changing a direction

1. Add a theme block to `src/styles/tokens.css` (`.theme-x` + `.theme-x.light`).
2. Add `src/pages/design/x.astro` using `DesignLayout` with `theme="x"`,
   composing the shared components from `src/components/`.
3. Add the font links in that page's `fonts` prop.
4. Add it to `designIndex.directions` in `src/data/site.ts`.
5. `pnpm build` must pass before pushing.

## Content

Everything user-facing is in `src/data/site.ts` or the MDX collections:
intro, nav, home stompbox board (Art / Music / Projects, each with knob
labels, a one-line summary, footswitch + LED; patch-cable signal chain
IN → ART → MUSIC → PROJECTS → OUT), music links (Bandcamp album `3553260334`, SoundCloud,
Newgrounds), art feed links (Instagram, TikTok `@ravanger666`), the
projects collection, the `/tools/brighter-shores-routefinder` tools entry
(with live status and the fan-made disclaimer), footer socials (GitHub
only), email (`contact@borisr.dev`, assembled in JS by the footer script
for every `.email-link` on the page, so the plain address isn't in the
HTML source).

## Instagram feed (live, on /art)

The latest 9 photos come from a Netlify function,
`netlify/functions/instagram.mts`, which calls the Instagram API
(`graph.instagram.com/me/media`) with the `INSTAGRAM_TOKEN` env var and
returns thumbnail URLs + permalinks + captions (briefly CDN-cached).
`src/components/InstagramFeed.svelte` renders them in a grid,
lazy-loaded from Instagram's CDN; while loading it shows placeholder
tiles, and with no token (or any failure) the function returns an empty
list and the page falls back to a note + the profile link. The live feed
is unverified until the token exists.

Setup (Boris): convert the Instagram account to Creator/Business, create
a Meta developer app, use Instagram Login to generate a long-lived
access token, and set it as the `INSTAGRAM_TOKEN` env var on the
borisr-redesign Netlify site. No Facebook Page is needed, and no paid
widget is used. The token lives only as a Netlify secret — see
`.env.example` for the variable name; never commit a real value, and
never put the token in the repo or in chat.

## Media policy

No heavy media in the repo: no images, videos, or audio files. The Art
section pulls from Instagram's CDN (see above); project thumbnails are
each repo's GitHub social preview (opengraph.githubassets.com, external,
lazy-loaded); detail-page photos come from the project's own repo via
raw.githubusercontent.com (or the same social preview where the repo has
no usable photo — the Routefinder and OpenParty have none in-repo, only
icons). The only assets committed are the 228-byte SVG favicon and
the self-hosted woff2 fonts in `public/fonts/` (OFL, see
`ATTRIBUTION.md` there).

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
