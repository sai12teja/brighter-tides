import { Routes, Route } from "react-router-dom";

import SiteLayout from "./components/layout/SiteLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";

/**
 * The route table, with no router around it.
 *
 * Two things mount this: App, inside a BrowserRouter, for the browser; and
 * entry-server, inside a StaticRouter, for the build's prerender. Keeping
 * the routes out of both is what lets the prerender walk exactly the pages
 * the app serves rather than a second list that drifts.
 */
export default function AppRoutes() {
  return (
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
        {/* Not the home page: an unknown URL that answers with the home page
            is a soft 404, and indexable at every address anyone ever
            mistypes. See pages/NotFound. */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
