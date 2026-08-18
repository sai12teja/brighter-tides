import { hero } from "../../data/about";

/**
 * about.html's opening "About Section" (`tj-about-info`): eyebrow and title
 * on the left, the paragraph on the right. The template's page header itself
 * carries only a title and breadcrumb - every one of its 24 inner pages does
 * - so the page's real opening statement belongs here, exactly as the
 * template lays it out.
 */
export default function AboutIntro() {
  return (
    <section className="tj-about-info section-space">
      <div className="container">
        {/* Bottom-aligned: the paragraph is far shorter than the three-line
            headline, so top-aligning left it floating with a block of empty
            space under it. Their last lines now sit on one baseline. */}
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
