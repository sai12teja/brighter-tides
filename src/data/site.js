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
