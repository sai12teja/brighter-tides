import { useEffect, useState } from "react";

import { whenBundleReady } from "./useSiteScripts";

/**
 * Tracks which of a document's sections is currently being read, and how far
 * through it you are.
 *
 * Used by the legal pages' contents rail: the entry for the section you are
 * in takes the theme's own `.active` state (the same blue fill the service
 * sidebar's current item uses), and the progress rail above the list fills as
 * you go.
 *
 * Deliberately a scroll listener rather than an IntersectionObserver. A TOC
 * asks "which heading did I last pass?", which is a question about one
 * reading line - and with sections of wildly different lengths (some of these
 * are a single paragraph) an observer either has several entries intersecting
 * at once or none at all, and picking a winner from that costs more than just
 * reading the positions.
 *
 * One rAF-throttled handler serves both values, so the rail and the bar never
 * disagree, and the work per frame is a handful of `getBoundingClientRect`
 * calls. Lenis scrolls the page natively (see lib/smoothScroll), so a plain
 * passive `scroll` listener sees every frame of it.
 *
 * @param {string[]} ids       Section element ids, in document order.
 * @param {object}   [options]
 * @param {number}   [options.offset] The reading line, in px from the top of
 *                                    the viewport. Clears the fixed header.
 * @returns {{ activeId: string | null, progress: number }} progress is 0-1.
 */
export default function useScrollSpy(ids, { offset = 160 } = {}) {
  const [state, setState] = useState({ activeId: ids[0] ?? null, progress: 0 });

  // `ids` is a fresh array on every render; the joined string is not, so the
  // effect re-runs when the sections actually change and not before.
  const key = ids.join("|");

  useEffect(() => {
    const list = key ? key.split("|") : [];
    if (list.length === 0) return;

    let frame = 0;
    let cancelled = false;

    const measure = () => {
      frame = 0;
      const nodes = list.map((id) => document.getElementById(id)).filter(Boolean);
      if (nodes.length === 0) return;

      // The last section whose top has crossed the reading line. Before the
      // first one gets there, the first entry stays lit rather than none.
      let activeId = nodes[0].id;
      for (const node of nodes) {
        if (node.getBoundingClientRect().top - offset <= 0) activeId = node.id;
      }

      const start = nodes[0].getBoundingClientRect().top + window.scrollY;
      const end = nodes[nodes.length - 1].getBoundingClientRect().bottom + window.scrollY;
      const span = Math.max(1, end - start);
      const progress = Math.min(1, Math.max(0, (window.scrollY + offset - start) / span));

      setState((prev) =>
        prev.activeId === activeId && Math.abs(prev.progress - progress) < 0.004
          ? prev
          : { activeId, progress }
      );
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    // Section positions move as the vendor bundle lays the page out, images
    // resolve and SplitText rebuilds the headings - so measure again once all
    // of that has happened, not only when the visitor scrolls.
    whenBundleReady().then(() => {
      if (!cancelled) schedule();
    });

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [key, offset]);

  return state;
}
