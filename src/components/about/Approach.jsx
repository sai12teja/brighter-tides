import { approach } from "../../data/about";

/**
 * "Our Approach" - about.html's four-card feature row
 * (`tj-feature-section section-bottom-space`, four `col-lg-3` cards). The
 * template's own about page runs these cards without a heading; the eyebrow
 * and title use the same `sec-heading` block every other section uses.
 */
export default function Approach() {
  return (
    <section className="tj-feature-section section-bottom-space">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sec-heading text-center bt-narrow-heading">
              <span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
                {approach.eyebrow}
              </span>
              <h2 className="sec-title text-anim">{approach.title}</h2>
            </div>
          </div>
        </div>
        <div className="row rg-30">
          {approach.items.map((item, i) => (
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
