import { purpose } from "../../data/about";

/**
 * "Our Purpose" - image and copy side by side on the template's light band
 * (`tj-about-section-two`).
 *
 * The template's own `.about-wrapper` sizes its two children to fixed widths
 * (400px image + 435px copy) because index-2.html fills the rest of the row
 * with a stat box. Without that third element the row would leave ~350px of
 * dead space, so the split is laid out with the template's own grid utilities
 * instead - the type, spacing, and background all still come from main.css.
 */
export default function Purpose() {
  return (
    <section className="tj-about-section-two section-space">
      <div className="container">
        <div className="row rg-50 align-items-center">
          <div className="col-lg-6">
            <div className="about-images-group-one hover:shine wow fadeInUp" data-wow-delay="0.1s">
              <img src={purpose.image} alt="Images" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="sec-heading mb-0">
              <span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
                {purpose.eyebrow}
              </span>
              <h2 className="sec-title text-anim">{purpose.title}</h2>
              <div className="desc wow fadeInUp" data-wow-delay="0.3s">
                {purpose.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p className="bt-lead-note">{purpose.note}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
