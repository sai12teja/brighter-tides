/*
 * Brighter Tides - per-page search metadata.
 *
 * One entry per route, keyed by pathname. Each carries the two things every
 * page must have its own of - a title and a meta description - plus the
 * topic the page is written to own. `topic` and `supporting` are not printed
 * anywhere: they are the brief the copy and the JSON-LD are checked against,
 * kept beside the metadata so the two cannot drift.
 *
 * Titles are written to survive truncation: the page's own subject first,
 * then the practice. Roughly 60 characters is where Google stops printing,
 * and descriptions are written to sit near 155.
 */

import { services } from "./navigation";
import { legalRoutes } from "./legal";

export const siteName = "Brighter Tides";

/**
 * The practice in one sentence. Written into the JSON-LD for both the
 * organization and the website - see lib/schema.js - so it is the wording an
 * answer engine is most likely to repeat back when asked what this is.
 */
export const siteDescription =
  "Independent, executive-level ServiceNow advisory covering licensing and contract strategy, platform strategy, governance, and fractional platform leadership.";

/**
 * The share card. 1200x630 is the size Open Graph and X both crop to, and
 * the file is built from the brand lockup by scripts/og-image.mjs.
 */
export const ogImage = {
  path: "/assets/images/bt/og-brighter-tides.png",
  width: 1200,
  height: 630,
  alt: "Brighter Tides - independent ServiceNow advisory",
};

/**
 * Everything the practice is qualified to answer questions about. Becomes
 * `knowsAbout` on both the organization and Shannon in lib/schema.js, which
 * is the field that decides whether a ServiceNow question is matched to this
 * practice or to whoever else wrote about the topic.
 */
export const expertiseTopics = [
  "ServiceNow",
  "ServiceNow advisory",
  "ServiceNow licensing",
  "ServiceNow contract negotiation",
  "ServiceNow renewals and true-ups",
  "ServiceNow platform strategy",
  "ServiceNow platform governance",
  "ServiceNow roadmap development",
  "ServiceNow operating models",
  "ServiceNow value optimization",
  "Fractional platform leadership",
  "Enterprise technology leadership",
];

const [licensing, strategic, fractional] = services;

/**
 * Route -> metadata. Service detail pages are keyed by their full path so a
 * lookup is one map access from anywhere, and so a new service cannot be
 * added to navigation.js without this file failing the check below.
 */
export const pageMeta = {
  "/": {
    topic: "ServiceNow Advisory",
    supporting: [
      "ServiceNow consulting",
      "licensing advisory",
      "ServiceNow strategy",
      "governance",
      "platform leadership",
    ],
    title: "ServiceNow Advisory | Brighter Tides",
    description:
      "Independent ServiceNow advisory on licensing, platform strategy, governance, and fractional platform leadership - executive guidance, no oversized engagement.",
  },

  "/about": {
    topic: "Shannon Chapman, ServiceNow advisor",
    supporting: ["independent ServiceNow consultant", "executive technology leadership"],
    title: "About Brighter Tides | Shannon Chapman",
    description:
      "Brighter Tides is the independent ServiceNow advisory practice of Shannon Chapman, who brings 18+ years of enterprise technology leadership.",
  },

  "/services": {
    topic: "ServiceNow Advisory Services",
    supporting: ["ServiceNow consulting services", "platform assessment", "licensing review"],
    title: "ServiceNow Advisory Services | Brighter Tides",
    description:
      "ServiceNow advisory across licensing and contracts, platform strategy, and fractional platform leadership. Start with the challenge, not a fixed package.",
  },

  [`/services/${licensing.slug}`]: {
    topic: "ServiceNow Licensing & Contract Advisory",
    supporting: [
      "ServiceNow license optimization",
      "renewal advisory",
      "contract review",
      "true-up advisory",
    ],
    title: "ServiceNow Licensing & Contract Advisory | Brighter Tides",
    description:
      "Independent ServiceNow licensing and contract advisory - agreement and renewal review, license optimization, and true-up guidance before you commit.",
  },

  [`/services/${strategic.slug}`]: {
    topic: "ServiceNow Strategic Advisory",
    supporting: [
      "ServiceNow strategy consultant",
      "platform assessment",
      "ServiceNow roadmap",
      "value optimization",
    ],
    title: "ServiceNow Strategic Advisory | Brighter Tides",
    description:
      "ServiceNow strategic advisory - platform assessments, roadmap development, value optimization, and operating model guidance, scoped around your problem.",
  },

  [`/services/${fractional.slug}`]: {
    topic: "Fractional ServiceNow Platform Leadership",
    supporting: [
      "Fractional ServiceNow Platform Owner",
      "ServiceNow governance",
      "platform leadership",
    ],
    title: "Fractional ServiceNow Platform Leadership | Brighter Tides",
    description:
      "Fractional ServiceNow platform leadership - senior ownership of strategy, governance, vendors, and licensing without another full-time senior hire.",
  },

  "/contact": {
    topic: "Contact a ServiceNow advisor",
    supporting: ["ServiceNow advisory inquiry", "independent ServiceNow consultant"],
    title: "Contact Brighter Tides | ServiceNow Advisory",
    description:
      "Tell us what is happening with your ServiceNow environment or what decision you are facing. Every inquiry is read by Shannon Chapman, not a shared inbox.",
  },

  "/privacy-policy": {
    topic: "Privacy policy",
    title: "Privacy Policy | Brighter Tides",
    description:
      "How Brighter Tides handles the information you share through this site - what we collect, why we hold it, and what we will never do with it.",
  },

  "/terms-and-conditions": {
    topic: "Terms and conditions",
    title: "Terms & Conditions | Brighter Tides",
    description:
      "The terms covering use of the Brighter Tides website and the inquiries sent through it, and how published guidance differs from a client engagement.",
  },
};

/** Every path that should be indexed - the sitemap's source of truth. */
export const indexedPaths = [
  "/",
  "/about",
  "/services",
  ...services.map((service) => `/services/${service.slug}`),
  "/contact",
  ...legalRoutes.map((route) => `/${route.slug}`),
];

/**
 * What the sitemap reports as each page's `lastmod`.
 *
 * Deliberately a date someone types, not the build date. A sitemap whose
 * every entry is "modified today" on every deploy is discounted by search
 * engines and tells an answer engine nothing about freshness. Bump this when
 * the site's copy actually changes; give a single page its own `lastModified`
 * in the table above when only that page changes.
 */
export const contentLastUpdated = "2026-08-18";

export const lastModifiedFor = (path) => pageMeta[path]?.lastModified || contentLastUpdated;

// A route with no metadata would ship the previous page's title, which is
// the one SEO defect that is invisible in the browser. Caught at import time
// in dev rather than in a crawl three weeks after launch.
// `import.meta.env` is Vite's own, and is absent when this file is imported
// outside a Vite pipeline - hence the optional chain.
if (import.meta.env?.DEV) {
  const missing = indexedPaths.filter((path) => !pageMeta[path]);
  if (missing.length) {
    console.warn(`[data/seo] no title/description for: ${missing.join(", ")}`);
  }
}

export const metaFor = (path) => pageMeta[path];
