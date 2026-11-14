<script>
// Interactive island: category filter for the projects index. Owns only
// the active-button state; filtering itself toggles the `hidden`
// attribute on the server-rendered cards ([data-category] / [data-live]),
// so the grid shows everything with no JS. Categories come from the
// projects collection (first-appearance order); "Live" is a virtual
// filter that shows only projects with a live tool (data-live="true").
let { categories = [] } = $props();

let active = $state("All");

function matches(category, el) {
  if (category === "All") return true;
  if (category === "Live") return el.dataset.live === "true";
  return el.dataset.category === category;
}

function setFilter(category) {
  active = category;
  document.querySelectorAll("[data-category]").forEach((el) => {
    el.hidden = !matches(category, el);
  });
}
</script>

<div class="filter-row" role="group" aria-label="Filter projects by category">
  {#each ["All", ...categories, "Live"] as category}
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
