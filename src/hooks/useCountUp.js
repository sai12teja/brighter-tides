import { useEffect, useRef, useState } from "react";

import { whenBundleReady } from "./useSiteScripts";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// Matches the ease-out curve the section's other reveals use, so the number
// decelerates onto its final value at the same rate the card settles.
const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Counts from 0 up to `target` the first time the element scrolls into view.
 *
 * Deliberately not the template's odometer: that renders each digit as a
 * sliding ribbon whose box changes size as digits are added, which is what
 * knocked these figures out of alignment. This only ever replaces the text,
 * so the value's baseline never moves.
 *
 * Self-contained on purpose - the vendor bundle (GSAP, ScrollTrigger) is
 * injected asynchronously and is not guaranteed to exist when this mounts.
 *
 * @returns {[React.RefObject, number]} ref to attach, and the current value.
 */
export default function useCountUp(target, { duration = 1600, threshold = 0.4 } = {}) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia(REDUCED_MOTION).matches) {
      setValue(target);
      return;
    }

    let raf = 0;
    let startTime = 0;
    let cancelled = false;
    let observer = null;

    const step = (now) => {
      if (!startTime) startTime = now;
      const progress = Math.min(1, (now - startTime) / duration);
      setValue(Math.round(easeOutExpo(progress) * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    // Only watch once the vendor bundle has laid the page out - before that
    // the document is short enough that this element is "on screen" without
    // the visitor having scrolled anywhere near it, and the count would run
    // out unseen.
    whenBundleReady().then(() => {
      if (cancelled) return;

      // Counting is a reveal, so it runs on entry - and once, not on every
      // pass back over the section.
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer.disconnect();
          raf = requestAnimationFrame(step);
        },
        // The lower margin holds the count until the figure is properly in
        // view rather than clipping the bottom edge.
        { threshold, rootMargin: "0px 0px -10% 0px" }
      );

      observer.observe(el);
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration, threshold]);

  return [ref, value];
}
