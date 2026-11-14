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
  { label: "Contact", href: "/contact" },
];

/** Placeholder home page (/) until a direction is chosen. */
export const placeholder = {
  heading: "Boris Rossovsky",
  body: "The site is being rebuilt from scratch. Meanwhile, the new design is taking shape:",
  linkLabel: "See the three design directions",
};

/** The /design index listing the three directions. */
export const designIndex = {
  eyebrow: "borisr.dev — redesign",
  heading: "Three design directions",
  intro:
    "Same content, three looks. Each has a dark/light toggle, dark by default. Pick the one that feels right and we iterate from there.",
  backLabel: "Back to the placeholder home",
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

export const project = {
  name: "Brighter Shores Routefinder",
  tagline: "Merchant route finder for Brighter Shores.",
  liveUrl: "https://brighter-shores-routefinder.netlify.app/",
  liveLabel: "Open the tool",
  repoUrl: "https://github.com/Ravanger/brighter-shores-routefinder",
  repoLabel: "GitHub",
  moreLine: "More coming — WitClash later.",
};

export const tools = {
  path: "/tools/brighter-shores-routefinder",
  label: "Brighter Shores Routefinder",
  livesAt: "Lives at",
  comingLabel: "coming with the new site",
};

export const socials = [
  { label: "GitHub", href: "https://github.com/Ravanger" },
  { label: "Instagram", href: "https://www.instagram.com/ravanger666" },
  { label: "TikTok", href: "https://www.tiktok.com/@ravanger666" },
  { label: "Bandcamp", href: "https://ravanger.bandcamp.com" },
  { label: "SoundCloud", href: "https://soundcloud.com/ravanger" },
];

/**
 * Email is kept split so the plain address never appears in the HTML
 * source. The footer assembles it in JS (see SiteFooter).
 */
export const email = { user: "contact", domain: "borisr.dev" };
