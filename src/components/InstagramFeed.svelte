<script>
// Interactive island: the Instagram feed on /art. Fetches the latest
// photos from the Netlify function (/.netlify/functions/instagram) and
// renders them in a grid; while loading it shows placeholder tiles, and
// when the feed is empty (no token yet, or any failure) it shows a
// short note instead — never a crash, never a blank page. Images load
// from Instagram's CDN, lazy-loaded, nothing committed to the repo. Each
// photo blur-ups into focus as its bytes arrive (see use:loaded).
// Styling comes from the theme tokens (.insta-grid, .insta-tile).
let { placeholderCount = 6 } = $props();

// Blur-up: flip .is-loaded once the image has pixels, so CSS can resolve
// it from blurred to sharp. Handles cached images that are already
// complete before this action runs.
function loaded(node) {
  if (node.complete && node.naturalWidth > 0) {
    node.classList.add("is-loaded");
  } else {
    node.addEventListener("load", () => node.classList.add("is-loaded"), { once: true });
  }
}

let state = $state("loading");
let items = $state([]);

async function load() {
  try {
    const res = await fetch("/.netlify/functions/instagram");
    if (!res.ok) throw new Error("feed failed");
    const data = await res.json();
    items = (data.items ?? []).filter((item) => item.url);
    state = items.length ? "ready" : "empty";
  } catch {
    state = "empty";
  }
}

$effect(() => {
  load();
});
</script>

{#if state === "loading"}
  <div class="insta-grid" aria-label="Loading Instagram photos">
    {#each Array(placeholderCount) as _}
      <div class="tile aspect-square" role="img" aria-label="Photo placeholder"></div>
    {/each}
  </div>
{:else if state === "ready"}
  <div class="insta-grid">
    {#each items as item}
      <a
        href={item.permalink}
        target="_blank"
        rel="noopener"
        class="insta-tile"
        aria-label={item.caption || "Instagram photo"}
      >
        <img
          src={item.url}
          alt={item.caption || "Instagram photo"}
          loading="lazy"
          decoding="async"
          use:loaded
        />
      </a>
    {/each}
  </div>
{:else}
  <p class="insta-note muted text-sm leading-relaxed">
    The live feed lights up once Instagram is connected. Until then, the
    profile link below has the latest.
  </p>
{/if}
