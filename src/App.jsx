import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import SiteLayout from "./components/layout/SiteLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
