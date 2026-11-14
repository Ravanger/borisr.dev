<script>
// Interactive island: category filter for the projects index. Owns only
// the active-button state; filtering itself toggles the `hidden`
// attribute on the server-rendered cards ([data-category] / [data-live]),
// so the grid shows everything with no JS. Categories come from the
// projects collection (first-appearance order); "Live" is a virtual
// filter that shows only projects with a live tool (data-live="true").
//
// The filter syncs to the URL (?filter=<category>, lowercased) without
// a page reload: selecting a filter pushStates the URL, the param is
// read on load so links are shareable, and back/forward (popstate)
// updates the filter. "All" clears the param (plain /projects).
import { onMount } from "svelte";

let { categories = [] } = $props();

const options = ["All", ...categories, "Live"];

function categoryOf(value) {
  return options.find((c) => c.toLowerCase() === value) ?? "All";
}

function readFilterFromUrl() {
  if (typeof window === "undefined") return "All";
  const value = new URLSearchParams(window.location.search).get("filter");
  return value ? categoryOf(value) : "All";
}

let active = $state(readFilterFromUrl());

function matches(category, el) {
  if (category === "All") return true;
  if (category === "Live") return el.dataset.live === "true";
  return el.dataset.category === category;
}

function applyFilter(category) {
  document.querySelectorAll("[data-category]").forEach((el) => {
    el.hidden = !matches(category, el);
  });
}

function writeUrl(category) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (category === "All") url.searchParams.delete("filter");
  else url.searchParams.set("filter", category.toLowerCase());
  const next = `${url.pathname}${url.search}${url.hash}`;
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (next !== current) window.history.pushState(null, "", next);
}

function setFilter(category) {
  active = category;
  applyFilter(category);
  writeUrl(category);
}

onMount(() => {
  // Apply the URL param on load (server render shows everything).
  applyFilter(active);
  const onPopState = () => {
    const next = readFilterFromUrl();
    if (next !== active) {
      active = next;
      applyFilter(next);
    }
  };
  window.addEventListener("popstate", onPopState);
  return () => window.removeEventListener("popstate", onPopState);
});
</script>

<div class="filter-row" role="group" aria-label="Filter projects by category">
  {#each options as category}
    <button
      type="button"
      class="filter-btn"
      aria-pressed={active === category}
      onclick={() => setFilter(category)}
    >
      <span class="filter-jack" aria-hidden="true"></span>
      {category}
    </button>
  {/each}
</div>
