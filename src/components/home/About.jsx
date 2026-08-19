import { Link } from "react-router-dom";
import { about } from "../../data/home";

export default function About() {
  return (
    // `scroll-hero` is the hero's scroll-down anchor: it belongs on whatever
    // section sits directly under the hero.
    <section className="tj-about-section" id="scroll-hero">
      <div className="container">
        <div className="row">
          <div className="col-lg-6"></div>
          <div className="col-lg-6">
            <div className="about-left-content">
              <div className="sec-heading">
                <span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
                  {about.eyebrow}
                </span>
                <h2 className="sec-title text-anim">{about.title}</h2>
                <div className="desc wow fadeInUp" data-wow-delay="0.3s">
                  {about.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <div className="about-feature-item wow fadeInUp" data-wow-delay="0.5s">
                <div className="feature-box">
                  <div className="feature-left">
                    <div className="check-list-one">
                      <ul>
                        {about.highlights.map((item) => (
                          <li key={item}>
                            <i className="tji-double-check"></i>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="about-button">
                      <Link to={about.cta.to} className="tj-primary-btn">
                        <div className="btn_inner">
                          <div className="btn_icon">
                            <span>
                              <i className="tji-arrow-right"></i>
                              <i className="tji-arrow-right"></i>
                            </span>
                          </div>
                          <div className="btn_text">
                            <span>{about.cta.label}</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about-bg-images">
        <div className="about-shape-1 hover:shine">
          <img
            src="/assets/images/bt/photos/about.webp"
            alt="Three colleagues in discussion around a meeting table"
            width="1490"
            height="1352"
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
