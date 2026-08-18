// Brighter Tides - the practice's own contact details.
//
// These facts surface across the header topbar, the mobile drawer, the
// footer's Connect column, the contact page's card row, the contact page's
// map, the social row, and both legal documents. They were previously
// written out at each of those call sites, so changing one meant finding all
// of them. Everything that shows them now reads them from here.

/** The inbox every inquiry lands in. Not a shared alias - see data/contact. */
export const email = "shannon@brighter-tides.com";

/**
 * Where the practice is based. Brighter Tides advises remotely, so this is
 * the base of operations rather than a walk-in office: `label` is what the
 * site prints, and `mapQuery` is what the contact page's embed searches for.
 */
export const location = {
  label: "Boca Raton, Florida",
  region: "Florida, United States",
  mapQuery: "Boca Raton, Florida, USA",
  // The same place in the form schema.org wants it - see lib/schema.js.
  // There is no street address on purpose: the practice advises remotely,
  // and inventing one to fill a field would be a false signal about having
  // an office someone could visit.
  postal: {
    addressLocality: "Boca Raton",
    addressRegion: "FL",
    addressCountry: "US",
  },
};

/**
 * Shannon's profile - the practice's only social presence, and the second
 * way to make contact. `handle` is what the contact card prints beside the
 * link: the name reads better there than the URL slug does.
 */
export const linkedin = {
  label: "Connect on LinkedIn",
  handle: "Shannon Chapman",
  href: "https://www.linkedin.com/in/shannonchapman/",
};

/**
 * The site's canonical origin - scheme and host, no trailing slash.
 *
 * Every absolute URL the site emits is built from this: the canonical link
 * and Open Graph tags on each page, the `@id`s that tie the JSON-LD entity
 * graph together, and the URLs in the sitemap. If the practice launches on a
 * different host (a `www.` prefix counts) this is the line to change - along
 * with public/sitemap.xml, public/robots.txt and the site-wide JSON-LD in
 * index.html, which are static files and cannot import it.
 */
export const siteUrl = "https://brighter-tides.com";

/**
 * Absolute URL for a site-relative path, for the places that require one:
 * canonical links, `og:`/`twitter:` tags, and JSON-LD.
 */
export const absoluteUrl = (path = "/") => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
