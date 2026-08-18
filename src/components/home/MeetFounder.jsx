import { Link } from "react-router-dom";
import { founder } from "../../data/home";
import StatsGrid from "../sections/StatsGrid";

/**
 * Founder introduction: portrait on the left, substantial copy on the right.
 * Mirrors the About page "Our Evolution" split, with the video treatment
 * swapped for Shannon's portrait.
 */
export default function MeetFounder() {
  return (
    <section className="bt-founder-section section-space">
      <div className="container">
        <div className="row align-items-center rg-50">
          <div className="col-lg-5">
            <div className="bt-founder-images wow fadeInLeft" data-wow-delay="0.1s">
              <div className="hover:shine">
                <img src={founder.image} alt={`${founder.name}, ${founder.role} of Brighter Tides`} />
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="bt-founder-content">
              <div className="sec-heading">
                <span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
                  {founder.eyebrow}
                </span>
                <h2 className="sec-title text-anim">{founder.title}</h2>
              </div>
              <div className="bt-founder-identity wow fadeInUp" data-wow-delay="0.3s">
                <h3 className="name">{founder.name}</h3>
                <span className="role">{founder.role}</span>
              </div>
              <div className="desc wow fadeInUp" data-wow-delay="0.4s">
                {founder.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <StatsGrid items={founder.stats} delayFrom={0.4} />
              <div className="bt-founder-button wow fadeInUp" data-wow-delay="0.8s">
                <Link to={founder.cta.to} className="tj-primary-btn">
                  <div className="btn_inner">
                    <div className="btn_icon">
                      <span>
                        <i className="tji-arrow-right"></i>
                        <i className="tji-arrow-right"></i>
                      </span>
                    </div>
                    <div className="btn_text">
                      <span>{founder.cta.label}</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
