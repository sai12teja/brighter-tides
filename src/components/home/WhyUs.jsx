import { whyUs } from "../../data/home";

/** Four differentiators, reusing the template's feature-card layout. */
export default function WhyUs() {
  return (
    <section className="bt-why-section section-space">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sec-heading text-center bt-narrow-heading">
              <span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
                {whyUs.eyebrow}
              </span>
              <h2 className="sec-title text-anim">{whyUs.title}</h2>
            </div>
          </div>
        </div>
        <div className="row rg-30">
          {whyUs.items.map((item, i) => (
            <div className="col-lg-3 col-md-6 col-sm-6" key={item.title}>
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
      </div>
    </section>
  );
}
