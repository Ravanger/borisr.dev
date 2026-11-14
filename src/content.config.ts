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
    thumb: z.string().url(),
    repoUrl: z.string().url(),
    liveUrl: z.string().optional(),
    liveLabel: z.string().optional(),
    directUrl: z.string().optional(),
    directLabel: z.string().optional(),
  }),
});

export const collections = { projects };
