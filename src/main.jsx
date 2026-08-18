import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/theme.css";
import "./styles/brand.css";

// NOTE: intentionally not wrapped in <StrictMode>. This app loads the
// original template's vendor scripts (jQuery, GSAP, Swiper, WOW, ...)
// imperatively once the DOM is mounted - StrictMode's dev-only double
// effect invocation would double-initialize those plugins.

const container = document.getElementById("root");

// A built page arrives with its markup already in place - scripts/prerender
// writes each route's HTML into dist so that crawlers, and the first paint,
// get the real page rather than an empty div. Adopt that markup instead of
// throwing it away and rendering it again. The dev server serves an empty
// root, so there it is a plain render.
if (container.firstChild) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
