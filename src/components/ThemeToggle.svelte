<script>
// Interactive island: dark/light theme toggle (dark is the default).
// The saved theme is applied before first paint by the inline script in
// DesignLayout's <head>; this component only owns the toggle interaction.
// Styling comes from the theme tokens (.btn-toggle, .mono) — nothing
// color- or font-related lives in here.
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
  class="btn-toggle mono rounded-full px-3 py-1 text-xs uppercase tracking-widest"
  aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
  onclick={toggle}
>
  {light ? "Dark" : "Light"}
</button>
