# Brighter Tides

The Brighter Tides site: React 19 + Vite, built on the Solvior template's markup
and vendor bundle.

```
npm run dev        # dev server, client-rendered
npm run build      # vite build, then prerender every route into dist/
npm run preview    # serve dist/ the way a static host will
npm run lint
```

## Search, answer engines, and the prerender

The site is a client-rendered React app, and the crawlers that feed AI answers -
which is what this site is written to be found by - largely do not run
JavaScript. So `npm run build` does not stop at `vite build`:
`scripts/prerender.mjs` renders every route to HTML and writes it into `dist/`
with that page's own title, description, canonical and JSON-LD already in the
`<head>`. `/about` ships as `dist/about/index.html`, a complete readable page.
The bundle still loads and takes over - `src/main.jsx` hydrates the markup
rather than replacing it - so nothing about how the site behaves changes.

Where the pieces live:

| File | What it owns |
| --- | --- |
| `src/data/seo.js` | Every page's title, description, and the topic it is written to own. **Edit copy here.** |
| `src/data/site.js` | `siteUrl` - the canonical origin every absolute URL is built from. |
| `src/lib/schema.js` | The JSON-LD: the practice, Shannon, and each page's own entities. |
| `src/lib/pageSeo.js` | Resolves a path to its metadata and structured data. |
| `src/lib/headTags.js` | The tag set itself, shared by the running app and the prerender. |
| `src/lib/sitemap.js` | `sitemap.xml`, generated from the route table. |
| `src/components/seo/Seo.jsx` | Applies that set to the live document on navigation. |
| `scripts/prerender.mjs` | Writes the pages, the 404, and the sitemap into `dist/`. |
| `scripts/og-image.mjs` | Rebuilds the 1200x630 share card from the brand lockup. |
| `public/robots.txt` | Crawler policy, including the AI crawlers, and the sitemap pointer. |

Adding a service to `src/data/navigation.js` adds it to the nav, the sitemap,
the offer catalogue in the JSON-LD, and the prerender. It will also fail the
dev-time check in `src/data/seo.js` until it is given a title and description.

### What the host has to do

1. **Serve the real file before any SPA fallback.** The pages are written as
   `dist/<route>/index.html`, which every static host resolves without a
   rewrite rule - but a catch-all "rewrite everything to /index.html" rule set
   up for a single-page app will shadow them, and every URL will answer with
   the home page's HTML. That undoes the entire prerender.
2. **Serve `dist/404.html` with a 404 status** for paths that match no file,
   rather than the home page with a 200.
3. **Answer on one hostname.** The canonical URLs are built from `siteUrl` in
   `src/data/site.js`, currently `https://brighter-tides.com`. If the site is
   served from `www.` as well, redirect one to the other, and change that
   constant (and the `Sitemap:` line in `public/robots.txt`) to match.

`npm run preview` does all three, so it is a fair rehearsal of production - see
the plugin in `vite.config.js`.
