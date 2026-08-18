/*
 * Strips the decorative wave-and-sun flourishes from the horizontal lockups,
 * leaving the wave mark and the "Brighter Tides" wordmark.
 *
 * The source art has no vector original, so this works on the pixels - but
 * not by erasing rectangles, which would clip the script's ascenders and
 * descenders. Right of the mark the artwork is only two things: the wordmark,
 * a single flat ink (navy on the light lockup, near-white on the reversed
 * one), and the flourishes, which are teal or sun-gold. So the split is by
 * hue, and the ink is measured from the file rather than hard-coded.
 *
 * Hue is compared as the pair (r-g, g-b), which survives the alpha ramp: PNG
 * stores straight alpha, so a half-transparent edge of the wordmark keeps the
 * ink's exact channel differences while only its alpha falls. Matching on hue
 * rather than "is it teal" is what also clears the flourishes' anti-aliased
 * fringe, which a brightness threshold leaves behind as a faint smudge.
 *
 * Run with:  node scripts/clean-logo.mjs [--dry]
 */
import { readFileSync, writeFileSync } from "node:fs";
import { decodePng, encodePng } from "./png.mjs";

const FILES = [
  "public/assets/images/logos/brighter-tides-lockup.png",
  "public/assets/images/logos/brighter-tides-lockup-light.png",
];

const HUE_TOLERANCE = 16; // how far a pixel may drift from the ink's hue
const ALPHA_FLOOR = 8; // below this a pixel is background, not ink

/** The column band separating the mark from the wordmark: the first run of
 *  fully transparent columns after the mark. Everything right of it is the
 *  wordmark's territory, so the mark itself is never touched. */
function findWordmarkStart({ width, height, data }) {
  const opaqueInColumn = (x) => {
    for (let y = 0; y < height; y += 1) {
      if (data[(y * width + x) * 4 + 3] > ALPHA_FLOOR) return true;
    }
    return false;
  };

  let gapStart = -1;
  for (let x = Math.floor(width * 0.2); x < width; x += 1) {
    if (!opaqueInColumn(x)) {
      if (gapStart < 0) gapStart = x;
    } else if (gapStart >= 0 && x - gapStart > 5) {
      return x;
    } else {
      gapStart = -1;
    }
  }
  throw new Error("could not find the gap between mark and wordmark");
}

/** The wordmark's ink, as the most common opaque colour right of the mark -
 *  navy on one lockup, near-white on the other, neither one hard-coded. */
function findInk({ width, height, data }, from) {
  const counts = new Map();

  for (let y = 0; y < height; y += 1) {
    for (let x = from; x < width; x += 1) {
      const i = (y * width + x) * 4;
      if (data[i + 3] < 200) continue;
      const key = [data[i] >> 4, data[i + 1] >> 4, data[i + 2] >> 4].join(",");
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }

  const [key] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
  const [r, g, b] = key.split(",").map((v) => Number(v) << 4);
  return { rg: r - g, gb: g - b };
}

function clean(file, { dry }) {
  const image = decodePng(readFileSync(file));
  const { width, height, data } = image;
  const from = findWordmarkStart(image);
  const ink = findInk(image, from);

  let cleared = 0;
  for (let y = 0; y < height; y += 1) {
    for (let x = from; x < width; x += 1) {
      const i = (y * width + x) * 4;
      if (data[i + 3] <= ALPHA_FLOOR) continue;

      const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
      const isInk =
        Math.abs(r - g - ink.rg) <= HUE_TOLERANCE && Math.abs(g - b - ink.gb) <= HUE_TOLERANCE;
      if (isInk) continue;

      // Zero the colour as well as the alpha: a transparent pixel that keeps
      // its teal bleeds back through when the browser scales the image.
      data[i] = data[i + 1] = data[i + 2] = data[i + 3] = 0;
      cleared += 1;
    }
  }

  if (!dry) writeFileSync(file, encodePng(image));
  const name = file.split("/").pop().padEnd(34);
  console.log(`${name} wordmark from x=${from}  ink hue (${ink.rg},${ink.gb})  cleared ${cleared} px${dry ? "  (dry run)" : ""}`);
}

const dry = process.argv.includes("--dry");
FILES.forEach((file) => clean(file, { dry }));
