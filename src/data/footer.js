import { services } from "./navigation";
import { legalRoutes } from "./legal";
import { email, linkedin, location } from "./site";

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
  linkedin,
  email,
  location: location.label,
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

// Icon links, used by the mobile drawer's "Follow us" row and the copyright
// bar. One entry: LinkedIn is the practice's only social presence, so the row
// is a row of one rather than a set of dead icons.
export const socialLinks = [
  { icon: "fa-linkedin-in", href: linkedin.href, label: "LinkedIn" },
];

export const copyright = "Brighter Tides. All rights reserved.";

// Consumed by components/sections/LogoMarquee, which the home and about pages
// use for the "experience shaped across leading organizations" strip.
//
// Each file is the organization's own mark, in its own colours - a third
// party's logo is not ours to recolour, so the strip gives them a light tile
// to sit on instead of knocking them all to one grey. They are exported to a
// common 3:1 box with the logo scaled inside it to even out visual weight,
// so the marquee only has to letterbox them.
//
// `name` is the alt text. "Brand" on six identical images told a screen
// reader nothing; the point of this strip is *which* organizations.
export const brands = [
  { name: "Citrix", src: "/assets/images/bt/logos/citrix.webp" },
  { name: "Norwegian Cruise Line", src: "/assets/images/bt/logos/norwegian-cruise-line.webp" },
  { name: "Southern Glazer's Wine and Spirits", src: "/assets/images/bt/logos/southern-glazers.webp" },
  { name: "University of Central Florida", src: "/assets/images/bt/logos/university-of-central-florida.webp" },
];
