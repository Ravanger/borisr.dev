<script>
// Interactive island: category filter for the projects index. Owns only
// the active-button state; filtering itself toggles the `hidden`
// attribute on the server-rendered cards ([data-category]), so the grid
// shows everything with no JS. No URL params, no reload. Categories
// come from the projects collection (first-appearance order).
let { categories = [] } = $props();

let active = $state("All");

function setFilter(category) {
  active = category;
  document.querySelectorAll("[data-category]").forEach((el) => {
    el.hidden = category !== "All" && el.dataset.category !== category;
  });
}
</script>

<div class="filter-row" role="group" aria-label="Filter projects by category">
  {#each ["All", ...categories] as category}
    <button
      type="button"
      class="filter-btn"
      aria-pressed={active === category}
      onclick={() => setFilter(category)}
    >
      {category}
    </button>
  {/each}
</div>
