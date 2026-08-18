import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/theme.css";
import "./styles/brand.css";

// NOTE: intentionally not wrapped in <StrictMode>. This app loads the
// original template's vendor scripts (jQuery, GSAP, Swiper, WOW, ...)
// imperatively once the DOM is mounted - StrictMode's dev-only double
// effect invocation would double-initialize those plugins.
createRoot(document.getElementById("root")).render(<App />);
