import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import useSiteScripts from "../../hooks/useSiteScripts";
import { refreshTemplateAnimations } from "../../lib/templateAnimations";
import { resetScroll } from "../../lib/smoothScroll";
import Preloader from "./Preloader";
import CustomCursor from "./CustomCursor";
import HamburgerMenu from "./HamburgerMenu";
import Header from "./Header";
import Footer from "./Footer";
import BookConsult from "./BookConsult";

/**
 * Closes the mobile drawer on navigation. The template's
 * main.js toggles these purely by adding classes to the DOM, and it has no
 * concept of client-side routing - without this the drawer would stay open
 * across a route change.
 */
function useCloseOverlaysOnNavigate() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    document.querySelector(".hamburger-area")?.classList.remove("opened");
    document.querySelector(".body-overlay")?.classList.remove("opened");
    // Not when the URL names a section - a link into the middle of a legal
    // document (/privacy-policy#liability) would otherwise be bounced
    // straight back to the top. pages/Legal takes it from here.
    if (!hash) resetScroll();
  }, [pathname, hash]);
}

/**
 * Re-initialises the template's per-page animations against whatever route
 * is now mounted. Runs once the vendor bundle is ready and again on every
 * navigation - see lib/templateAnimations.js for why main.js cannot just be
 * re-executed.
 */
function usePageAnimations(scriptsReady) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!scriptsReady) return;
    // One frame, so the new route's DOM is laid out before ScrollTrigger
    // and Swiper measure it.
    const raf = requestAnimationFrame(() => refreshTemplateAnimations());
    return () => cancelAnimationFrame(raf);
  }, [pathname, scriptsReady]);
}

/**
 * Chrome that exists only in a browser, kept out of the build-time render.
 *
 * The home page's markup is rendered at build time (scripts/prerender.mjs)
 * and React attaches to it. Anything whose markup differs between that
 * render and the browser's first render breaks the attachment - React
 * reports a hydration mismatch and rebuilds the whole tree from scratch,
 * which is the cost the prerender was meant to avoid.
 *
 * The loading screen is exactly that: it renders, then removes itself on a
 * timer, so the server's version and the browser's disagree the moment the
 * timer has run. The cursor is a desktop pointer effect with nothing to say
 * in static HTML. Both are mounted a tick after hydration instead, where
 * they cost nothing and can differ freely.
 */
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export default function SiteLayout() {
  const { pathname } = useLocation();
  const scriptsReady = useSiteScripts();
  const mounted = useMounted();
  useCloseOverlaysOnNavigate();
  usePageAnimations(scriptsReady);

  return (
    <>
      {mounted && <CustomCursor />}
      {mounted && <Preloader />}
      <HamburgerMenu />
      <Header />

      {/* Keyed by path so React mounts a fresh <main> per route, which
          restarts the CSS fade in brand.css. Opacity only - a transform here
          would become the containing block for GSAP's pinned sections, which
          position themselves `fixed`. */}
      <main id="primary" className="site-main" key={pathname}>
        <Outlet />
      </main>

      <Footer />

      {/* Outside <main>, which is keyed by route: this is viewport chrome and
          should not be torn down and rebuilt on every navigation. */}
      <BookConsult />
    </>
  );
}
