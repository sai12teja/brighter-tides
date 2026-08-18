import { brands } from "../../data/footer";

/**
 * The template's logo marquee, in both of the treatments it ships with:
 *
 * - "dark"  - `tj-brand-section` + `brand-slider-1`, the band used on the
 *             home page (index.html).
 * - "light" - `tj-brand-section-two` + `brand-slider-2`, the version on
 *             about.html, whose label sits in a pill on a ruled line.
 *
 * The slide list is doubled so the continuous-autoplay loop has enough
 * slides to wrap without a visible gap on wide screens.
 */
export default function LogoMarquee({ content, variant = "dark" }) {
  const isLight = variant === "light";
  const sliderClass = isLight ? "brand-slider-2" : "brand-slider-1";

  const slides = [...brands, ...brands].map((brand, i) => (
    <div className="swiper-slide" key={`${brand}-${i}`}>
      <div className="brand-logo">
        <img src={brand} alt="Brand" />
      </div>
    </div>
  ));

  if (isLight) {
    return (
      <section className="tj-brand-section-two section-bottom-space bt-experience-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="sec-heading text-center wow fadeInUp" data-wow-delay="0.1s">
                <h6 className="sec-title">{content.label}</h6>
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
            <div className="bt-experience-label wow fadeInUp" data-wow-delay="0.1s">
              <span className="sub-title">{content.label}</span>
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
