import { useEffect, useState } from "react";

/**
 * The template's own loading screen - a rotating ring around a centred mark
 * on white - with the Brighter Tides wave in place of the theme's hexagon.
 *
 * It used to be dismissed by main.js, whose `$(window).on("load")` handler
 * fades `.preloader` out - and that handler only runs once every vendor
 * script has downloaded and executed. On a throttled phone that is around
 * six seconds of white, and it lands directly on Largest Contentful Paint:
 * the hero photograph was arriving in 14ms and then sitting behind this
 * overlay for six seconds, which Lighthouse reports as render delay.
 *
 * So the screen owns its own life now. React knows when it has rendered the
 * page - that is the only thing the visitor is waiting for - and the vendor
 * bundle arrives afterwards to animate what is already on screen. main.js
 * still calls `fadeOut` on `.preloader` when it lands; by then there is
 * nothing matching, which is exactly right.
 *
 * The class names are a contract with the template's main.css: `.loading`
 * and `#loading-icon` carry the ring and its centring.
 */

/**
 * How long the mark is held, measured from the start of the navigation so it
 * lasts the same whatever the connection does. Long enough to read as
 * deliberate, short enough that it is over before the hero would have
 * painted anyway.
 */
const MINIMUM_SPLASH_MS = 400;
const FADE_MS = 400;

export default function Preloader() {
  const [state, setState] = useState("visible");

  useEffect(() => {
    // `performance.now()` is time since the navigation began, so a slow
    // bundle spends the splash rather than adding to it.
    const remaining = Math.max(0, MINIMUM_SPLASH_MS - performance.now());
    const fade = setTimeout(() => setState("fading"), remaining);
    const done = setTimeout(() => setState("gone"), remaining + FADE_MS);

    return () => {
      clearTimeout(fade);
      clearTimeout(done);
    };
  }, []);

  if (state === "gone") return null;

  return (
    <div
      className={`preloader${state === "fading" ? " bt-preloader-out" : ""}`}
      role="status"
      aria-live="polite"
    >
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
