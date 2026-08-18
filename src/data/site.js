// Brighter Tides - the practice's own contact details.
//
// These two facts surface in six places: the header topbar, the mobile
// drawer, the footer's Connect column, the contact page's card row, the
// contact page's map, and both legal documents. They were previously written
// out at each of those call sites, so changing the address meant finding all
// six. Everything that shows them now reads them from here.

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
