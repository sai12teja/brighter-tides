/**
 * The template's own loading screen - a rotating ring around a centred mark
 * on white - with the Brighter Tides wave in place of the theme's hexagon.
 * The ring takes its colour from `--tj-color-theme-primary`, which is already
 * the brand teal, so nothing else needs restyling.
 *
 * The class names are a contract with the template's main.js and main.css:
 * `.preloader` is what main.js fades out on load, and `.loading` /
 * `#loading-icon` carry the ring and its centring.
 */
export default function Preloader() {
  return (
    <div className="preloader" role="status" aria-live="polite">
      <div className="loading-container">
        <div className="loading"></div>
        <div id="loading-icon">
          <img src="/assets/images/logos/brighter-tides-mark.png" alt="" width="256" height="256" />
        </div>
      </div>
      <span className="visually-hidden">Loading Brighter Tides</span>
    </div>
  );
}
