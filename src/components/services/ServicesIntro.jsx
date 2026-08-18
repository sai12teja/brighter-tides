import { hero } from "../../data/servicesPage";

/**
 * Opening statement, in the template's `tj-about-info` split - eyebrow and
 * title left, the paragraph right. The template's page header carries only a
 * title and breadcrumb on every inner page, so the page's real opening line
 * belongs here.
 */
export default function ServicesIntro() {
  return (
    <section className="tj-about-info section-space">
      <div className="container">
        <div className="row rg-30 justify-content-between align-items-end">
          <div className="col-lg-6 col-md-12">
            <div className="pricing-left-content">
              <div className="sec-heading mb-0">
                <span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
                  {hero.eyebrow}
                </span>
                <h2 className="sec-title text-anim">{hero.title}</h2>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="desc mb-0 wow fadeInUp" data-wow-delay="0.3s">
              <p>{hero.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
