import { useEffect } from "react";
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

export default function SiteLayout() {
  const { pathname } = useLocation();
  const scriptsReady = useSiteScripts();
  useCloseOverlaysOnNavigate();
  usePageAnimations(scriptsReady);

  return (
    <>
      <CustomCursor />
      <Preloader />
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
