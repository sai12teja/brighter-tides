import { BrowserRouter, Routes, Route } from "react-router-dom";

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
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
