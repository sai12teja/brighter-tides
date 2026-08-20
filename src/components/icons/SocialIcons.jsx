/**
 * The two glyphs the site used Font Awesome for.
 *
 * `font-awesome-pro.min.css` is 98KB of render-blocking CSS, and it was
 * loaded on every page - measured at 3s of blocking time on a throttled
 * phone - to draw a LinkedIn mark and a close cross. Inline SVG costs
 * nothing over the wire, needs no font file behind it, and paints with the
 * first render rather than after a stylesheet and a webfont have both
 * arrived.
 *
 * `currentColor` throughout, so both inherit whatever the link or button
 * around them is set to and the existing hover states keep working.
 */

/** LinkedIn's "in" mark, from the brand's own square glyph. */
export function LinkedInIcon({ className = "" }) {
  return (
    <svg
      className={className}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.4 21.5h5.16V9.75H2.4V21.5Zm7.63-11.75V21.5h5.16v-6.19c0-1.63.31-3.2 2.33-3.2 1.99 0 2.02 1.86 2.02 3.3v6.09h5.16v-7.12c0-4.47-.97-7.16-6.19-7.16-2.51 0-4.19 1.38-4.88 2.68h-.07V9.75h-4.53Z" />
    </svg>
  );
}

/** The drawer's close cross. */
export function CloseIcon({ className = "" }) {
  return (
    <svg
      className={className}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
