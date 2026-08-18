import { services } from "./navigation";
import { legalRoutes } from "./legal";

export const footerBrand = {
  name: "Brighter Tides",
  desc: "Independent ServiceNow advisory helping organizations make smarter decisions around licensing, platform strategy, governance, and leadership.",
};

export const footerCompany = [
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const footerServices = services.map((service) => ({
  label: service.label,
  to: `/services/${service.slug}`,
}));

// The fourth column sits past the footer's vertical rule with an 80px inset -
// the slot the template gives its newsletter form, so it carries the direct
// ways to reach the practice rather than a plain link list.
export const footerConnect = {
  linkedin: { label: "Connect on LinkedIn", href: "https://www.linkedin.com/" },
  email: "hello@brightertides.com",
};

// Rendered in the copyright bar, where the template puts its legal links.
// Both pages are live now - see pages/Legal and data/legal - so the two are
// derived from that same route table and cannot drift out of step with it.
// Footer still renders any entry with no "to" as plain text, so a future
// placeholder can be added the same way these two used to be.
export const footerLegal = legalRoutes.map((route) => ({
  label: route.label,
  to: "/" + route.slug,
}));

// Icon links, used by the mobile drawer's "Follow us" row.
export const socialLinks = [
  { icon: "fa-linkedin-in", href: "https://www.linkedin.com/", label: "LinkedIn" },
];

export const copyright = "Brighter Tides. All rights reserved.";

// Consumed by components/sections/LogoMarquee, which the home and about pages
// use for the "experience shaped across leading organizations" strip. These
// are the template's placeholder logos - swap for the real organizations.
export const brands = [
  "/assets/images/brand/brand-thumb-1.png",
  "/assets/images/brand/brand-thumb-2.png",
  "/assets/images/brand/brand-thumb-3.png",
  "/assets/images/brand/brand-thumb-4.png",
  "/assets/images/brand/brand-thumb-5.png",
  "/assets/images/brand/brand-thumb-6.png",
];
