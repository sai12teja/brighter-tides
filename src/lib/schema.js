/*
 * JSON-LD for the pages of the site.
 *
 * Every page ships one graph, and it has two halves.
 *
 * The site half - the practice, Shannon, and the website - is identical
 * everywhere and is built by `siteGraph()` from the same content files the
 * pages render, so it cannot drift from what the site actually says. It is
 * repeated on every page deliberately: a crawler that only ever fetches one
 * URL still learns who this is.
 *
 * The page half changes: the page node itself, its breadcrumb trail, the
 * Service a detail page describes, the questions it answers. It never
 * restates the practice or Shannon - it points at them by `@id`, so
 * "Brighter Tides", "Shannon Chapman" and each of the three services resolve
 * to one entity across the whole site rather than ten lookalikes. That
 * resolution is the difference between an answer engine knowing there is one
 * ServiceNow advisory practice here and thinking there are several.
 *
 * All of it reaches the served HTML: scripts/prerender.mjs writes each page's
 * graph into its <head> at build time - see lib/headTags.js.
 */

import { siteUrl, absoluteUrl, email, linkedin, location } from "../data/site";
import { services } from "../data/navigation";
import { founder } from "../data/home";
import { siteName, siteDescription, expertiseTopics } from "../data/seo";

export const ORGANIZATION_ID = `${siteUrl}/#organization`;
export const PERSON_ID = `${siteUrl}/#shannon-chapman`;
export const WEBSITE_ID = `${siteUrl}/#website`;

const LOGO_ID = `${siteUrl}/#logo`;

const ref = (id) => ({ "@id": id });

/** The Service node a detail page owns, referenced from anywhere else. */
export const serviceId = (slug) => `${absoluteUrl(`/services/${slug}`)}#service`;

const postalAddress = { "@type": "PostalAddress", ...location.postal };

/**
 * The practice, the person, and the site - the three entities every page's
 * graph is anchored to.
 *
 * `ProfessionalService` as well as `Organization` because that is what this
 * is: a named advisory practice, not a product company. `knowsAbout` is the
 * list in data/seo.js, and it is the field that does the most work here -
 * it is how a question about ServiceNow true-ups gets matched to this
 * practice rather than to whoever wrote the most pages about true-ups.
 *
 * The offer catalogue names the three services by the `@id` their own pages
 * declare, so the catalogue and the service pages describe the same three
 * things.
 */
export function siteGraph() {
  return [
    {
      "@type": ["ProfessionalService", "Organization"],
      "@id": ORGANIZATION_ID,
      name: siteName,
      alternateName: `${siteName} ServiceNow Advisory`,
      url: absoluteUrl("/"),
      description: siteDescription,
      email,
      logo: {
        "@type": "ImageObject",
        "@id": LOGO_ID,
        url: absoluteUrl("/assets/images/logos/brighter-tides-lockup.png"),
        width: 875,
        height: 172,
        caption: siteName,
      },
      image: ref(LOGO_ID),
      founder: ref(PERSON_ID),
      employee: ref(PERSON_ID),
      address: postalAddress,
      areaServed: { "@type": "Country", name: "United States" },
      sameAs: [linkedin.href],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email,
        url: absoluteUrl("/contact"),
        availableLanguage: "English",
      },
      knowsAbout: expertiseTopics,
      serviceType: ["ServiceNow Advisory", ...services.map((service) => service.label)],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "ServiceNow advisory services",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            "@id": serviceId(service.slug),
            name: service.label,
            url: absoluteUrl(`/services/${service.slug}`),
          },
        })),
      },
    },

    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: founder.name,
      givenName: founder.name.split(" ")[0],
      familyName: founder.name.split(" ").slice(1).join(" "),
      jobTitle: founder.role,
      description: `${founder.name} is the founder of ${siteName}, an independent ServiceNow advisory practice, and brings more than 18 years of enterprise technology and business transformation leadership.`,
      url: absoluteUrl("/about"),
      worksFor: ref(ORGANIZATION_ID),
      homeLocation: { "@type": "Place", address: postalAddress },
      sameAs: [linkedin.href],
      knowsAbout: expertiseTopics,
    },

    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: absoluteUrl("/"),
      name: siteName,
      description: siteDescription,
      publisher: ref(ORGANIZATION_ID),
      inLanguage: "en-US",
    },
  ];
}

const pageId = (path) => `${absoluteUrl(path)}#webpage`;
const breadcrumbId = (path) => `${absoluteUrl(path)}#breadcrumb`;

/**
 * The trail the page header already prints, as a BreadcrumbList. `crumbs` is
 * the same shape PageHeader takes - what sits between Home and this page -
 * so the two are written from one description of the hierarchy.
 */
function breadcrumbList({ path, name, crumbs = [] }) {
  // The home page is the root of the trail, not a step along it: a list
  // reading "Home > Home" is worse than no list at all.
  if (path === "/") return null;

  const trail = [{ label: "Home", to: "/" }, ...crumbs, { label: name, to: path }];

  return {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId(path),
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      item: absoluteUrl(crumb.to),
    })),
  };
}

/** A page's FAQ, from the same array the accordion renders. */
const questions = (faq) =>
  faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  }));

/**
 * The page node.
 *
 * `pageType` is the schema.org subtype that describes what the page is for -
 * AboutPage, ContactPage, CollectionPage - and falls back to WebPage. A page
 * that carries a genuine, visible FAQ is additionally typed FAQPage, which is
 * what lets its answers be quoted directly; a page without one must not be,
 * which is why this takes the questions rather than assuming them.
 */
function webPage({ path, title, description, pageType = "WebPage", faq, about, mainEntity, image, imageAlt }) {
  const url = absoluteUrl(path);
  const types = faq?.length ? [pageType, "FAQPage"] : pageType;
  // FAQPage defines `mainEntity` as the questions, so a page carrying an FAQ
  // spends its one main entity on them. Whatever else the page is chiefly
  // about travels as `about` instead - see the About page, which names
  // Shannon there rather than in a slot its own questions already hold.
  const primary = faq?.length ? questions(faq) : mainEntity;

  return {
    "@type": types,
    "@id": pageId(path),
    url,
    name: title,
    description,
    isPartOf: ref(WEBSITE_ID),
    about: about ? ref(about) : ref(ORGANIZATION_ID),
    ...(path === "/" ? {} : { breadcrumb: ref(breadcrumbId(path)) }),
    ...(image
      ? {
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: absoluteUrl(image),
            ...(imageAlt ? { caption: imageAlt } : {}),
          },
        }
      : {}),
    ...(primary ? { mainEntity: primary } : {}),
    inLanguage: "en-US",
  };
}

/**
 * One advisory service, as offered by the practice. `areas` are the named
 * ways the service is delivered - the cards under "How we help" - which is
 * the level of detail an answer engine needs to match a service to a
 * question phrased as a problem rather than as a product name.
 */
function serviceNode({ slug, name, description, areas = [], serviceType }) {
  const url = absoluteUrl(`/services/${slug}`);

  return {
    "@type": "Service",
    "@id": serviceId(slug),
    name,
    serviceType: serviceType || name,
    description,
    url,
    provider: ref(ORGANIZATION_ID),
    areaServed: { "@type": "Country", name: "United States" },
    audience: {
      "@type": "BusinessAudience",
      name: "Organizations running ServiceNow",
    },
    ...(areas.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${name} - how we help`,
            itemListElement: areas.map((area) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: area.title, description: area.desc },
            })),
          },
        }
      : {}),
  };
}

/**
 * Everything one page contributes to the graph, ready to be serialised.
 * Returns an array: a page node, its breadcrumb, and - on a service detail
 * page - the Service it describes.
 */
export function buildPageSchema({
  path,
  title,
  description,
  pageType,
  crumbs,
  faq,
  about,
  mainEntity,
  image,
  imageAlt,
  service,
}) {
  const nodes = [webPage({ path, title, description, pageType, faq, about, mainEntity, image, imageAlt })];

  // The breadcrumb's own label is the page's short name, not its <title>:
  // "Contact" reads as a step in a trail, "Contact Brighter Tides |
  // ServiceNow Advisory" does not.
  const trail = breadcrumbList({ path, name: crumbs?.name || title, crumbs: crumbs?.trail });
  if (trail) nodes.push(trail);

  if (service) nodes.push(serviceNode(service));

  return nodes;
}

/** An ItemList of the three services, for the services index page. */
export const serviceListEntity = (services) => ({
  "@type": "ItemList",
  name: `${siteName} advisory services`,
  itemListElement: services.map((service, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: { "@id": serviceId(service.slug), "@type": "Service", name: service.label, url: absoluteUrl(`/services/${service.slug}`) },
  })),
});
