# borisr.dev — redesign plan

Rebuild from scratch. The current site is a Gatsby 2 college portfolio
(last deploy Aug 2022); the new site is Boris's personal hub as he is now:
self-employed C++ engineer, guitarist/bassist, DIY electronics + 3D printing,
open-source builder. Not a design portfolio, not a corporate resume.

## What the old site was (studied 2026-11-14)

- Repo `Ravanger/Personal-website_src` (Gatsby 2, React 16, Emotion 10,
  MDX 1, Preact, PureCSS). Hand-coded, 960px max-width, Roboto,
  accent `#5a9c88` (teal-green, also the PWA theme color), black links.
- 9 MDX posts in `content/posts` (2020, college-era): 3D Steampunk Chess,
  3D Gramophone, GBC NEXT, Icons, Motion Preloader, Orbital Ordnance,
  Restoration, Vector Gameboy, Myrtle Murder video.
- Pages: home (paginated, 5/page), visual, audio, contact, tags, 404.
  Plugins include a dead Instagram source and Google Fonts.
- Live site is behind the repo: last push Jun 2023, last Netlify deploy
  Aug 2022. Verify before assuming what deploys.
- The other iteration, `Ravanger/personal-website-nextjs` (Next 12,
  React 17, TS, framer-motion, Vercel), has no pages/ or components/
  committed — config + data + assets only. Salvageable from it:
  `data/Art/art.ts` (5 Inktober 2021 videos, 3 Blender52 renders,
  Nick's House, all with Instagram links), `data/Home/clients.ts`
  (Alden, Emergent, George Brown), `data/Home/skills.ts`
  (React, Node, TS, Sass, Blender, Adobe). Its `aboutme.ts` is lorem
  ipsum — no real bio exists anywhere yet.

## Site map (one idea per page, no info dumps)

- `/` Home — who he is in one screen, links to everything, latest thing.
- `/about` — short bio, current work, current skills, clients.
- `/art` — archive, framed as such ("things I made, 2019–2021").
  The 9 Gatsby posts + Inktober videos + Blender52 renders.
- `/music` — Ravanger (Bandcamp), guitar + pedal builds, FM-1.
  Links first; embeds only where they earn their place.
- `/projects` — curated GitHub projects with one-line descriptions,
  thumbnails and detail pages (`/projects/*`, one MDX file per
  project): Routefinder, OpenParty, ESP32 desk gadget.
- `/tools/*` — the Routefinder, embedded in a full-height iframe on a
  real borisr.dev page (`/tools/brighter-shores-routefinder`), so the
  site chrome stays visible. No proxy: the app is a Vite build with
  base "./" whose relative assets 404 under a subpath.
- No `/contact` page (removed 2026-11-14) — the footer is the contact
  point: JS-assembled email + GitHub only.
- No blog unless he asks for one.

## Stack (proposed)

- **Astro 7 + Svelte islands + TypeScript (strict) + Tailwind CSS v4 + MDX content
  collections**, hosted on Netlify.
  - Why Astro: content-first static site; typed frontmatter via
    content collections (zod schemas) for art/music/projects;
    React islands only where something is actually interactive;
    zero JS by default; Tailwind v4 theme in CSS = design tokens
    in code; Netlify adapter + deploy previews.
  - Alternative if he vetoes: Next.js App Router. He knows Next,
    but it's heavier than this site needs and its content-collection
    story is worse. Astro is the pick; Next is the fallback.
- **Design tokens first**: colors, type scale, spacing, radii in the
  Tailwind theme (`@theme` in CSS). Tokens are the design file.
- **Content as data**: `src/content/{art,music,projects}/` MDX +
  schema. Adding a project = one MDX file. No code changes.
- **Tools embedded, not proxied**: the Routefinder runs in a
  full-height iframe on `/tools/brighter-shores-routefinder`, at its
  own root (its Vite base "./" breaks under a subpath). Each tool
  deploys independently from its own repo.
- **Old URLs preserved**: old post slugs (`/3d-steampunk-chess`, …)
  redirect to the new art archive URLs. Backlinks don't die.
- **Quality gates**: Biome (lint+format, already his standard in
  WitClash), `tsc --noEmit`, build in GitHub Actions CI,
  Netlify deploy preview per PR. Node 22 LTS, pnpm.
- **Repo conventions**: README (architecture, how to run, how to add
  content), conventional commits, small commits, squash on merge,
  docs in `docs/` for decisions that need a record.

## Design (anti-generic)

- No template tropes: no purple gradients, no glassmorphism, no
  generic bento grids, no stock hero imagery, no Inter-everywhere.
- Ground it in his actual history: the old site's `#5a9c88` teal is a
  candidate thread to carry forward (his color since 2019), or a new
  palette — his call. Typography: a real pairing, picked deliberately.
- Dark mode: his call (he lives in dark IDEs and works at 5am).
- Motion restrained. One idea per page, generous whitespace.
- Process: design in code. Tokens + components, live Netlify preview
  URLs to review against. Iterate on real pages, not screenshots.

## Design tooling (the "OpenSCAD for UI" question)

- **Penpot** (MPL-2.0, FOSS Figma): browser-based, self-hostable,
  layouts are real CSS Flex/Grid, native W3C design tokens that
  export to JSON/CSS, Inspect gives usable CSS/HTML/SVG, plugin
  system, MCP server (an agent can read the files). Use it if he
  wants a visual canvas before code.
- **Onlook** (Apache-2.0, local-first): visual editor that edits the
  actual Next.js + Tailwind code. Closest to "OpenSCAD for UI" —
  the code is the source of truth, the canvas manipulates it.
  Pairs with Next, not Astro.
- **Recommendation: design in code.** Tokens + components + preview
  deploys are the render loop; the code *is* the design file.
  Penpot is the fallback if he wants to mock up visually first.
  Puck/GrapesJS are page-builder embeds — wrong tool for a
  personal site, not recommended.

## Phases

0. Repo + this plan + profile questions answered. (now)
1. Design directions: tokens + 2–3 home-page directions as live
   previews. Iterate until one feels like his, not a template.
2. Scaffold: Astro + Tailwind + content collections + CI + Netlify
   link. Deploy previews on.
3. Content migration: Gatsby posts -> art collection; Inktober /
   Blender art; music page; projects page.
4. Tools proxy: `/tools/brighter-shores-routefinder` rewrite + tools
   index page.
5. Polish + launch: redirects, SEO/sitemap, launch cleanup (remove
   the stale `www.borisr.dev` custom-domain claim from
   `Ravanger.github.io` — it caused the Nov 14 cert mess),
   re-point the Netlify `borisr` site at this repo. Old deploy stays
   in Netlify history as rollback.

## Open questions

See the profile questions in chat (2026-11-14). Blocking ones:
stack confirm (Astro vs Next), dark/light, keep the teal or new
palette, which projects/tools, art scope, contact/socials.

## Decisions (2026-11-14, Boris)

- Design in code; stage on Netlify (separate staging site, swap domains
  at launch).
- Intro copy: Wilson writes it "like an old friend", brief. Draft:
  "Boris Rossovsky. I make things — music, pedals, software, and
  whatever else ends up on the bench. This is where it all lives."
- Purpose: showcase of his stuff, not for getting work. Just his corner
  of the internet.
- No photo of Boris. No occupation listed. No personal overshare, no
  "skills" bulleted list. Hobbies, art, music, projects only.
- Art: old pictures NOT kept. Integrate Instagram / TikTok feed that
  auto-updates if feasible (research pending — see below).
- Music: Ravanger Bandcamp album "From the Depths"
  (ravanger.bandcamp.com/album/from-the-depths), Newgrounds audio
  (himenow.newgrounds.com/audio), SoundCloud (soundcloud.com/ravanger).
  Embed players where available.
- Projects: Routefinder, OpenParty, ESP32 desk gadget (round 3).
  WitClash later. Scan turntable, Canvas Glow and crystal radio are
  out — not built / not showcaseable yet.
- No blog.
- Tools path: Wilson's judgment -> `/tools/brighter-shores-routefinder`.
- Dark + light themes, default dark. New palette, restrained, not
  overwhelming. Simple with good UX, not minimalism.
- Typefaces: a nice matched set (chosen per design direction).
- Contact: no contact page (removed 2026-11-14). The footer is the
  contact point: email link only, behind bot protection (JS-assembled
  mailto), plus GitHub. Instagram, TikTok, Bandcamp and SoundCloud
  live on their own pages (/art, /music), not in the footer.
- No analytics, no cookies. Tools pages get a disclaimer when needed
  (e.g. routefinder fan-tool / unofficial note if applicable).
- Stack: Astro 7 + Svelte islands + TS strict + Tailwind v4 + MDX (proposed, no veto —
  proceed; Boris can veto at directions review).
- Stack confirmed (2026-11-14): Astro 7 + Svelte islands (interactive
  components in Svelte 5, static content in Astro). SvelteKit was
  considered and passed over: app-first model, ships runtime JS per
  page; Astro's content-first model + typed collections fit a showcase
  site, and Svelte is already in his stack via WitClash.
- Media policy (2026-11-14): no heavy media hosted in the repo — no
  images/video/audio committed. Art comes from the social feeds'
  CDNs, not the repo. Thumbnails only if needed as lazy-loading
  placeholders that can't be generated dynamically, kept tiny.
- Commits (2026-11-14): separate commits for separate features as you
  build — one commit per feature, never bundle unrelated changes.
- Principles (2026-11-14, Boris, high importance): separation of
  concerns and history. Code: content/data, tokens, components, pages
  strictly separate. History: the commit log is a record — one commit
  per feature, descriptive conventional-commit messages, never amend /
  rebase / force-push pushed commits, never squash distinct features
  together; fix mistakes with a new commit on top.

## Decisions — direction + nav (2026-11-14, Boris)
- Direction C (Workbench) chosen. A and B stay at /design/* as reference.
- Theme — 'bench at 2am' (2026-11-14, issue #14): phosphor #8CFF6A
  accent, LED red live-only, amber rare; Big Shoulders Display 800
  headings, IBM Plex Sans body, Departure Mono labels — all self-hosted
  woff2; light stays as a daylight/datasheet mode. OG image skipped:
  it needs the hand-drawn wordmark, which doesn't exist yet.
- Site split into real pages (no everything-on-one-page): /, /art,
  /music, /projects, /tools. Home stays light (hero + stompbox board).
- Nav: ONE fixed bottom bar, OS-taskbar vibe, on every page, with
  active-page state. Mobile responsive. Plus a fixed top-left home
  link ("borisr.dev" -> /) on every page, mirroring the toggle.
- Theme toggle: separate fixed button (top-right), real <button>,
  sun/moon icon for the mode it switches to, fixed size, cursor:pointer
  — toggling must not shift any layout.
- Grid discipline: everything sits on the Workbench grid.
- Bandcamp player taller via its natural large layout (art + tracklist),
  never stretched with CSS.
- Tools embedded, not proxied: the Routefinder opens in a full-height
  iframe on `/tools/brighter-shores-routefinder` (see "Round 3" below
  for why the proxy failed).

## Design inspo — jonnykreell.dev (2026-11-14, Boris's buddy)
- CV vibe not needed; design language only, nothing copied.
- Borrow: tick-and-rule section headers (accent tick + hairline to the
  edge); node-and-connector rows (discs + hairlines + elbows) for
  project/tool entries; mono-for-labels/nav + sans-for-reading with
  wide tracking; minimal geometric nav state markers (bar = current,
  dot = hover); restrained purposeful motion (hairlines drawing in,
  subtle hover lift, short cross-fade).
- Do not borrow: empty left column; decorative (non-nav) bottom strip;
  total lack of hover feedback; low contrast. No light mode or mobile
  story on his site — both are ours to design.

## Workflow — bundle changes in PRs (2026-11-14, Boris)
- Work on branches; bundle changes into PRs against main. Do not push
  straight to main — every main push triggers a Netlify production
  build, and per-commit pushes overwhelm it.
- Netlify builds a deploy preview per PR; production deploys on merge.
- Squash on merge (his WitClash norm). One commit per feature on the
  branch; never amend / rebase / force-push pushed commits.

## Round 3 (2026-11-14, Boris)
- Projects page: Routefinder, OpenParty, ESP32 desk gadget — each with
  a thumbnail (the repo's GitHub social preview, external CDN,
  lazy-loaded) and a detail page (`/projects/*`, one MDX file per
  project in `src/content/projects/`, no blog). Scan turntable, Canvas
  Glow and crystal radio are out (not built / not showcaseable yet).
  Index cards link to the detail page first, GitHub second. Filter:
  All / Software / Framework / Hardware (Svelte island, client-side).
- Routefinder embedded, proxy removed: the proxy served HTML (200)
  but the app was blank — the Vite build uses base "./", so without a
  trailing slash its relative JS/CSS resolved against /tools/ and
  404'd, and its router assumes site root. The fix is a full-height
  iframe on a real borisr.dev page, where the app runs at its own
  root; the proxy rewrite is gone, no trailing-slash redirect.
- Contact page removed; footer = JS-assembled email + GitHub only.
- Home hero + stompbox board: hero is the typeset name in a placeholder
  slot for the hand-drawn wordmark (Boris draws it later), corrected
  intro, GitHub-CDN avatar; the board is 3 pedals (Art / Music /
  Projects) with knob labels, one-line summaries, footswitch + LED,
  patch-cable signal chain IN → ART → MUSIC → PROJECTS → OUT.
- Nav wordmark horizontal (explicit in the tokens; no vertical
  styling ever existed — the rule makes the reading unambiguous).
  Top-left home link ("borisr.dev" -> /) on every page, mirroring
  the toggle; on /design/* the header name links home instead.
- Instagram live feed on /art: last 9 photos via a Netlify function
  (`/.netlify/functions/instagram`) calling the Instagram API with
  the `INSTAGRAM_TOKEN` env var; images from Instagram's CDN,
  lazy-loaded. No token yet — the function returns an empty list and
  the page falls back to a note + the profile link. Setup (Boris):
  Creator/Business account, Meta developer app, Instagram Login,
  long-lived token, set as `INSTAGRAM_TOKEN` on the borisr-redesign
  Netlify site. No Facebook Page needed, no paid widget.
- Desk gadget detail page has a CAD-files section: no CAD files in
  its repo yet, so it notes they are coming (later step).
