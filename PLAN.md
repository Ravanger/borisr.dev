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
- `/projects` — curated GitHub projects with one-line descriptions
  and repo + live links (WitClash, routefinder, scan-turntable,
  esp32-desk-gadget, canvas-glow, crystal-radio, …).
- `/tools/*` — hosted tools under borisr.dev, e.g.
  `/tools/brighter-shores-routefinder`. Each tool keeps its own repo
  and Netlify site; borisr.dev proxies via a 200 rewrite so the URL
  stays on borisr.dev. This supersedes the 2026-11-14 "keep the
  routefinder off borisr.dev for now" call — Boris asked for /tools/
  hosting in this redesign.
- `/contact` — email + socials. No form unless he wants one.
- No blog unless he asks for one.

## Stack (proposed)

- **Astro 5 + TypeScript (strict) + Tailwind CSS v4 + MDX content
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
- **Tools proxy**: `netlify.toml` 200 rewrites, e.g.
  `/tools/brighter-shores-routefinder/*` ->
  `https://brighter-shores-routefinder.netlify.app/:splat`.
  Each tool deploys independently from its own repo.
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
- Projects: Routefinder only for now (most public-facing). WitClash later.
- No blog.
- Tools path: Wilson's judgment -> `/tools/brighter-shores-routefinder`.
- Dark + light themes, default dark. New palette, restrained, not
  overwhelming. Simple with good UX, not minimalism.
- Typefaces: a nice matched set (chosen per design direction).
- Contact: email link only, behind bot protection (JS-assembled mailto).
- No analytics, no cookies. Tools pages get a disclaimer when needed
  (e.g. routefinder fan-tool / unofficial note if applicable).
- Stack: Astro 5 + TS strict + Tailwind v4 + MDX (proposed, no veto —
  proceed; Boris can veto at directions review).
