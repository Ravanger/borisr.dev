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
    "I make loud music, build pedals and gadgets, and write tools for games I play too much. Everything here came off the same messy bench.",
  footerNote: "This site sets no cookies and runs no analytics.",
  description: "Music, pedals, software, and whatever else ends up on the bench.",
  contactPrefix: "Reach me at",
  /**
   * Illustrated GitHub avatar, hotlinked from GitHub's CDN
   * (api.github.com/users/Ravanger -> avatar_url) — never committed.
   */
  avatarUrl: "https://avatars.githubusercontent.com/u/814853?v=4",
  avatarLabel: "U1 BORIS",
};

export const nav = [
  { label: "Home", href: "#top" },
  { label: "Art", href: "#art" },
  { label: "Music", href: "#music" },
  { label: "Projects", href: "#projects" },
  { label: "Tools", href: "#tools" },
  { label: "Contact", href: "#contact" },
];

/** Page navigation for the bottom bar (real pages, not anchors). */
export const siteNav = [
  { label: "Home", href: "/" },
  { label: "Art", href: "/art" },
  { label: "Music", href: "/music" },
  { label: "Projects", href: "/projects" },
  { label: "Tools", href: "/tools" },
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
    label: "ART",
    name: "Art",
    href: "/art",
    knobs: ["INK", "CHAOS"],
    line: "Old drawings, from the Instagram archive.",
    tint: "#16131a",
  },
  {
    label: "MUSIC",
    name: "Music",
    href: "/music",
    knobs: ["GAIN", "FUZZ"],
    line: "From the Depths. 10 tracks, 52 minutes.",
    tint: "#1a1212",
  },
  {
    label: "PROJECTS",
    name: "Projects",
    href: "/projects",
    knobs: ["SOLDER", "SCOPE"],
    line: "Routefinder, OpenParty, desk gadget.",
    tint: "#121712",
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
        "Grotesque + mono. Clash Display + Satoshi + JetBrains Mono, signal orange accent, index-numbered sections.",
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
  bandcampAlbumUrl: "https://ravanger.bandcamp.com/album/from-the-depths",
  soundcloudUrl: "https://soundcloud.com/ravanger",
  newgroundsUrl: "https://himenow.newgrounds.com/audio",
  moreAudioPrefix: "More audio on",
  moreAudioMiddle: "and",
  playersNote: "Players load from Bandcamp and SoundCloud.",
};

export const art = {
  instagramUrl: "https://www.instagram.com/ravanger666",
  instagramLabel: "Instagram",
  tiktokUrl: "https://www.tiktok.com/@ravanger666",
  tiktokLabel: "TikTok",
  feedLine: "New work lands on Instagram and TikTok first — this feed pulls from both.",
  tileCount: 6,
};

export const projectsMoreLine = "More coming — WitClash later.";

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
 * Instagram, TikTok, Bandcamp and SoundCloud live on their own pages
 * (/art, /music) — the footer keeps only GitHub.
 */
export const socials = [{ label: "GitHub", href: "https://github.com/Ravanger" }];

/**
 * Email is kept split so the plain address never appears in the HTML
 * source. The footer assembles it in JS (see SiteFooter).
 */
export const email = { user: "contact", domain: "borisr.dev" };
