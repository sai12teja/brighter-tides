import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Serve the prerendered pages in `npm run preview`.
 *
 * `vite preview` runs as a single-page app: any path it does not recognise is
 * answered with dist/index.html. That is right for a plain SPA and wrong for
 * this one, because scripts/prerender.mjs writes a real page per route -
 * /contact has its own dist/contact/index.html, with its own title,
 * description and JSON-LD. Left alone, preview answers every URL with the
 * home page's HTML and the build's whole point is invisible in the one place
 * you would go to check it. (It also makes React's hydration fail, loudly and
 * misleadingly, because the markup it is handed is a different page's.)
 *
 * So: try the real file first, exactly as a static host does. Registering the
 * middleware in the hook body rather than in a returned function is what puts
 * it ahead of Vite's own fallback.
 *
 * This is preview only. The dev server has no prerendered files and must keep
 * its SPA fallback, or a direct hit on /about in dev would 404.
 */
function servePrerendered() {
  return {
    name: "bt-serve-prerendered",
    configurePreviewServer(server) {
      const dist = server.config.build.outDir;

      server.middlewares.use((req, res, next) => {
        const path = (req.url || "/").split("?")[0];

        // Anything with an extension is a real asset; leave it alone.
        if (path !== "/" && !path.includes(".")) {
          if (existsSync(join(dist, path, "index.html"))) {
            req.url = `${path}/index.html`.replace(/\/+/g, "/");
          } else if (existsSync(join(dist, "404.html"))) {
            // What a static host does with a path matching no file, and what
            // this one should do: the 404 page, with a 404 status on it.
            // Vite's own fallback answers the home page with a 200, which is
            // the soft 404 pages/NotFound exists to avoid - so this is served
            // here rather than rewritten, to keep the status code.
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end(readFileSync(join(dist, "404.html")));
            return;
          }
        }

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), servePrerendered()],
});
