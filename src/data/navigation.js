// Brighter Tides global navigation.

export const services = [
  {
    slug: "servicenow-licensing-contract-advisory",
    label: "ServiceNow Licensing & Contract Advisory",
    icon: "tji-optimization",
  },
  {
    slug: "servicenow-strategic-advisory",
    label: "ServiceNow Strategic Advisory",
    icon: "tji-strategic",
  },
  {
    slug: "fractional-servicenow-platform-leadership",
    label: "Fractional ServiceNow Platform Leadership",
    icon: "tji-leadership",
  },
];

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  {
    label: "Services",
    to: "/services",
    children: services.map((service) => ({
      label: service.label,
      to: `/services/${service.slug}`,
      icon: service.icon,
    })),
  },
  { label: "Contact", to: "/contact" },
];

export const headerCta = { label: "Discuss Your Challenge", to: "/contact" };

export const brand = { first: "Brighter", second: "Tides" };
