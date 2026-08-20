/*
 * Smooth scrolling, synced to GSAP.
 *
 * WHY THIS EXISTS
 * ---------------
 * The template shipped two scroll libraries and used the wrong one.
 * `smooth-scroll.min.js` hijacks the wheel and animates `scrollTop` on its
 * own 600ms timer, completely unaware of GSAP - so ScrollTrigger (which
 * updates on the browser's native scroll event) was always reading a
 * position the other library was still animating towards. Anything driven
 * by scroll position - the pinned service cards, the scrubbed progress
 * bars, every reveal - lagged a frame or more behind the scroll itself,
 * which is what reads as "choppy".
 *
 * main.js already contains the correct setup, commented out at line ~1373:
 * Lenis driving the page, ScrollTrigger updating from Lenis's own scroll
 * event, and Lenis's RAF driven by GSAP's ticker so both run on a single
 * clock. lenis.min.js is already vendored in public/assets/js - this is
 * that commented block, live, with the extra wiring the template did not
 * need but a React + client-routed app does.
 */

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/*
 * Lenis is for pointer devices only.
 *
 * It smooths the wheel; touch is left on the platform's own momentum, which is
 * the right call and is how it has always been configured here (`syncTouch:
 * false`). But that means on a phone Lenis smooths nothing at all - and it
 * still costs a full pass of its RAF on the GSAP ticker every frame, plus a
 * ScrollTrigger update on every scroll event it forwards.
 *
 * Measured on a 6x-throttled phone that ticker was the largest remaining
 * contributor to frame time by a wide margin: taking it out dropped the median
 * frame from 50ms to 17ms. So on a coarse pointer the page keeps native
 * scrolling and ScrollTrigger reads the browser's own scroll position, which is
 * exactly what it does by default.
 */
const COARSE_POINTER = "(pointer: coarse)";

let lenis = null;



/**
 * Where to land when an anchor names a section.
 *
 * This used to reserve the header's height, which put the section's top that
 * far down the viewport - and filled the space above it with the tail of the
 * previous section. On the contact page that meant arriving at the form and
 * still reading "Every inquiry is read by Shannon" above it.
 *
 * The header is the wrong thing to measure anyway: it is `header-absolute` and
 * scrolls away, and the fixed copy only slides back in on an upward scroll -
 * so after a downward jump there is no header there to clear.
 *
 * So the section's own top edge goes to the top of the screen. Nothing of what
 * came before it is left showing, and the 60-84px of padding every one of these
 * sections opens with is exactly the clearance the header needs on the rare
 * occasion it slides back in - the card's own inner padding keeps its heading
 * below the bar either way.
 */
function anchorOffset() {
  return 0;
}

/**
 * main.js binds `#back_to_top` to `$("html, body").animate({scrollTop: 0})`
 * and the theme's anchor links resolve natively. Both fight Lenis, which
 * re-asserts its own target position on the next frame. Intercepting in the
 * capture phase lets us stop those handlers before they run and hand the
 * same intent to Lenis instead.
 */
function interceptScrollLinks() {
  document.addEventListener(
    "click",
    (event) => {
      if (!lenis) return;

      const backToTop = event.target.closest?.("#back_to_top");
      if (backToTop) {
        event.preventDefault();
        event.stopPropagation();
        lenis.scrollTo(0, { duration: 1.2 });
        return;
      }

      const anchor = event.target.closest?.('a[href^="#"]:not([href="#"])');
      if (!anchor) return;

      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;

      event.preventDefault();
      event.stopPropagation();
      lenis.scrollTo(target, { offset: anchorOffset(target), duration: 1.2 });
    },
    true
  );
}

/**
 * Starts Lenis and puts it on the same clock as GSAP. No-op when the vendor
 * bundle is missing, when it has already run, or when the visitor asked for
 * reduced motion - in which case the page keeps the browser's native scroll.
 */
export function initSmoothScroll() {
  if (lenis) return lenis;

  const { Lenis, gsap, ScrollTrigger } = window;
  if (typeof Lenis !== "function" || !gsap) return null;
  if (window.matchMedia(REDUCED_MOTION).matches) return null;
  if (window.matchMedia(COARSE_POINTER).matches) return null;

  lenis = new Lenis({
    // Lenis's own defaults - a ~1s expo-out glide. Slow enough to feel
    // eased, short enough that the page still tracks the wheel.
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    // Touch devices keep their native momentum - syncing Lenis to the
    // finger fights the platform's own scrolling. (This is Lenis's default;
    // it is stated here because it is a deliberate choice, not an oversight.)
    syncTouch: false,
  });

  lenis.on("scroll", () => ScrollTrigger?.update?.());
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  interceptScrollLinks();

  return lenis;
}

/**
 * Land on a section, for a visitor who arrived at a URL naming one.
 *
 * `scrollIntoView` is not enough once Lenis is driving: it moves the native
 * position, Lenis still holds its own (0, for a page that has just loaded),
 * and the next frame eases the page straight back to the top. Measured on
 * `/contact#inquiry` - the form sat 1,250px down and the page never moved.
 *
 * Lenis also brings the header offset with it, which `scrollIntoView` has no
 * notion of: the bar floats over the page, so a section pinned to the top of
 * the viewport starts underneath it.
 *
 * `immediate`, because this is an arrival rather than a journey - the
 * visitor asked for that part of the page, and easing 1,250px of a page they
 * have not seen is a scroll animation with no purpose. Falls back to the
 * native jump when Lenis is absent (reduced motion, or the bundle failing).
 */
export function scrollToSection(target) {
  if (!target) return;

  const land = () => {
    if (lenis) {
      lenis.resize();
      lenis.scrollTo(target, { offset: anchorOffset(target), immediate: true, force: true });
      return;
    }

    const top = target.getBoundingClientRect().top + window.scrollY + anchorOffset(target);
    window.scrollTo(0, Math.max(0, top));
  };

  land();
  // The page is still settling as this runs - ScrollTrigger re-measures, WOW
  // reveals boxes above the target - and any of it moves the target out from
  // under the landing by a few dozen pixels. One more pass on the next frame,
  // once that has happened, puts it back.
  requestAnimationFrame(land);
}

/**
 * Jump to the top for a client-side navigation.
 *
 * Three things fight a single `scrollTo(0)` here:
 *
 * 1. A plain `window.scrollTo(0, 0)` moves only the native position - Lenis
 *    still holds the old one and eases the page back down on its next frame.
 * 2. React swaps a tall page for a short one, so the browser clamps the old
 *    offset to the new document's maximum and fires a native scroll event for
 *    it. Lenis reads that as a user scroll and re-syncs its target to the
 *    clamped value, discarding the reset - which is why navigating away from
 *    the bottom of the home page landed part-way down the next one.
 * 3. Lenis's cached `limit` still describes the previous page until its
 *    resize observer catches up.
 *
 * So: refresh the limit, scroll both Lenis and the document, and do it again
 * on the next two frames - after the clamp event and after ScrollTrigger's
 * refresh, both of which can restore a stale offset.
 */
export function resetScroll() {
  const toTop = () => {
    if (lenis) {
      lenis.resize();
      // `force` scrolls even while Lenis is stopped or locked - the mobile
      // drawer locks it, and a nav tap from inside the drawer is exactly when
      // this runs.
      lenis.scrollTo(0, { immediate: true, force: true });
    }
    window.scrollTo(0, 0);
  };

  toTop();
  requestAnimationFrame(() => {
    toTop();
    requestAnimationFrame(toTop);
  });
}
