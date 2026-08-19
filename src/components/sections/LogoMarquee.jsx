import { brands } from "../../data/footer";

/**
 * The template's logo marquee, in both of the treatments it ships with:
 *
 * - "dark"  - `tj-brand-section` + `brand-slider-1`, the band used on the
 *             home page (index.html).
 * - "light" - `tj-brand-section-two` + `brand-slider-2`, the version on
 *             about.html, whose label sits in a pill on a ruled line.
 *
 * The slide list is repeated so the continuous-autoplay loop has enough
 * slides to wrap without a visible gap on wide screens. Four organizations
 * at a 195px tile is 780px of track, so it takes three passes rather than
 * the two the template's six logos needed.
 */
const TRACK_REPEATS = 3;

export default function LogoMarquee({ content, variant = "dark" }) {
  const isLight = variant === "light";
  const sliderClass = isLight ? "brand-slider-2" : "brand-slider-1";

  const slides = Array.from({ length: TRACK_REPEATS }, () => brands)
    .flat()
    .map((brand, i) => (
      <div className="swiper-slide" key={`${brand.src}-${i}`}>
        <div className="brand-logo">
          {/* Only the first pass is announced; the repeats are the same
              logos again purely to fill the track. */}
          <img src={brand.src} alt={i < brands.length ? brand.name : ""} loading="lazy" />
        </div>
      </div>
    ));

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
                <div className={`swiper ${sliderClass} swiper-container`}>
                  <div className="swiper-wrapper brand_wrapper">{slides}</div>
                </div>
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
            <div className="tj-brand-slider">
              <div className={`swiper ${sliderClass} swiper-container`}>
                <div className="swiper-wrapper brand_wrapper">{slides}</div>
              </div>
            </div>
            <div className="bt-experience-note wow fadeInUp" data-wow-delay="0.2s">
              <p>{content.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
