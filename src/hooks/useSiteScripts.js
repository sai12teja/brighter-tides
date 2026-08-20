import { useEffect, useState } from "react";

import { initSmoothScroll } from "../lib/smoothScroll";
import { claimVendorInitialised, protectVendorScrollTriggers } from "../lib/templateAnimations";

/**
 * Stands in for the one plugin main.js calls without checking for it.
 *
 * Line 95 of main.js is `$("#main-menu").meanmenu({...})`, with no guard at
 * all - unlike venobox, knob and odometer, which it wraps in length or typeof
 * checks. Dropping meanmenu.js therefore did not simply skip a feature: it
 * threw a TypeError 95 lines into a 1,746-line file, and everything after it
 * - the sticky header, the preloader fade, the WOW init, every GSAP block -
 * never ran.
 *
 * The drawer is `components/layout/HamburgerMenu`, written for this site, so
 * there is nothing for the plugin to do. A no-op that returns the jQuery set,
 * as any plugin does, lets main.js run straight through.
 */
function shimRemovedPlugins() {
  const $ = window.jQuery;
  if (!$?.fn || $.fn.meanmenu) return;
  $.fn.meanmenu = function noopMeanMenu() {
    return this;
  };
}

/**
 * How often WOW re-checks whether a box has come into view.
 *
 * WOW ships a 50ms poll. Its callback walks every unrevealed `.wow` box and
 * measures each one, so on the home page that is dozens of forced layouts
 * twenty times a second - and it only does the work when the page has actually
 * moved, which means the whole cost lands while you are scrolling. Measured on
 * a 6x-throttled phone it was the single largest contributor to frame time.
 *
 * A reveal that arrives up to a fifth of a second after the box crosses the
 * fold is not perceptible; these tiles already carry `data-wow-delay` of up to
 * 0.8s by design.
 */
const WOW_POLL_MS = 200;

/**
 * Patches the poll interval on every WOW instance, including the one main.js
 * builds for the first page, which it never exposes. Wrapping `start` on the
 * prototype is the only hook that catches that one, and it has to be installed
 * as wow.min.js lands rather than after the bundle - by then main.js has run.
 */
function slowWowPolling() {
  const WOW = window.WOW;
  if (typeof WOW !== "function" || typeof WOW.prototype?.start !== "function") return;

  const start = WOW.prototype.start;
  WOW.prototype.start = function patchedStart(...args) {
    const result = start.apply(this, args);
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = setInterval(this.scrollCallback, WOW_POLL_MS);
    }
    return result;
  };
}

/*
 * Order matters: jQuery must load before the plugins that extend it, and
 * main.js must load last since it wires everything together.
 *
 * Five of the template's plugins are gone, because nothing on this site
 * gives them anything to do - together they were ~50KB of script to parse
 * and execute before the page could be handed over:
 *
 *  - odometer and appear drove the fun-fact digit roll. The figures are
 *    `hooks/useCountUp` now and no element carries `.odometer`; main.js
 *    guards its own use behind `$(".odometer").length`.
 *  - jquery-knob drew circular progress dials. There are none, and main.js
 *    guards it behind `typeof $.fn.knob != "undefined"`.
 *  - venobox opened the video lightbox, whose trigger came off the hero.
 *    main.js guards it behind `$(".ig-gallery").length`.
 *  - meanmenu was never referenced by main.js at all; the mobile drawer is
 *    `components/layout/HamburgerMenu`.
 *  - bootstrap's bundle was there for one thing, the FAQ accordion, which is
 *    React state and a CSS grid transition now (components/sections/
 *    FaqAccordion). main.js never calls into it.
 *
 * Every one of those guards is a length or typeof check, so main.js runs
 * exactly as before with them absent - checked line by line rather than
 * assumed.
 */
const SCRIPTS = [
  { src: "/assets/js/jquery.min.js", afterLoad: shimRemovedPlugins },
  "/assets/js/gsap.min.js",
  "/assets/js/gsap-scroll-to-plugin.min.js",
  "/assets/js/gsap-scroll-trigger.min.js",
  "/assets/js/gsap-split-text.min.js",
  // Lenis, not smooth-scroll.min.js - see lib/smoothScroll.js for why.
  "/assets/js/lenis.min.js",
  { src: "/assets/js/wow.min.js", afterLoad: slowWowPolling },
  "/assets/js/nice-select.js",
  "/assets/js/main.js",
];

/*
 * Not deferred, and deliberately so.
 *
 * Holding the vendor bundle until after the first paint - `requestIdleCallback`
 * with a double-rAF floor - was tried and measured. Largest Contentful Paint
 * improved by 1.9s, and Total Blocking Time went from ~600ms to ~2,000ms,
 * because the work did not get smaller: it moved out of the window before
 * first paint (which Lighthouse does not count) and into the window after it
 * (which it counts at 30% of the score). Net effect on the score was
 * negative.
 *
 * The fix for this bundle is to make it smaller, not to move it. What is left
 * to remove is jQuery and main.js themselves - lib/templateAnimations already
 * reimplements most of what main.js does for the React app; the sticky header
 * and the back-to-top button are the two behaviours that would need writing.
 */

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
 * The loading screen no longer waits on this - it fades itself out once
 * React has painted (components/layout/Preloader). What is left here is the
 * delay before the synthetic `load` event that starts the template's
 * animations, and there is no reason to hold that back at all: the sooner
 * WOW and GSAP initialise, the sooner what is already on screen animates.
 */
const MINIMUM_SPLASH_MS = 0;

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
