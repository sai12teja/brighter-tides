import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import SiteLayout from "./components/layout/SiteLayout";
import Home from "./pages/Home";

/*
 * Every page but the home page is split out of the first download.
 *
 * The app bundle was one file carrying all six pages and the data behind
 * them - about 100KB gzipped, all of which has to arrive, parse and execute
 * before anything at all can paint, because nothing here is server-rendered.
 * A visitor landing on the home page was paying for the service detail
 * copy, the legal documents and the contact form to reach the hero.
 *
 * Home stays in the main bundle: it is the most common entry point, and
 * splitting it would only trade the parse cost for a second round trip on
 * the very page where that matters most. The rest arrive when their route
 * does - which, on a client-routed site, is while the visitor is still
 * looking at the page they came from.
 */
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const Legal = lazy(() => import("./pages/Legal"));

export default function App() {
  return (
    <BrowserRouter>
      {/* No spinner: the layout's chrome is already on screen and the route
          chunk is a single small file on the same connection. A fallback
          here would flash a loading state for a frame or two, which reads
          worse than the page simply arriving. */}
      <Suspense fallback={null}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:slug" element={<ServiceDetail />} />
            <Route path="contact" element={<Contact />} />
            {/* Legal pages sit at the top level so their URLs read the way
                people expect to find them, and are linked from the footer's
                copyright bar rather than the main nav. Both render
                pages/Legal from data/legal.js. */}
            <Route path="privacy-policy" element={<Legal slug="privacy-policy" />} />
            <Route path="terms-and-conditions" element={<Legal slug="terms-and-conditions" />} />
            {/* An unknown URL rendered the home page while the address bar kept
                the URL that did not exist, which reads as the site having jumped
                to the home page on its own. Redirecting makes the two agree. */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
