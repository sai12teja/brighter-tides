/*
 * Writes the home page's markup into dist/index.html at build time.
 *
 * Runs after `vite build` (see the `build` script). It needs two things the
 * client build does not produce on its own:
 *
 *  1. an SSR bundle of src/entry-server.jsx, built with `vite build --ssr`;
 *  2. the client's own index.html, which already carries the hashed asset
 *     links, the preload and the stylesheets.
 *
 * The rendered markup replaces the empty `<div id="root">` in a copy of that
 * file. Every other route needs the empty version, so the untouched shell is
 * written alongside as `app.html` and vercel.json rewrites non-home routes to
 * it - a visitor landing on /about must not be served the home page's markup
 * and watch React replace it.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const DIST = "dist";
const SSR_ENTRY = path.join("dist-ssr", "entry-server.js");

const indexPath = path.join(DIST, "index.html");
const template = fs.readFileSync(indexPath, "utf8");

// The shell every client-routed page is served: exactly what the build
// produced, with the root still empty.
fs.writeFileSync(path.join(DIST, "app.html"), template);

if (!fs.existsSync(SSR_ENTRY)) {
  console.log("prerender: no SSR bundle - dist/index.html left as the SPA shell");
  process.exit(0);
}

const { render } = await import(pathToFileURL(path.resolve(SSR_ENTRY)).href);
const rendered = render("/");

/*
 * React 19 emits `<link rel="preload">` for the images it finds while
 * rendering. They are useful - but `renderToString` returns them inline, at
 * the front of the markup, and the browser's React renders no such elements,
 * so hydration compares a <link> against a <div> on the very first node and
 * gives up on the whole tree (error #418: the page was being rendered twice,
 * once from HTML and again from scratch).
 *
 * Lifted into <head>, they do the job they were emitted for and the markup
 * that stays behind is exactly what the client builds.
 */
const preloads = rendered.match(/<link[^>]*rel="preload"[^>]*>/g) || [];
const html = rendered.replace(/<link[^>]*rel="preload"[^>]*>/g, "");

const marker = '<div id="root"></div>';
if (!template.includes(marker)) {
  throw new Error(`prerender: could not find ${marker} in dist/index.html`);
}

const withPreloads = preloads.length
  ? template.replace("</head>", `  ${[...new Set(preloads)].join("\n    ")}\n  </head>`)
  : template;

fs.writeFileSync(indexPath, withPreloads.replace(marker, `<div id="root">${html}</div>`));

console.log(
  `prerender: home page rendered (${Math.round(html.length / 1024)}KB of markup, ` +
    `${preloads.length} preloads lifted to <head>), other routes served dist/app.html`
);
