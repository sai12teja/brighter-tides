/*
 * Trims the template's stylesheet to what this site actually renders.
 *
 * WHY
 * ---
 * `public/assets/css/main.css` is the full Solvior template: 953KB covering
 * a shop, a blog, portfolios, four hero variants and twenty-four inner pages,
 * of which this site uses one hero, a handful of sections and the type scale.
 * Lighthouse measured 90KB of its 97KB gzipped weight as unused, and every
 * byte of it blocks the first paint.
 *
 * WHAT IT DOES
 * ------------
 * Runs PurgeCSS over the built app plus the template's own scripts, and
 * writes `main.trimmed.css` next to the original. index.html links the
 * trimmed file; the original stays untouched in the repo, so the template
 * remains upgradeable and this step can be re-run after any upgrade.
 *
 * Content sources matter: the built JS carries every class React renders,
 * and main.js carries the ones the template adds at runtime. Anything
 * assembled from fragments at runtime cannot be found by scanning, so it is
 * safelisted below by hand.
 *
 * Run with `npm run build` (prebuild), or on its own: node scripts/purge-vendor-css.mjs
 */
import fs from "node:fs";

/*
 * PurgeCSS is a dev dependency and this step is a `prebuild`, so a build
 * that runs without it - a deploy installing production dependencies only -
 * keeps the trimmed file already committed instead of failing. The file is
 * checked in for exactly that reason.
 */
let PurgeCSS;
try {
  ({ PurgeCSS } = await import("purgecss"));
} catch {
  console.log("purgecss not installed - keeping the committed main.trimmed.css");
  process.exit(0);
}

// Relative, forward-slashed: PurgeCSS globs these, and a Windows absolute
// path (backslashes, drive letter) matches nothing and returns no results.
const SOURCE = "public/assets/css/main.css";
const OUTPUT = "public/assets/css/main.trimmed.css";

/*
 * Classes no scan can see.
 *
 * - The first group is toggled by main.js on scroll, on menu taps and on the
 *   search overlay (`sticky`, `opened`, `search-opened`, `back-to-top-btn-show`).
 * - `animated` and the `fadeIn*` family are written by WOW.js when a box
 *   crosses the fold; the names live in `data-wow-*` attributes and in
 *   animate.css, not in any class string PurgeCSS would find.
 * - `swiper-*` covers the classes Swiper used to write. They are kept because
 *   main.css styles a few of them structurally and the cost is negligible.
 * - The `tji-*` icon font is applied from data, so the class names are built
 *   at runtime.
 */
const safelist = {
  standard: [
    "sticky",
    "opened",
    "search-opened",
    "back-to-top-btn-show",
    "active",
    "animated",
    "show",
    "collapse",
    "collapsing",
    "collapsed",
    "nice-select",
    "list",
    "option",
    "selected",
    "focus",
    "open",
    "disabled",
    "current-menu-item",
    "current-menu-ancestor",
    "menu-item-has-children",
    "lenis",
    "lenis-smooth",
    "lenis-scrolling",
    "lenis-stopped",
  ],
  greedy: [
    /^tji-/,
    /^fadeIn/,
    /^fadeOut/,
    /^animate__/,
    /^swiper/,
    /^wow$/,
    /^mean/,
    /^odometer/,
    /^bt-/,
    /^h7-/,
    /^hero-/,
    /^service/,
    /^feature/,
    /^process/,
    /^faq/,
    /^accordion/,
    /^footer/,
    /^header/,
    /^hamburger/,
    /^contact/,
    /^brand/,
    /^sec-/,
    /^tj-/,
  ],
};

const results = await new PurgeCSS().purge({
  content: [
    "dist/**/*.js",
    "dist/**/*.html",
    "index.html",
    "src/**/*.{js,jsx}",
    "public/assets/js/main.js",
  ],
  css: [SOURCE],
  safelist,
  // Class names appear inside template literals and data files as bare
  // strings, so the default extractor's word boundaries are widened.
  defaultExtractor: (content) => content.match(/[\w-/:%.]+(?<!:)/g) || [],
});

const [result] = results;
if (!result) throw new Error("PurgeCSS matched no stylesheet - check the css glob");
fs.writeFileSync(OUTPUT, result.css);

const before = fs.statSync(SOURCE).size;
const after = fs.statSync(OUTPUT).size;
console.log(
  `main.css ${Math.round(before / 1024)}KB -> main.trimmed.css ${Math.round(after / 1024)}KB ` +
    `(${Math.round((1 - after / before) * 100)}% smaller)`
);
