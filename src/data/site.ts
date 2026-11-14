/**
 * Shared content for every design direction — the single source of truth
 * for all user-facing copy.
 *
 * Separation of concerns (hard rule):
 * - content/data lives HERE and nowhere else — components and pages never
 *   hardcode copy, links, or labels; they only render this data.
 * - design tokens (colors, type, spacing scale) live in src/styles/.
 * - presentational components live in src/components/.
 * - pages in src/pages/ are thin composition: import data + components.
 */

export const site = {
  name: "Boris Rossovsky",
  domain: "borisr.dev",
  tagline: "personal site",
  intro:
    "I make music, build pedals and gadgets, and write tools for games I play too much. Everything here is something I actually use.",
  footerNote: "This site sets no cookies and runs no analytics.",
  description: "Music, pedals, software, and whatever else ends up on the bench.",
  contactPrefix: "Reach me at",
};

export const nav = [
  { label: "Home", href: "#top" },
  { label: "Art", href: "#art" },
  { label: "Music", href: "#music" },
  { label: "Projects", href: "#projects" },
  { label: "Tools", href: "#tools" },
  { label: "Contact", href: "#contact" },
];

/** Page navigation for the bottom bar: the three real pages. Home is
 * the logo tap; Tools is folded into Projects (issue #19, decided) —
 * the Routefinder lives at /tools/brighter-shores-routefinder as a
 * bookmarked URL with no index page behind it, linked from its
 * project card. About was dropped by Boris 2026-11-14
 * (PR #27 closed unmerged) — there is no About page and nothing
 * links to one. */
export const siteNav = [
  { label: "Projects", href: "/projects" },
  { label: "Music", href: "/music" },
  { label: "Art", href: "/art" },
];

/** Home stompbox board (#16): one pedal per section, in signal-chain
 * order. `knobs` are the two decorative knob labels; `line` is the one
 * line of real content; `tint` is the pedal's dark enclosure colour
 * (fixed dark in both themes — pedals are hardware). */
export interface Pedal {
  label: string;
  name: string;
  href: string;
  knobs: [string, string];
  line: string;
  tint: string;
}

export const pedals: Pedal[] = [
  {
    label: "PROJECTS",
    name: "Projects",
    href: "/projects",
    knobs: ["SOLDER", "SCOPE"],
    line: "Routefinder, OpenParty, desk gadget.",
    tint: "#121712",
  },
  {
    label: "MUSIC",
    name: "Music",
    href: "/music",
    knobs: ["GAIN", "FUZZ"],
    line: "From the Depths. 11 tracks, 55 minutes.",
    tint: "#1a1212",
  },
  {
    label: "ART",
    name: "Art",
    href: "/art",
    knobs: ["INK", "CHAOS"],
    line: "Old drawings, from the Instagram archive.",
    tint: "#16131a",
  },
];

/** The /design index listing the three directions. */
export const designIndex = {
  eyebrow: "borisr.dev — redesign",
  heading: "Three design directions",
  intro:
    "Same content, three looks. Each has a dark/light toggle, dark by default. Pick the one that feels right and we iterate from there.",
  backLabel: "Back home",
  directions: [
    {
      id: "a",
      name: "A — Tube amp",
      href: "/design/a",
      description:
        "Warm serif. Fraunces + Inter + IBM Plex Mono, amber ochre accent, centered narrow column.",
    },
    {
      id: "b",
      name: "B — Instrument",
      href: "/design/b",
      description:
        "Matched family. Instrument Serif + Instrument Sans + IBM Plex Mono, steel blue accent, left-aligned with ruled section labels.",
    },
    {
      id: "c",
      name: "C — Workbench",
      href: "/design/c",
      description:
        "'Bench at 2am'. Big Shoulders Display + IBM Plex Sans + Departure Mono (self-hosted), phosphor accent, index-numbered sections.",
    },
  ],
};

export const sections = {
  art: { eyebrow: "Art", title: "Latest" },
  music: { eyebrow: "Music", title: "Music" },
  projects: { eyebrow: "Projects", title: "Projects" },
  tools: { eyebrow: "Tools", title: "Tools" },
};

export const music = {
  bandcampAlbumId: "3553260334",
  soundcloudUrl: "https://soundcloud.com/ravanger",
  newgroundsUrl: "https://himenow.newgrounds.com/audio",
  /**
   * "More noise" cards. One-liners only — no counts: the Newgrounds and
   * SoundCloud public pages don't expose a usable count (both blocked
   * the fetch on 2026-11-14), and counts are never guessed.
   */
  moreNoiseTitle: "More noise",
  moreNoise: [
    {
      label: "Bandcamp",
      icon: "bandcamp",
      blurb: "From the Depths — full-length demo album, 2015.",
      href: "https://ravanger.bandcamp.com/album/from-the-depths",
    },
    {
      label: "SoundCloud",
      icon: "soundcloud",
      blurb: "Latest tracks.",
      href: "https://soundcloud.com/ravanger",
    },
    {
      label: "Newgrounds",
      icon: "newgrounds",
      blurb: "Older stuff, game tracks, experiments.",
      href: "https://himenow.newgrounds.com/audio",
    },
  ],
};

export const art = {
  instagramUrl: "https://www.instagram.com/ravanger666",
  instagramLabel: "Instagram",
  tiktokUrl: "https://www.tiktok.com/@ravanger666",
  tiktokLabel: "TikTok",
  feedLine: "New work lands on Instagram and TikTok first — this feed pulls from both.",
  tileCount: 6,
};

export const projectsMoreLine = "More coming as they ship.";

export const tools = {
  path: "/tools/brighter-shores-routefinder",
  label: "Brighter Shores Routefinder",
  description: "Merchant route finder for Brighter Shores, running right here.",
  liveLabel: "Open the tool",
  directUrl: "https://brighter-shores-routefinder.netlify.app/",
  directLabel: "Open in a new tab",
  status: "Live",
  disclaimer: "Fan-made tool, not affiliated with Brighter Shores or its developers.",
};

/**
 * Footer socials: email is separate (JS-assembled, see SiteFooter).
 * All six profiles, rendered as icons in the footer. Bandcamp is the
 * profile origin of the album URL in `music` above.
 */
export const socials = [
  { label: "GitHub", href: "https://github.com/Ravanger" },
  { label: "Instagram", href: art.instagramUrl },
  { label: "TikTok", href: art.tiktokUrl },
  { label: "Bandcamp", href: "https://ravanger.bandcamp.com" },
  { label: "SoundCloud", href: music.soundcloudUrl },
  { label: "Newgrounds", href: music.newgroundsUrl },
];

/**
 * Email is kept split so the plain address never appears in the HTML
 * source. The footer assembles it in JS (see SiteFooter).
 */
export const email = { user: "contact", domain: "borisr.dev" };
