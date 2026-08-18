/*
 * Builds the share card: public/assets/images/bt/og-brighter-tides.png.
 *
 * This is the image Open Graph and X hand to LinkedIn, Slack, iMessage and
 * every other preview that unfurls a link to the site, and there was no file
 * of the right shape to give them. Both are rendered at 1200x630 (1.91:1),
 * and none of the site's photographs are anywhere near that ratio - the hero
 * is portrait - so a page photograph would have arrived cropped through
 * somebody's face.
 *
 * What it draws instead: the reversed lockup on the brand navy, over the
 * accent rule the site uses under its section headings. Deliberately plain -
 * a preview thumbnail is 300px wide in a LinkedIn feed, where a wordmark
 * reads and a sentence does not.
 *
 * No image library: scripts/png.mjs already decodes and encodes exactly the
 * kind of PNG the brand lockups are, and adding a dependency to composite two
 * rectangles is not a trade worth making.
 *
 * Run with:  node scripts/og-image.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { decodePng, encodePng } from "./png.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = join(root, "public/assets/images/logos/brighter-tides-lockup-light.png");
const OUT = join(root, "public/assets/images/bt/og-brighter-tides.png");

const WIDTH = 1200;
const HEIGHT = 630;

// --brand-primary and --teal from styles/theme.css.
const NAVY = [10, 42, 75];
const TEAL = [16, 160, 169];

/** The lockup, drawn at this width and centred. */
const LOGO_WIDTH = 660;

/**
 * Area-average downscale.
 *
 * The lockup is 875px wide and is drawn at 660, so every output pixel covers
 * a little over one input pixel; picking the nearest one would leave the
 * wordmark's thin strokes ragged. Averaging the source rectangle each output
 * pixel covers is what a proper resampler does for a reduction, and it is a
 * dozen lines. Alpha is averaged with the colour because the source is
 * straight-alpha - see the note in clean-logo.mjs.
 */
function resize(src, srcW, srcH, dstW, dstH) {
  const out = Buffer.alloc(dstW * dstH * 4);
  const scaleX = srcW / dstW;
  const scaleY = srcH / dstH;

  for (let y = 0; y < dstH; y += 1) {
    const y0 = Math.floor(y * scaleY);
    const y1 = Math.max(y0 + 1, Math.floor((y + 1) * scaleY));

    for (let x = 0; x < dstW; x += 1) {
      const x0 = Math.floor(x * scaleX);
      const x1 = Math.max(x0 + 1, Math.floor((x + 1) * scaleX));

      let r = 0;
      let g = 0;
      let b = 0;
      let a = 0;
      let n = 0;

      for (let sy = y0; sy < y1 && sy < srcH; sy += 1) {
        for (let sx = x0; sx < x1 && sx < srcW; sx += 1) {
          const i = (sy * srcW + sx) * 4;
          r += src[i];
          g += src[i + 1];
          b += src[i + 2];
          a += src[i + 3];
          n += 1;
        }
      }

      const o = (y * dstW + x) * 4;
      out[o] = Math.round(r / n);
      out[o + 1] = Math.round(g / n);
      out[o + 2] = Math.round(b / n);
      out[o + 3] = Math.round(a / n);
    }
  }

  return out;
}

const logo = decodePng(readFileSync(SOURCE));
const logoW = LOGO_WIDTH;
const logoH = Math.round((logo.height / logo.width) * LOGO_WIDTH);
const scaled = resize(logo.data, logo.width, logo.height, logoW, logoH);

const canvas = Buffer.alloc(WIDTH * HEIGHT * 4);
for (let i = 0; i < WIDTH * HEIGHT; i += 1) {
  canvas[i * 4] = NAVY[0];
  canvas[i * 4 + 1] = NAVY[1];
  canvas[i * 4 + 2] = NAVY[2];
  canvas[i * 4 + 3] = 255;
}

/** Source-over onto an opaque canvas, so the result stays opaque. */
function blend(pixels, w, h, left, top) {
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const s = (y * w + x) * 4;
      const alpha = pixels[s + 3] / 255;
      if (alpha === 0) continue;

      const d = ((top + y) * WIDTH + (left + x)) * 4;
      for (let c = 0; c < 3; c += 1) {
        canvas[d + c] = Math.round(pixels[s + c] * alpha + canvas[d + c] * (1 - alpha));
      }
    }
  }
}

// The lockup sits a little above centre, with the rule under it, so the pair
// reads as one block rather than the logo floating in the middle.
const logoTop = Math.round((HEIGHT - logoH) / 2) - 26;
blend(scaled, logoW, logoH, Math.round((WIDTH - logoW) / 2), logoTop);

const RULE_W = 96;
const RULE_H = 5;
const ruleTop = logoTop + logoH + 46;
const ruleLeft = Math.round((WIDTH - RULE_W) / 2);
for (let y = ruleTop; y < ruleTop + RULE_H; y += 1) {
  for (let x = ruleLeft; x < ruleLeft + RULE_W; x += 1) {
    const i = (y * WIDTH + x) * 4;
    canvas[i] = TEAL[0];
    canvas[i + 1] = TEAL[1];
    canvas[i + 2] = TEAL[2];
    canvas[i + 3] = 255;
  }
}

writeFileSync(OUT, encodePng({ width: WIDTH, height: HEIGHT, data: canvas }));
console.log(`og-brighter-tides.png  ${WIDTH}x${HEIGHT}`);
