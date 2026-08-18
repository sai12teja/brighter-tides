import { challenge } from "../../data/home";

/**
 * The problem statement, as a 2x2 grid built from the same `feature-item`
 * card the Core Expertise section uses.
 */
export default function Challenge() {
  return (
    <section className="bt-challenge-section section-space">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sec-heading text-center bt-narrow-heading">
              <span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
                {challenge.eyebrow}
              </span>
              <h2 className="sec-title text-anim">{challenge.title}</h2>
              <div className="desc wow fadeInUp" data-wow-delay="0.3s">
                <p>{challenge.desc}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row rg-30">
          {challenge.items.map((item, i) => (
            <div className="col-lg-6 col-md-6" key={item.title}>
              <div className="feature-item hover-bg wow fadeInUp" data-wow-delay={`${0.1 + i * 0.15}s`}>
                <div className="feature-icon">
                  <i className={item.icon}></i>
                </div>
                <div className="feature-content">
                  <h5 className="title">{item.title}</h5>
                  <div className="desc">
                    <p>{item.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-12">
            <div className="bt-challenge-note wow fadeInUp" data-wow-delay="0.3s">
              <p>{challenge.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
