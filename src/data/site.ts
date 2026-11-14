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
    "Boris Rossovsky. I make things — music, pedals, software, and whatever else ends up on the bench. This is where it all lives.",
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

/** Page navigation for the bottom bar (real pages, not anchors). */
export const siteNav = [
  { label: "Home", href: "/" },
  { label: "Art", href: "/art" },
  { label: "Music", href: "/music" },
  { label: "Projects", href: "/projects" },
  { label: "Tools", href: "/tools" },
];

/** Home page teasers (Workbench): index-numbered cards linking to sections.
 * `motif` picks the card's mark (see TeaserMotif): brush = art, wave =
 * music, nodes = projects, terminal = tools. */
export interface Teaser {
  index: string;
  label: string;
  href: string;
  description: string;
  motif: "brush" | "wave" | "nodes" | "terminal";
}

export const teasers: Teaser[] = [
  {
    index: "01",
    label: "Art",
    href: "/art",
    description: "Latest work — Instagram and TikTok first.",
    motif: "brush",
  },
  {
    index: "02",
    label: "Music",
    href: "/music",
    description: "From the Depths, SoundCloud, Newgrounds.",
    motif: "wave",
  },
  {
    index: "03",
    label: "Projects",
    href: "/projects",
    description: "Routefinder, OpenParty, desk gadget.",
    motif: "nodes",
  },
  {
    index: "04",
    label: "Tools",
    href: "/tools",
    description: "The Routefinder, running right here.",
    motif: "terminal",
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
  about: { eyebrow: "About", title: "Boris Rossovsky" },
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

/**
 * About page (/about). Copy approved by Boris 2026-11-14 (#10, v4 —
 * verbatim, do not rewrite). Ravanger is black metal; he does not draw;
 * art is old work only. The avatar is his GitHub avatar (external CDN,
 * never committed). Rig lines render each item's name in text colour
 * with the parenthetical note muted (see src/pages/about.astro).
 */
export const about = {
  avatarUrl: "https://avatars.githubusercontent.com/u/814853?v=4",
  avatarLabel: "U1 BORIS",
  paragraphs: [
    "I'm Boris. I play loud music, solder fuzz pedals, and write tools for games I play too much. This site is where it all ends up.",
    "Ravanger is the music: black metal, guitar and bass through more gain than is reasonable. There's one album, From the Depths, plus a pile of rough mixes and half-finished stuff on SoundCloud and Newgrounds.",
    "Away from the amp, I mess around with ESP32s, 3D printing, and party games that run on the TV and everyone's phones. I live in Toronto with two cats and drink too much coffee.",
  ],
  rig: [
    {
      label: "PLAYS",
      items: [
        { name: "Les Paul Studio", note: "Burstbuckers, coil split" },
        { name: "Epiphone Les Paul" },
        { name: "Dean Paramount bass", note: "maple fretboard, Classic Black" },
        { name: "Boss Katana 50 Gen 3" },
        { name: "Hotone Pulze Mini" },
        { name: "Behringer TO800" },
        { name: "M-VAVE FM-1" },
        { name: "Scarlett 2i2 + Reaper" },
      ],
    },
    {
      label: "BUILDS",
      items: [
        { name: "Klon Centaur clone" },
        { name: "Bazz Fuzz" },
        { name: "Fuzz Face clones" },
        { name: "ESP32 desk gadget" },
        { name: "ELEGOO Centauri Carbon 2" },
      ],
    },
    {
      label: "CODES",
      items: [
        { name: "OpenParty", note: "TypeScript" },
        { name: "Brighter Shores routefinder" },
        { name: "ESP32 firmware" },
        { name: "local LLM stack" },
      ],
    },
  ],
};

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
