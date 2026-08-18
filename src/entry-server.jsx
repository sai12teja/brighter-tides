import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import AppRoutes from "./routes";
import { seoFor, notFoundSeo } from "./lib/pageSeo";
import { buildHeadTags, headTagsToHtml } from "./lib/headTags";
import { sitemapXml } from "./lib/sitemap";
import { indexedPaths } from "./data/seo";

/**
 * The build's view of the app - see scripts/prerender.mjs.
 *
 * Returns the page's markup and the head that belongs with it. The head is
 * built here rather than read back out of the rendered output because
 * components/seo/Seo writes it from an effect, and effects do not run in a
 * server render. Both go through lib/headTags, so the tags baked into the
 * HTML and the tags the running app sets are the same tags.
 */
export function render(path) {
  const html = renderToString(
    <StaticRouter location={path}>
      <AppRoutes />
    </StaticRouter>
  );

  const seo = seoFor(path) || notFoundSeo;

  return {
    html,
    title: seo.title,
    head: headTagsToHtml(buildHeadTags(seo)),
  };
}

export { indexedPaths, sitemapXml };
