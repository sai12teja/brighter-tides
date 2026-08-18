/*
 * Every page's search metadata and structured data, resolved by path.
 *
 * The pages themselves used to build this, which meant the prerender could
 * not get at it without rendering React - and the head tags are set from an
 * effect, which a server render never runs. So it lives here instead, as
 * plain data derived from the same content files the pages render:
 *
 *   data/seo.js          the title and description
 *   data/navigation.js   which services exist
 *   data/serviceDetails  what each one covers, and its questions
 *   data/home.js         the site-level FAQ
 *
 * `seoFor(path)` is the whole interface. Pages spread it into
 * components/seo/Seo; scripts/prerender.mjs feeds it to lib/headTags.
 */

import { services } from "../data/navigation";
import { legalRoutes } from "../data/legal";
import { serviceDetails } from "../data/serviceDetails";
import { servicePhotoAlt } from "../data/servicePhotos";
import { faq as homeFaq } from "../data/home";
import { metaFor, indexedPaths } from "../data/seo";
import { buildPageSchema, serviceListEntity, serviceId, ORGANIZATION_ID, PERSON_ID } from "./schema";

/**
 * What is distinct about each page's structured data. Everything else -
 * canonical, Open Graph, the breadcrumb, the page node - is the same shape
 * everywhere and is filled in below.
 */
const shapes = {
  "/": {
    // The practice's own page. Its FAQ is the general "what is ServiceNow
    // advisory" set, so this is where those questions are answered in a form
    // an answer engine can quote.
    about: ORGANIZATION_ID,
    faq: homeFaq.items,
    image: "/assets/images/bt/photos/hero.webp",
  },

  "/about": {
    pageType: "AboutPage",
    // The page a search for "Shannon Chapman ServiceNow" should resolve to.
    mainEntity: { "@id": PERSON_ID },
    crumbs: { name: "About" },
    image: "/assets/images/bt/photos/about.webp",
  },

  "/services": {
    pageType: "CollectionPage",
    // The hub of the cluster: it names all three Service entities by the
    // same `@id` their own pages declare, so the four pages describe one set
    // of services rather than two overlapping sets.
    mainEntity: serviceListEntity(services),
    crumbs: { name: "Services" },
  },

  "/contact": {
    pageType: "ContactPage",
    crumbs: { name: "Contact" },
  },
};

// The three service detail pages. Each declares the Service entity it is
// about - the node the services index and the practice's offer catalogue
// point at, and where an answer engine reads what the service actually
// covers: the "How we help" cards become its offer catalogue, and the page's
// own questions become answers attributable to it.
for (const route of services) {
  const path = `/services/${route.slug}`;
  const detail = serviceDetails[route.slug];

  shapes[path] = {
    about: serviceId(route.slug),
    faq: detail.faq,
    image: detail.image,
    imageAlt: servicePhotoAlt[route.slug],
    crumbs: { name: route.label, trail: [{ label: "Services", to: "/services" }] },
    service: {
      slug: route.slug,
      name: route.label,
      serviceType: metaFor(path).topic,
      description: detail.desc,
      areas: detail.areas.items,
    },
  };
}

for (const route of legalRoutes) {
  shapes[`/${route.slug}`] = { crumbs: { name: route.label } };
}

function build(path) {
  const meta = metaFor(path);
  const shape = shapes[path] || {};

  // No `image` here on purpose, so every page shares the one branded
  // 1200x630 card. The page photographs are portrait or 3:2 and crop badly
  // to the 1.91:1 a share card is rendered at - a face cut in half in a
  // LinkedIn preview costs more than a bespoke picture gains. The photograph
  // still travels in the schema below, as the page's primary image.
  return {
    path,
    title: meta.title,
    description: meta.description,
    schema: buildPageSchema({
      path,
      title: meta.title,
      description: meta.description,
      pageType: shape.pageType,
      about: shape.about,
      mainEntity: shape.mainEntity,
      faq: shape.faq,
      image: shape.image,
      imageAlt: shape.imageAlt,
      crumbs: shape.crumbs,
      service: shape.service,
    }),
  };
}

// Built once at module load. The result is stable by identity, which is what
// keeps components/seo/Seo from rewriting the document head on every render.
const pages = Object.fromEntries(indexedPaths.map((path) => [path, build(path)]));

export const seoFor = (path) => pages[path];

/** Kept out of the index - see pages/NotFound. */
export const notFoundSeo = {
  path: "/404",
  title: "Page Not Found | Brighter Tides",
  description:
    "The page you were looking for is not here. Find our ServiceNow advisory services, or get in touch with Brighter Tides.",
  noindex: true,
};
