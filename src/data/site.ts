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

/**
 * Projects, in display order. `thumb` is each public repo's
 * GitHub-hosted social preview (opengraph.githubassets.com — external
 * CDN, lazy-loaded, nothing committed to this repo). `liveUrl` is the
 * in-site tool page for the Routefinder; other projects link to their
 * repo only. No entry links anywhere it shouldn't: only public repos
 * get a GitHub link.
 */
export interface Project {
  name: string;
  tagline: string;
  thumb: string;
  liveUrl?: string;
  liveLabel?: string;
  repoUrl?: string;
  repoLabel?: string;
}

export const projects: Project[] = [
  {
    name: "Brighter Shores Routefinder",
    tagline: "Merchant route finder for Brighter Shores.",
    thumb: "https://opengraph.githubassets.com/1/Ravanger/brighter-shores-routefinder",
    liveUrl: "/tools/brighter-shores-routefinder",
    liveLabel: "Open the tool",
    repoUrl: "https://github.com/Ravanger/brighter-shores-routefinder",
    repoLabel: "GitHub",
  },
  {
    name: "OpenParty",
    tagline: "A flexible, modern, TypeScript-first framework for building party games.",
    thumb: "https://opengraph.githubassets.com/1/Ravanger/vibe-code-partygame-framework",
    repoUrl: "https://github.com/Ravanger/vibe-code-partygame-framework",
    repoLabel: "GitHub",
  },
  {
    name: "ESP32 desk gadget",
    tagline: "Multi-screen desk display: NTP clock, DHT11 temp and humidity, outdoor weather.",
    thumb: "https://opengraph.githubassets.com/1/Ravanger/esp32-desk-gadget",
    repoUrl: "https://github.com/Ravanger/esp32-desk-gadget",
    repoLabel: "GitHub",
  },
];

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
