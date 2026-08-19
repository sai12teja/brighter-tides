/**
 * The loading screen.
 *
 * The class name `preloader` is a contract with the template's main.js, which
 * fades this element out on load (`$(".preloader").fadeOut(600)`) - everything
 * else here is ours.
 *
 * It is deliberately dark: the first thing behind it is the navy hero, so a
 * white panel would flash white, then dark, on every cold load. Holding the
 * brand's own navy means the preloader dissolves into the page rather than
 * cutting to it.
 */
export default function Preloader() {
  return (
    <div className="preloader bt-preloader" role="status" aria-live="polite">
      <div className="bt-preloader-inner">
        <img
          className="bt-preloader-logo"
          src="/assets/images/logos/brighter-tides-lockup-light.png"
          alt="Brighter Tides"
          width="875"
          height="172"
        />
        <div className="bt-preloader-rail" aria-hidden="true">
          <span></span>
        </div>
        <span className="visually-hidden">Loading Brighter Tides</span>
      </div>
    </div>
  );
}
