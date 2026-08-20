import { brands } from "../../data/footer";

/**
 * The experience logos, on a continuous rail.
 *
 * This was the template's Swiper marquee. Swiper is 50KB of script and 5KB of
 * CSS, and it was the only thing on the site still using either - a JavaScript
 * slider, running its own animation loop, to move a row of logos at a constant
 * speed in one direction. Worse, main.js constructs it unguarded the moment a
 * `.brand-slider-1` exists on the page, which pinned Swiper to the critical
 * path: nothing else in the bundle could be deferred while that call could
 * throw.
 *
 * A CSS animation does the same job on the compositor, at no cost to the main
 * thread and none to the bundle. The track is rendered twice and translated by
 * exactly its own width, so the second copy is where the first was when the
 * animation restarts and the seam never lands on screen.
 *
 * The second copy is `aria-hidden`, and only the first pass of the first copy
 * carries alt text - past that the same logos are repeating to fill the rail,
 * and a screen reader should hear the list once.
 */

/** Passes per track. Four logos at a 195px tile is 780px, which is short of a
 *  wide screen; three passes fill it and keep the rail dense. */
const TRACK_REPEATS = 3;

function Track({ announce }) {
  return (
    <ul className="bt-marquee-track" aria-hidden={announce ? undefined : "true"}>
      {Array.from({ length: TRACK_REPEATS }, () => brands)
        .flat()
        .map((brand, i) => (
          <li className="brand-logo" key={`${brand.src}-${i}`}>
            <img
              src={brand.src}
              alt={announce && i < brands.length ? brand.name : ""}
              width="195"
              height="74"
              loading="lazy"
              decoding="async"
            />
          </li>
        ))}
    </ul>
  );
}

export default function LogoMarquee({ content, variant = "dark" }) {
  const isLight = variant === "light";

  const rail = (
    <div className="bt-marquee">
      <Track announce />
      <Track />
    </div>
  );

  if (isLight) {
    return (
      <section className="tj-brand-section-two section-bottom-space bt-experience-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="sec-heading text-center bt-narrow-heading">
                <span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
                  {content.eyebrow}
                </span>
                <h2 className="sec-title text-anim">{content.title}</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="tj-brand-slider wow fadeInUp" data-wow-delay="0.3s">
                {rail}
              </div>
              <div className="bt-experience-note wow fadeInUp" data-wow-delay="0.5s">
                <p>{content.note}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="tj-brand-section bt-experience-section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sec-heading text-center bt-narrow-heading">
              <span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
                {content.eyebrow}
              </span>
              <h2 className="sec-title text-anim">{content.title}</h2>
            </div>
            <div className="tj-brand-slider">{rail}</div>
            <div className="bt-experience-note wow fadeInUp" data-wow-delay="0.2s">
              <p>{content.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
