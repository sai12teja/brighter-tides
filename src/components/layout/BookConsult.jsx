import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { whenBundleReady } from "../../hooks/useSiteScripts";

/** Where the button sends people: the contact page's inquiry form. */
const TARGET = "/contact#inquiry";

/**
 * Decides when the button is worth showing.
 *
 * Two rules, both about not nagging:
 *
 *  - Not until the visitor has scrolled past the first screen. A booking
 *    prompt over the hero is asking before they have read anything, and the
 *    hero already carries the same call to action.
 *  - Not once the closing CTA band is on screen. That band *is* this ask, at
 *    full size - a floating copy of it competing beside it reads as a nag, and
 *    the footer's "GO TOP" rail sits in the same corner.
 *
 * One rAF-throttled scroll handler answers both, the same shape
 * hooks/useScrollSpy uses. Lenis scrolls the page natively, so a passive
 * listener sees every frame of it.
 */
function useRevealOnScroll() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    let cancelled = false;

    const measure = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const scrolledIn = window.scrollY > viewport * 0.6;

      // The closing band, or the footer where a page has no band. Measured
      // against 85% of the viewport rather than its bottom edge: the band's
      // top crossing the very bottom of the screen means it is barely
      // peeking, and putting the switch exactly on the edge makes it a
      // knife-edge - a few pixels of scroll either side flip it.
      const closer = document.querySelector(".tj-cta-section") || document.querySelector(".tj-footer-area");
      const closerReached = closer ? closer.getBoundingClientRect().top < viewport * 0.85 : false;

      setVisible(scrolledIn && !closerReached);
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    // The page is far shorter than its final height until the bundle has run,
    // so anything measured before that is measuring a layout that no longer
    // exists a moment later.
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
  }, []);

  return visible;
}

/**
 * A standing "Book a Consult" button, pinned to the bottom-right of the
 * viewport, that takes the visitor to the contact form.
 *
 * Icon-only on a phone at a 56px touch target, and a labelled pill from `lg`
 * up where there is room for the words - the icon alone is a guess, and the
 * label is the whole point of the button. The `aria-label` carries the same
 * words either way, so the small form is not a mystery to a screen reader.
 *
 * Not rendered on the contact page: the form is already there, and a button
 * offering to take you to the page you are on is noise.
 */
export default function BookConsult() {
  const { pathname } = useLocation();
  const visible = useRevealOnScroll();

  if (pathname === "/contact") return null;

  return (
    <Link
      to={TARGET}
      className={`bt-book-consult${visible ? " is-visible" : ""}`}
      aria-label="Book a consult"
      aria-hidden={visible ? undefined : "true"}
      tabIndex={visible ? undefined : -1}
    >
      <span className="bt-book-consult-icon" aria-hidden="true">
        <i className="tji-calender"></i>
      </span>
      <span className="bt-book-consult-label">Book a Consult</span>
    </Link>
  );
}
