import { services as serviceRoutes } from "./navigation";

// Home 01 service slider. The detail-page links are resolved against
// navigation.js so the slider, the menu, and the routes cannot drift apart:
// a slug that is not a real route is reported at import time in dev rather
// than silently shipping a link that 404s.
const routeFor = (slug) => {
  if (import.meta.env.DEV && !serviceRoutes.some((service) => service.slug === slug)) {
    console.warn(`[data/services] "${slug}" is not a service in navigation.js - this link will 404.`);
  }
  return `/services/${slug}`;
};

export const services = [
  {
    number: 1,
    icon: "/assets/images/bt/service-1.svg",
    titleLines: ["ServiceNow Licensing &", "Contract Advisory"],
    lead: "Optimize your investment before you renew, expand, or true-up.",
    desc: "Understand what you're paying for, what you're using, and what your organization actually needs.",
    image: "/assets/images/service/h1-service-1.webp",
    to: routeFor("servicenow-licensing-contract-advisory"),
    stacked: true,
  },
  {
    number: 2,
    icon: "/assets/images/bt/service-2.svg",
    titleLines: ["ServiceNow Strategic", "Advisory"],
    lead: "Solve complex ServiceNow challenges without creating unnecessary consulting work.",
    desc: "Get experienced guidance around platform value, health, roadmap, use cases, and operating model.",
    image: "/assets/images/service/h1-service-2.webp",
    to: routeFor("servicenow-strategic-advisory"),
    stacked: true,
  },
  {
    number: 3,
    icon: "/assets/images/bt/service-3.svg",
    titleLines: ["Fractional ServiceNow", "Platform Leadership"],
    lead: "Senior ServiceNow leadership without another full-time senior hire.",
    desc: "Bring experienced oversight to strategy, governance, vendors, licensing, priorities, and platform value.",
    image: "/assets/images/service/h1-service-3.webp",
    to: routeFor("fractional-servicenow-platform-leadership"),
    stacked: false,
  },
];
