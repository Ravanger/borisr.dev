<script>
// Interactive island: dark/light theme toggle (dark is the default).
// The saved theme is applied before first paint by ThemeInit; this
// component only owns the toggle interaction. It renders a fixed-size
// icon button — sun to switch to light, moon to switch to dark — so
// toggling never shifts any layout. Styling comes from the theme
// tokens (.btn-toggle) — nothing color- or font-related lives here.
let light = $state(false);

$effect(() => {
  light = document.documentElement.classList.contains("light");
});

function toggle() {
  light = document.documentElement.classList.toggle("light");
  try {
    localStorage.setItem("borisr-theme", light ? "light" : "dark");
  } catch {
    // storage unavailable (private mode, etc.) — theme still toggles
  }
}
</script>

<button
  type="button"
  class="btn-toggle flex h-11 w-11 cursor-pointer items-center justify-center rounded-full"
  aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
  onclick={toggle}
>
  {#if light}
    <!-- Moon: click to go dark. -->
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  {:else}
    <!-- Sun: click to go light. -->
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 1v2" />
      <path d="M12 21v2" />
      <path d="M4.22 4.22l1.42 1.42" />
      <path d="M18.36 18.36l1.42 1.42" />
      <path d="M1 12h2" />
      <path d="M21 12h2" />
      <path d="M4.22 19.78l1.42-1.42" />
      <path d="M18.36 5.64l1.42-1.42" />
    </svg>
  {/if}
</button>
