/*
 * The head tags a page needs, described once.
 *
 * Two things consume this and they must agree exactly: components/seo/Seo,
 * which applies them to the live document as the visitor moves between
 * routes, and scripts/prerender.mjs, which writes them into the HTML that
 * ships for each route. If those two ever disagreed, a crawler and a browser
 * would be reading different metadata off the same URL - so neither builds
 * tags of its own.
 */

import { absoluteUrl } from "../data/site";
import { siteName, ogImage } from "../data/seo";
import { siteGraph } from "./schema";

/**
 * Marks a tag as belonging to this layer. Every managed tag carries it,
 * including the defaults served in index.html, which is how a route change
 * knows exactly which tags are its predecessor's to clear away.
 */
export const MANAGED_ATTR = "data-bt-seo";

const meta = (name, content) => ({ tag: "meta", attrs: { name, content } });
const property = (name, content) => ({ tag: "meta", attrs: { property: name, content } });

/**
 * @param {object}   page
 * @param {string}   page.title        Unique per route - see data/seo.js.
 * @param {string}   page.description  Also unique per route.
 * @param {string}   page.path         Site-relative; becomes the canonical URL.
 * @param {string}   [page.image]      Site-relative share image.
 * @param {string}   [page.imageAlt]
 * @param {string}   [page.type]       og:type. "website" everywhere today.
 * @param {boolean}  [page.noindex]    Keeps a page out of the index.
 * @param {object[]} [page.schema]     JSON-LD nodes from lib/schema.js.
 */
export function buildHeadTags({
  title,
  description,
  path,
  image = ogImage.path,
  imageAlt = ogImage.alt,
  type = "website",
  noindex = false,
  schema = [],
}) {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  const tags = [meta("description", description)];

  // No canonical on a page that is asking not to be indexed: the two are
  // contradictory instructions about the same URL, and a crawler resolving
  // the contradiction the other way would index the 404.
  if (!noindex) tags.push({ tag: "link", attrs: { rel: "canonical", href: url } });

  tags.push(
    property("og:type", type),
    property("og:site_name", siteName),
    property("og:title", title),
    property("og:description", description),
    property("og:url", url),
    property("og:locale", "en_US"),
    property("og:image", imageUrl),
    property("og:image:alt", imageAlt),

    meta("twitter:card", "summary_large_image"),
    meta("twitter:title", title),
    meta("twitter:description", description),
    meta("twitter:image", imageUrl)
  );

  // Dimensions only for the card this file owns. A preview that knows the
  // size reserves the space before the image arrives; guessing them for some
  // other image would be worse than saying nothing.
  if (image === ogImage.path) {
    tags.push(property("og:image:width", ogImage.width), property("og:image:height", ogImage.height));
  }

  // `follow` rather than a bare `noindex`: the page is not worth indexing but
  // the links on it still lead somewhere real.
  if (noindex) tags.push(meta("robots", "noindex, follow"));

  // One script, one graph, on every page: who the practice is, then what this
  // particular page is. A standalone JSON-LD block needs its own `@context`
  // or none of it is read at all, and putting every node under one `@graph`
  // both supplies that once and says outright that these nodes describe one
  // page together.
  tags.push({
    tag: "script",
    attrs: { type: "application/ld+json" },
    text: JSON.stringify({ "@context": "https://schema.org", "@graph": [...siteGraph(), ...schema] }),
  });

  return tags;
}

const escapeAttr = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * The same tags as HTML, for the prerender.
 *
 * JSON-LD is written as-is apart from `<`, which is escaped as `\u003c` -
 * inside a <script> element an HTML parser would otherwise treat a `<` in
 * the JSON as the start of a tag. The sequence is still valid JSON and
 * decodes to the same string.
 */
export function headTagsToHtml(tags) {
  return tags
    .map(({ tag, attrs, text }) => {
      const attributes = Object.entries(attrs)
        .map(([name, value]) => ` ${name}="${escapeAttr(value)}"`)
        .join("");
      const managed = ` ${MANAGED_ATTR}=""`;

      if (text === undefined) return `<${tag}${attributes}${managed} />`;
      return `<${tag}${attributes}${managed}>${text.replace(/</g, "\\u003c")}</${tag}>`;
    })
    .join("\n    ");
}
