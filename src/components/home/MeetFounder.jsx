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
            <figure className="bt-founder-images wow fadeInLeft" data-wow-delay="0.1s">
              <div className="bt-founder-frame">
                <div className="hover:shine">
                  <img
                    src={founder.image}
                    srcSet={`${founder.imageTiny} 430w, ${founder.imageSmall} 645w, ${founder.image} 1290w`}
                    sizes="(max-width: 991px) 100vw, 545px"
                    alt={`${founder.name}, ${founder.role}`}
                    width="1290"
                    height="1592"
                    loading="lazy"
                  />
                </div>
                {/* The portrait carries the identity, so the copy column can go
                    straight from the heading into what Shannon actually does. */}
                <figcaption className="bt-founder-caption">
                  <span className="name">{founder.name}</span>
                  <span className="role">{founder.role}</span>
                </figcaption>
              </div>
            </figure>
          </div>
          <div className="col-lg-7">
            <div className="bt-founder-content">
              <div className="sec-heading">
                <span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
                  {founder.eyebrow}
                </span>
                <h2 className="sec-title text-anim">{founder.title}</h2>
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
