import type { Handler } from "@netlify/functions";

interface MediaItem {
  id: string;
  caption?: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

const json = (statusCode: number, body: unknown) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "public, s-maxage=900, max-age=300",
  },
  body: JSON.stringify(body),
});

/**
 * Instagram feed for /art: the latest 9 media items for @ravanger666.
 *
 * Token comes from the INSTAGRAM_TOKEN env var — a long-lived Instagram
 * Login token (see README for the setup: Creator/Business account,
 * Meta developer app, no Facebook Page needed). No token, or any API
 * failure, returns an empty list, never an error: the page falls back
 * to a note and the profile link, and the build never depends on it.
 */
export const handler: Handler = async () => {
  const token = process.env.INSTAGRAM_TOKEN;
  if (!token) {
    return json(200, { items: [] });
  }
  try {
    const url =
      "https://graph.instagram.com/me/media" +
      "?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp" +
      `&limit=9&access_token=${encodeURIComponent(token)}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.error("instagram feed: API error", res.status);
      return json(200, { items: [] });
    }
    const data = (await res.json()) as { data?: MediaItem[] };
    const items = (data.data ?? [])
      .map((m) => ({
        id: m.id,
        url: m.thumbnail_url ?? m.media_url,
        permalink: m.permalink,
        caption: m.caption ?? "",
        type: m.media_type,
      }))
      .filter((i) => i.url && i.permalink);
    return json(200, { items });
  } catch (err) {
    console.error("instagram feed: fetch failed", err);
    return json(200, { items: [] });
  }
};
