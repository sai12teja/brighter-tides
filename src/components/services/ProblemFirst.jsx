import { Link } from "react-router-dom";
import { problemFirst } from "../../data/servicesPage";

/**
 * "Start With the Problem" - the home page's "Our company" split
 * (`tj-about-section`): copy on the right, the template's shape collage
 * filling the left half.
 */
export default function ProblemFirst() {
  return (
    <section className="tj-about-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6"></div>
          <div className="col-lg-6">
            <div className="about-left-content">
              <div className="sec-heading mb-0">
                <span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
                  {problemFirst.eyebrow}
                </span>
                <h2 className="sec-title text-anim">{problemFirst.title}</h2>
                <div className="desc wow fadeInUp" data-wow-delay="0.3s">
                  <p className="bt-lead-note">{problemFirst.lead}</p>
                  {problemFirst.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <div className="about-btn wow fadeInUp" data-wow-delay="0.5s">
                <Link to={problemFirst.cta.to} className="tj-primary-btn">
                  <div className="btn_inner">
                    <div className="btn_icon">
                      <span>
                        <i className="tji-arrow-right"></i>
                        <i className="tji-arrow-right"></i>
                      </span>
                    </div>
                    <div className="btn_text">
                      <span>{problemFirst.cta.label}</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about-bg-images">
        <div className="about-shape-1 hover:shine">
          <img
            src="/assets/images/bt/photos/services-problem-main.webp"
            alt="Two colleagues talking through a problem in an office"
            width="1490"
            height="1352"
            loading="lazy"
          />
        </div>
        <div className="about-shape-2 hover:shine">
          <img
            src="/assets/images/bt/photos/services-problem-small.webp"
            alt="A client listening in conversation"
            width="400"
            height="396"
            loading="lazy"
          />
        </div>
        <div className="about-shape-3 zoominout">
          <img src="/assets/images/bt/star.svg" alt="Shapes" />
        </div>
      </div>
    </section>
  );
}
