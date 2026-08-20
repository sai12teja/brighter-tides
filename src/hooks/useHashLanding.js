import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { whenBundleReady } from "./useSiteScripts";
import { scrollToSection } from "../lib/smoothScroll";

/**
 * Puts the visitor where the URL's hash says they should be.
 *
 * A link that names a section - `/contact#inquiry`, `/privacy-policy#liability`
 * - lands before the vendor bundle has laid the page out, so the browser's own
 * hash jump either misses the target or is undone by the layout's scroll reset
 * (SiteLayout skips that reset when a hash is present; this is the other half
 * of the same arrangement). Waiting for the bundle means measuring the page at
 * its real height rather than its pre-CSS one.
 *
 * Only for arriving at a hash. In-page anchor clicks are handled by
 * lib/smoothScroll, which hands them to Lenis with the header's height as an
 * offset - and the landing below goes through the same helper, for the same
 * reason: a native jump is undone by Lenis on its next frame.
 */
export default function useHashLanding() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    let cancelled = false;
    let stopWatching = null;

    whenBundleReady().then(() => {
      if (cancelled) return;
      const target = document.getElementById(hash.slice(1));
      if (!target) return;

      const land = () => scrollToSection(target);

      // One frame, so the section is at its final position before we measure.
      requestAnimationFrame(() => {
        land();
        requestAnimationFrame(land);
      });

      /*
       * Landing once is not enough. ScrollTrigger restores the scroll offset
       * it recorded every time it refreshes, and it refreshes again as each
       * of the page's images finishes loading - seconds after the landing,
       * long enough that the visitor has already seen the form. Measured on
       * `/contact#inquiry`: the page landed, then went back to 10px.
       *
       * So the landing is re-applied for as long as those refreshes keep
       * arriving, and only while the page is still sitting at the top - the
       * signature of having been reset. A visitor who has scrolled away by
       * then is left where they are.
       */
      const ST = window.ScrollTrigger;
      if (!ST?.addEventListener) return;

      // Near the top, not exactly at it. A refresh does not always put the
      // page back at 0 - measured landings that had been reset were sitting at
      // 49px, which slipped under a 30px test and never recovered. Anyone who
      // has genuinely scrolled away from a landing this far down the page is
      // well past 200.
      const onRefresh = () => {
        if (window.scrollY < 200) land();
      };

      ST.addEventListener("refresh", onRefresh);
      stopWatching = () => ST.removeEventListener("refresh", onRefresh);
      // Images are settled well inside this; past it, a refresh belongs to
      // something the visitor did.
      setTimeout(() => {
        stopWatching?.();
        stopWatching = null;
      }, 6000);
    });

    return () => {
      cancelled = true;
      stopWatching?.();
    };
  }, [hash]);
}
