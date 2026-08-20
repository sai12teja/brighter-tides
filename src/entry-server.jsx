import { Suspense } from "react";
import { renderToString } from "react-dom/server";
// React Router 7 exports StaticRouter from the core package; the
// the v6 server subpath no longer exists.
import { StaticRouter, Routes, Route } from "react-router";

import SiteLayout from "./components/layout/SiteLayout";
import Home from "./pages/Home";

/**
 * Build-time rendering, for the home page only.
 *
 * The site is a client-rendered SPA: the browser receives an empty `<div
 * id="root">` and paints nothing at all until the React bundle has been
 * fetched, parsed and executed. On a throttled phone that put First
 * Contentful Paint at 2.9s and Largest Contentful Paint at 5.5s, with the
 * hero photograph arriving in 14ms and then waiting on JavaScript.
 *
 * Rendering the home page's markup at build time means the browser can paint
 * the hero from HTML and CSS alone, and React attaches to it afterwards.
 *
 * WHY ONLY THE HOME PAGE
 * ----------------------
 * The other routes are code-split (see App.jsx). Their chunks are not loaded
 * when hydration starts, so React would render the Suspense fallback,
 * disagree with the server's markup and throw the whole subtree away - a
 * flash of empty page, worse than what it replaced. The home page is not
 * lazy, so its markup matches on the first render.
 *
 * Everything else keeps the SPA path exactly as it is: scripts/prerender.mjs
 * writes them an untouched shell, and vercel.json rewrites to it.
 *
 * This tree deliberately mirrors App.jsx's home branch rather than importing
 * App: App wraps everything in BrowserRouter, which needs a browser.
 */
export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      {/* App.jsx wraps its routes in this boundary for the code-split pages.
          It has to be here too: a Suspense boundary is part of the tree React
          compares during hydration, and without it the client's first node
          was a <Suspense> where the server had a <div>. */}
      <Suspense fallback={null}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </StaticRouter>
  );
}
