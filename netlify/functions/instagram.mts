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
 * Token comes from the INSTAGRAM_TOKEN env var — a system-user access
 * token generated in the Meta app's "API setup with Unified login" (see
 * README). Those tokens only answer graph.facebook.com, so the account id
 * is resolved via /me/assigned_instagram_accounts and media fetched from
 * /{account-id}/media. No token, or any API failure, returns an empty
 * list, never an error: the page falls back to a note and the profile
 * link, and the build never depends on it.
 */
export const handler: Handler = async () => {
  const token = process.env.INSTAGRAM_TOKEN;
  if (!token) {
    return json(200, { items: [] });
  }
  try {
    const auth = `access_token=${encodeURIComponent(token)}`;
    const accRes = await fetch(
      `https://graph.facebook.com/v27.0/me/assigned_instagram_accounts?${auth}`,
    );
    if (!accRes.ok) {
      console.error("instagram feed: account lookup failed", accRes.status);
      return json(200, { items: [] });
    }
    const acc = (await accRes.json()) as { data?: Array<{ id: string }> };
    const accountId = acc.data?.[0]?.id;
    if (!accountId) {
      console.error("instagram feed: no assigned instagram account");
      return json(200, { items: [] });
    }
    const url =
      `https://graph.facebook.com/v27.0/${accountId}/media` +
      "?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp" +
      `&limit=9&${auth}`;
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
