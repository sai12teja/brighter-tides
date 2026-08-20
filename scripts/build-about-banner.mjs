/*
 * Crops the about page's hero photograph to the shape the header band needs.
 *
 * The band is about 4.5:1 with the site header sitting over its top third, so
 * the delivered file is cut to that ratio rather than left for the browser to
 * crop - at desktop widths there is then nothing left to guess at.
 *
 * The slice is taken from the top of the frame: she is full length in the
 * source, and the band only has room for head and torso. That also puts her
 * face just below the header bar, which is the whole point of the crop.
 *
 * Source: assets-source/about/about-hero.png - Drive > About > "About Hero".
 * Run: node scripts/build-about-banner.mjs
 */
import { chromium } from "file:///C:/Users/tbc03/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs";
import { readFileSync, writeFileSync } from "node:fs";

const SOURCE = "assets-source/about/about-hero.png";
const OUTPUT = "public/assets/images/bt/photos/about-hero-banner.webp";

// The band at desktop: 1907 wide by 421 tall.
const RATIO = 1907 / 421;
// Rows to drop off the top before slicing. Zero keeps her whole head in frame;
// raise it to push her further down the band.
const CROP_TOP = 0;
const OUT_WIDTH = 1920;

const src = `data:image/png;base64,${readFileSync(SOURCE).toString("base64")}`;
const browser = await chromium.launch({ channel: "chromium" });
const page = await browser.newPage();

const out = await page.evaluate(
  async ({ src, RATIO, CROP_TOP, OUT_WIDTH }) => {
    const img = new Image();
    img.src = src;
    await img.decode();

    const cropW = img.naturalWidth;
    const cropH = Math.round(cropW / RATIO);
    const outH = Math.round(OUT_WIDTH / RATIO);

    const canvas = document.createElement("canvas");
    canvas.width = OUT_WIDTH;
    canvas.height = outH;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, CROP_TOP, cropW, cropH, 0, 0, OUT_WIDTH, outH);

    return {
      data: canvas.toDataURL("image/webp", 0.88).split(",")[1],
      w: OUT_WIDTH,
      h: outH,
      natural: `${img.naturalWidth}x${img.naturalHeight}`,
      crop: `${cropW}x${cropH} from y=${CROP_TOP}`,
    };
  },
  { src, RATIO, CROP_TOP, OUT_WIDTH }
);

await browser.close();

const buf = Buffer.from(out.data, "base64");
writeFileSync(OUTPUT, buf);
console.log(
  `about-hero-banner.webp  ${out.w}x${out.h}  ${Math.round(buf.length / 1024)}kB` +
    `  (source ${out.natural}, crop ${out.crop})`
);
