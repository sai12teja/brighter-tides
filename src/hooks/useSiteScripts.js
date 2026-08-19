import { useEffect, useState } from "react";

import { initSmoothScroll } from "../lib/smoothScroll";
import { claimVendorInitialised, protectVendorScrollTriggers } from "../lib/templateAnimations";

/**
 * Odometer (the fun-facts digit roll) auto-initialises from a
 * `DOMContentLoaded` listener it registers at parse time. These vendor
 * scripts are injected from a React effect, which runs long after
 * `DOMContentLoaded` has fired, so that listener never runs and the
 * `.odometer` spans are never upgraded - the numbers just sit at their
 * static value instead of counting up.
 *
 * `Odometer.init()` is the same public entry point the library's own
 * listener calls, so this reproduces the intended behaviour exactly. It
 * must run before main.js binds its `appear` handlers, so it is attached
 * to the odometer script itself rather than to the end of the queue.
 */
function initOdometer() {
  window.Odometer?.init?.();
}

// Order matters: jQuery must load before the plugins that extend it,
// and main.js must load last since it wires everything together.
const SCRIPTS = [
  "/assets/js/jquery.min.js",
  "/assets/js/bootstrap.bundle.min.js",
  "/assets/js/gsap.min.js",
  "/assets/js/gsap-scroll-to-plugin.min.js",
  "/assets/js/gsap-scroll-trigger.min.js",
  "/assets/js/gsap-split-text.min.js",
  // Lenis, not smooth-scroll.min.js - see lib/smoothScroll.js for why.
  "/assets/js/lenis.min.js",
  "/assets/js/appear.min.js",
  "/assets/js/wow.min.js",
  { src: "/assets/js/odometer.min.js", afterLoad: initOdometer },
  "/assets/js/jquery-knob.js",
  "/assets/js/swiper.min.js",
  "/assets/js/nice-select.js",
  "/assets/js/venobox.min.js",
  "/assets/js/meanmenu.js",
  "/assets/js/main.js",
];

/**
 * Appends every script at once instead of awaiting each one in turn.
 *
 * `async = false` on an injected script preserves *execution* order while
 * letting the browser fetch them all in parallel. Awaiting each load before
 * appending the next forced a strict request waterfall - fifteen sequential
 * round trips, with the preloader held over the page for all of it, because
 * main.js (the script that finally reveals the page) could not start
 * downloading until the fourteen before it had finished.
 *
 * Resolves once the last script has executed; with ordered execution that is
 * main.js, so callers can rely on the whole bundle being live.
 */
function loadScripts(entries) {
  return new Promise((resolve) => {
    let pending = entries.length;

    const settle = () => {
      pending -= 1;
      if (pending === 0) resolve();
    };

    if (pending === 0) {
      resolve();
      return;
    }

    entries.forEach((entry) => {
      const { src, afterLoad } = typeof entry === "string" ? { src: entry } : entry;

      if (document.querySelector(`script[src="${src}"]`)) {
        settle();
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.onload = () => {
        afterLoad?.();
        settle();
      };
      script.onerror = () => {
        console.error(new Error(`Failed to load script: ${src}`));
        settle();
      };
      document.body.appendChild(script);
    });
  });
}

/**
 * How long the loading screen stays up, measured from the start of the
 * navigation rather than from when this effect runs, so the splash lasts the
 * same length whatever the connection does. The bundle itself takes well
 * under a second, so on any decent connection this is the number that
 * decides how long the visitor waits.
 *
 * Worth knowing what it costs: this is time on a screen nobody can act on,
 * and it counts against Largest Contentful Paint. Set it to 0 to hand the
 * page over the moment it is ready.
 */
const MINIMUM_SPLASH_MS = 5000;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let initStarted = false;
// Survives remounts so a second consumer does not re-load the bundle.
let bundleReady = false;
const bundleWaiters = [];

/**
 * Resolves once the vendor bundle has run.
 *
 * Until it has, the page is laid out without the template's CSS-driven
 * sizing and with images still resolving, so it is far shorter than its
 * final height - sections that belong thousands of pixels down briefly sit
 * inside the viewport. Anything that triggers on "is this on screen?" has
 * to wait for this, or it fires against a layout that no longer exists a
 * moment later.
 */
export function whenBundleReady() {
  if (bundleReady) return Promise.resolve();
  return new Promise((resolve) => bundleWaiters.push(resolve));
}

/**
 * Loads the template's vendor bundle (jQuery + plugins + main.js) after
 * the React tree has mounted, so the DOM the scripts query for already
 * exists. main.js binds its preloader-fade and WOW-init logic to
 * `$(window).on("load", ...)` - but the real `load` event already fired
 * long before these scripts are injected, so it never fires again on its
 * own. We dispatch a synthetic `load` event once everything is loaded to
 * trigger that bound logic (this is what actually reveals the page: the
 * preloader is a fixed full-screen overlay, and any `.wow` element is
 * `opacity: 0` until WOW.js reveals it).
 */
export default function useSiteScripts() {
  const [ready, setReady] = useState(bundleReady);

  useEffect(() => {
    if (initStarted) {
      if (bundleReady) setReady(true);
      return;
    }
    initStarted = true;

    let cancelled = false;

    (async () => {
      await loadScripts(SCRIPTS);
      if (cancelled) return;

      // Before anything can resize the window: main.js binds a resize
      // handler that kills every ScrollTrigger on the page. See
      // lib/templateAnimations.
      protectVendorScrollTriggers();

      // `performance.now()` is milliseconds since the navigation started, so
      // this holds the splash for the remainder of its minimum - nothing at
      // all once the bundle is the slower of the two.
      await wait(Math.max(0, MINIMUM_SPLASH_MS - performance.now()));
      if (cancelled) return;

      // main.js fades the preloader out from its own `load` handler, so this
      // is the moment the page is handed over.
      window.dispatchEvent(new Event("load"));

      // main.js has now initialised every animation on this first page. This
      // stamps those elements as done, so the first refresh does not lay a
      // second tween, ScrollTrigger or SplitText over the top of each one.
      claimVendorInitialised();

      // After main.js, so GSAP and ScrollTrigger are registered and Lenis
      // can be added to the same ticker they run on.
      initSmoothScroll();
      bundleReady = true;
      bundleWaiters.splice(0).forEach((resolve) => resolve());
      setReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return ready;
}
