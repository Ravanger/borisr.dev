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

/** Page navigation for the bottom bar (real pages, not anchors).
 * Four items since the Tools fold (2026-11-14, issue #19): live tools
 * are a filter on /projects, and /tools/brighter-shores-routefinder
 * stays live as a bookmarked URL with no index page behind it. */
export const siteNav = [
  { label: "Home", href: "/" },
  { label: "Art", href: "/art" },
  { label: "Music", href: "/music" },
  { label: "Projects", href: "/projects" },
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
    href: "/projects?filter=live",
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
  bandcampAlbumUrl: "https://ravanger.bandcamp.com/album/from-the-depths",
  soundcloudUrl: "https://soundcloud.com/ravanger",
  newgroundsUrl: "https://himenow.newgrounds.com/audio",
  /**
   * From the Depths — real data from the public Bandcamp page
   * (ravanger.bandcamp.com/album/from-the-depths, read 2026-11-14):
   * 11 tracks, 55:27 total, released December 31, 2015. Track URLs are
   * the pages' own links; art is the Bandcamp CDN 1000px file
   * (a1251592280_10.jpg) — external only, never committed (issue #7).
   */
  album: {
    artist: "Ravanger",
    title: "From the Depths",
    year: 2015,
    released: "December 31, 2015",
    artUrl: "https://f4.bcbits.com/img/a1251592280_10.jpg",
    totalTime: "55:27",
    buyLabel: "Buy / stream on Bandcamp",
    downloadLabel: "Download",
    tracks: [
      {
        name: "Unseeing Eyes",
        duration: "02:41",
        url: "https://ravanger.bandcamp.com/track/unseeing-eyes",
      },
      {
        name: "From the Depths... (A Ritual of Blood)",
        duration: "07:20",
        url: "https://ravanger.bandcamp.com/track/from-the-depths-a-ritual-of-blood",
      },
      {
        name: "Hatred for Mankind",
        duration: "05:09",
        url: "https://ravanger.bandcamp.com/track/hatred-for-mankind",
      },
      {
        name: "Murder Thy Self",
        duration: "05:48",
        url: "https://ravanger.bandcamp.com/track/murder-thy-self",
      },
      {
        name: "Unnecessary",
        duration: "06:33",
        url: "https://ravanger.bandcamp.com/track/unnecessary",
      },
      {
        name: "Valhalla",
        duration: "03:27",
        url: "https://ravanger.bandcamp.com/track/valhalla",
      },
      {
        name: "Of Black Curtains and Pandemonium",
        duration: "03:01",
        url: "https://ravanger.bandcamp.com/track/of-black-curtains-and-pandemonium",
      },
      {
        name: "Chernobyl",
        duration: "04:03",
        url: "https://ravanger.bandcamp.com/track/chernobyl",
      },
      {
        name: "They Must Sleep, Or They Will Devour Us",
        duration: "09:06",
        url: "https://ravanger.bandcamp.com/track/they-must-sleep-or-they-will-devour-us",
      },
      {
        name: "Cold Comfort (A Prelude)",
        duration: "05:16",
        url: "https://ravanger.bandcamp.com/track/cold-comfort-a-prelude",
      },
      {
        name: "Solace",
        duration: "03:03",
        url: "https://ravanger.bandcamp.com/track/solace",
      },
    ],
  },
  /**
   * "More noise" cards. One-liners only — no counts: the Newgrounds and
   * SoundCloud public pages don't expose a usable count (both blocked
   * the fetch on 2026-11-14), and counts are never guessed.
   */
  moreNoiseTitle: "More noise",
  moreNoise: [
    {
      label: "Bandcamp",
      mark: "BC",
      blurb: "From the Depths — full-length demo album, 2015.",
      href: "https://ravanger.bandcamp.com/album/from-the-depths",
    },
    {
      label: "SoundCloud",
      mark: "SC",
      blurb: "Latest tracks.",
      href: "https://soundcloud.com/ravanger",
    },
    {
      label: "Newgrounds",
      mark: "NG",
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
 * Instagram, TikTok, Bandcamp and SoundCloud live on their own pages
 * (/art, /music) — the footer keeps only GitHub.
 */
export const socials = [{ label: "GitHub", href: "https://github.com/Ravanger" }];

/**
 * Email is kept split so the plain address never appears in the HTML
 * source. The footer assembles it in JS (see SiteFooter).
 */
export const email = { user: "contact", domain: "borisr.dev" };
