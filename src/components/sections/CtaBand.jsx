import { Link } from "react-router-dom";

/**
 * The template's closing CTA band (`tj-cta-section`), shared by the home and
 * about pages. `eyebrow` and `paragraphs` are optional - about.html's own CTA
 * is title + button only.
 */
export default function CtaBand({ content, size = "display" }) {
  return (
    <section className={`tj-cta-section bt-final-cta${size === "compact" ? " bt-cta-compact" : ""}`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="cta-wrapper">
              <div className="cta-title">
                {content.eyebrow && (
                  <span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
                    {content.eyebrow}
                  </span>
                )}
                <h2 className="title text-anim">{content.title}</h2>
                {content.paragraphs && (
                  <div className="desc wow fadeInUp" data-wow-delay="0.3s">
                    {content.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>
              <div className="cta-button wow fadeInUp" data-wow-delay="0.4s">
                <Link to={content.cta.to} className="tj-primary-btn white-btn">
                  <div className="btn_inner">
                    <div className="btn_icon">
                      <span>
                        <i className="tji-arrow-right"></i>
                        <i className="tji-arrow-right"></i>
                      </span>
                    </div>
                    <div className="btn_text">
                      <span>{content.cta.label}</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <img className="cta-shape-1" src="/assets/images/shapes/cta-shapes-1.png" alt="" />
      <img className="cta-shape-2" src="/assets/images/shapes/cta-shapes-2.png" alt="" />
    </section>
  );
}
