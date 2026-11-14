import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Project writeups — the per-project detail pages under /projects/*.
 * This is NOT a blog: no dates, no feed, no pagination, just writeups.
 * Content lives in src/content/projects/*.mdx; the slug is the filename.
 * The projects index reads this same collection (single source of
 * truth — the old site.ts projects array is gone).
 */
const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    category: z.enum(["Software", "Framework", "Hardware"]),
    order: z.number(),
    // Absolute URL or root-relative path under /public. Local files are
    // for small images only — heavy media stays external (each project's
    // own repo, referenced by URL).
    thumb: z.union([z.string().url(), z.string().startsWith("/")]),
    // Optional AVIF variant of the thumb for <picture> (`thumb` is the
    // fallback source). Same URL-or-local-path rule as `thumb`.
    thumbAvif: z.union([z.string().url(), z.string().startsWith("/")]).optional(),
    repoUrl: z.string().url(),
    liveUrl: z.string().optional(),
    liveLabel: z.string().optional(),
    directUrl: z.string().optional(),
    directLabel: z.string().optional(),
    // Card + detail spec sheet (issue #18). `status` drives the
    // silkscreen LED; `imageNote` marks the thumb as a placeholder
    // until the real asset lands.
    status: z.enum(["LIVE", "WIP", "ARCHIVED"]).default("WIP"),
    tech: z.array(z.string()).default([]),
    lang: z.string(),
    stack: z.string(),
    // OpenParty only: player range across its games (spec sheet row).
    players: z.string().optional(),
    imageNote: z.string().optional(),
  }),
});

export const collections = { projects };
