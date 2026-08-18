import { useEffect, useMemo } from "react";

import { buildHeadTags, MANAGED_ATTR } from "../../lib/headTags";

/*
 * The document head, per route.
 *
 * React 19 can render <title> and <meta> anywhere in the tree and hoist them
 * into the head, which would read better than this - but it *adds* them. The
 * title and description already in index.html would stay where they are, and
 * anything reading the first <title> in the head would get one page's title
 * on all ten. Those defaults have to keep working for whatever does not run
 * the app at all, so they stay, and this takes ownership of them instead:
 * every tag it manages carries `data-bt-seo`, including the ones served in
 * index.html and the ones scripts/prerender.mjs writes, and each route
 * replaces the whole set.
 *
 * Which tags those are is lib/headTags.js's decision, not this file's, so
 * that the prerender emits the same set.
 */
function syncHead(tags) {
  const { head } = document;
  head.querySelectorAll(`[${MANAGED_ATTR}]`).forEach((node) => node.remove());

  for (const { tag, attrs, text } of tags) {
    const node = document.createElement(tag);
    for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
    if (text !== undefined) node.textContent = text;
    node.setAttribute(MANAGED_ATTR, "");
    head.append(node);
  }
}

/**
 * Takes the object lib/pageSeo.js resolves for the route:
 * `<Seo {...seoFor("/about")} />`.
 */
export default function Seo({ title, description, path, image, imageAlt, type, noindex, schema }) {
  // pageSeo builds each page's object once at module load, so these are all
  // stable by identity and the effect below runs on navigation only.
  const tags = useMemo(
    () => buildHeadTags({ title, description, path, image, imageAlt, type, noindex, schema }),
    [title, description, path, image, imageAlt, type, noindex, schema]
  );

  useEffect(() => {
    document.title = title;
    syncHead(tags);
  }, [title, tags]);

  return null;
}
