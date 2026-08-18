import { features } from "../../data/features";
import { expertise } from "../../data/home";
import { FEATURE_ICON_MAP } from "../icons/FeatureIcons";

export default function Features() {
  return (
    <section className="tj-feature-section with-shape">
      <div className="tj-feature-section-wrap section-space">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="sec-heading text-center bt-narrow-heading">
                <span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
                  {expertise.eyebrow}
                </span>
                <h2 className="sec-title text-anim">{expertise.title}</h2>
              </div>
            </div>
          </div>
          {/* `bt-even-titles`: one of these four titles wraps to two lines -
              the slot keeps every card's description on the same line. */}
          <div className="row rg-30 bt-even-titles">
            {features.map((feature) => {
              const Icon = FEATURE_ICON_MAP[feature.icon];
              return (
                <div className="col-lg-3 col-md-6 col-sm-6" key={feature.id}>
                  <div className="feature-item hover-bg">
                    <div className="feature-icon svg-animate">
                      <Icon />
                    </div>
                    <div className="feature-content">
                      <h5 className="title">{feature.title}</h5>
                      <div className="desc">
                        <p>{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
