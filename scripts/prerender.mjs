/*
 * Writes a real HTML page for every route, into dist/.
 *
 * WHY THIS EXISTS
 * ---------------
 * The site is a client-rendered React app: the HTML it served was an empty
 * <div id="root">, and everything - the copy, the headings, the JSON-LD, the
 * per-page title - only appeared once a browser had downloaded and run
 * 350KB of JavaScript. Google will usually render that eventually. The
 * crawlers behind AI answers largely will not: they fetch the HTML and read
 * what is in it. On a site whose stated goal is to be cited in AI answers
 * about ServiceNow advisory, that is the whole ballgame.
 *
 * So after `vite build`, this walks the route table, renders each page to a
 * string, and writes it into the built HTML along with that page's metadata.
 * The result is an ordinary static site: every URL answers with its own
 * complete, readable page. The JavaScript still loads and takes over - see
 * src/main.jsx, which hydrates the markup rather than replacing it - so
 * nothing about how the site behaves changes.
 *
 * Run as part of `npm run build`. On its own, after a build:
 *
 *   node scripts/prerender.mjs
 *
 * HOSTING NOTE: this writes dist/about/index.html, not dist/about.html, so
 * any static host serves /about without a rewrite rule. If the host is
 * configured to rewrite every unknown path to /index.html - the usual SPA
 * fallback - make sure it tries the real file first, or every page will be
 * served the home page's HTML and this step will have bought nothing.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

const SEO_BLOCK = /<!--seo-->[\s\S]*?<!--\/seo-->/;
const ROOT_DIV = '<div id="root"></div>';

/**
 * React 19 preloads the images it renders, and emits those <link> tags at the
 * very front of what renderToString returns - there being no document for it
 * to hoist them into. In the browser it puts the same tags in the <head>
 * instead, so leaving them where they land would mean the first child of
 * #root in the HTML is a node the client never renders there: hydration
 * fails on the first comparison it makes, and React throws the whole
 * prerendered tree away and rebuilds it.
 *
 * So they are moved to the head, which is both where they belong and what
 * the client expects to find. React dedupes hoistables by href, so it adopts
 * these rather than adding a second copy.
 */
const HOISTED = /^(?:<link\b[^>]*>)+/;

/**
 * Vite in middleware mode, purely as a module loader: it is what resolves
 * JSX and the extensionless imports the app is written with, so the prerender
 * runs the same modules the browser bundle is built from rather than a
 * parallel copy of them.
 */
const vite = await createServer({
  root,
  logLevel: "warn",
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const { render, indexedPaths, sitemapXml } = await vite.ssrLoadModule("/src/entry-server.jsx");

  const template = readFileSync(join(dist, "index.html"), "utf8");
  if (!SEO_BLOCK.test(template)) throw new Error("dist/index.html has no <!--seo--> block to replace");
  if (!template.includes(ROOT_DIV)) throw new Error("dist/index.html has no empty #root to fill");

  // "/404" is not in the route table and is not in the sitemap - it is the
  // file most static hosts serve for an unknown path. See pages/NotFound.
  const paths = [...indexedPaths, "/404"];

  for (const path of paths) {
    const { html, head, title } = render(path);

    const preloads = html.match(HOISTED)?.[0] ?? "";
    const body = html.slice(preloads.length);

    const page = template
      .replace(SEO_BLOCK, `<!--seo-->\n    <title>${title}</title>\n    ${head}\n    <!--/seo-->`)
      .replace("</head>", `  ${preloads}\n  </head>`)
      .replace(ROOT_DIV, `<div id="root">${body}</div>`);

    // "/" -> dist/index.html; "/about" -> dist/about/index.html; and the 404
    // as dist/404.html, which is the name hosts look for.
    const file =
      path === "/"
        ? join(dist, "index.html")
        : path === "/404"
          ? join(dist, "404.html")
          : join(dist, path.slice(1), "index.html");

    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, page, "utf8");
    console.log(`  ${path.padEnd(52)} ${(page.length / 1024).toFixed(1)} kB`);
  }

  // The sitemap goes to both places on purpose: dist/ is what ships, and
  // public/ is what the dev server serves and what the repo records, so the
  // file people can read is the file that goes out.
  const xml = sitemapXml();
  writeFileSync(join(dist, "sitemap.xml"), xml, "utf8");
  writeFileSync(join(root, "public", "sitemap.xml"), xml, "utf8");

  console.log(`\nprerendered ${paths.length} pages, sitemap has ${indexedPaths.length} URLs`);
} finally {
  await vite.close();
}
