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
  // The menu item is a page link and lands at the top of the contact page,
  // where the address, the email and the form all are. Calls to action are
  // different - see `CONTACT_FORM`.
  { label: "Contact", to: "/contact" },
];

/**
 * Where every call to action on the site points.
 *
 * A visitor who has just read "Discuss Your ServiceNow Challenge" has already
 * decided; dropping them at the top of the contact page makes them scroll
 * past the heading, the intro and three detail cards to find the form. The
 * hash lands them on it instead - `#inquiry` is the form section's id, and
 * hooks/useHashLanding is what carries them there once the page has laid
 * itself out.
 *
 * Declared once so a CTA added later cannot quietly point somewhere else.
 */
export const CONTACT_FORM = "/contact#inquiry";

export const headerCta = { label: "Discuss Your Challenge", to: CONTACT_FORM };

export const brand = { first: "Brighter", second: "Tides" };
