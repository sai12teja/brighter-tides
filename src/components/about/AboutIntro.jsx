import { hero } from "../../data/about";

/**
 * about.html's opening "About Section" (`tj-about-info`): eyebrow and title
 * on the left, the copy on the right. The template's page header itself
 * carries only a title and breadcrumb - every one of its 24 inner pages does
 * - so the page's real opening statement belongs here, exactly where the
 * template puts it.
 *
 * The template treats the right-hand side as one undifferentiated block of
 * body copy, which is what a single sentence needed. Three paragraphs need a
 * shape: the first is the claim and is set as a lead, the two under it are
 * the supporting detail. See `.bt-page-intro` in brand.css for the rest.
 */
export default function AboutIntro() {
  const [lead, ...supporting] = hero.paragraphs;

  return (
    <section className="tj-about-info section-space bt-page-intro">
      <div className="container">
        {/* Top-aligned, with the copy dropped to the headline's first line
            rather than the eyebrow's - the two columns then open together
            and are free to end wherever their own length puts them. */}
        <div className="row rg-30 justify-content-between">
          <div className="col-lg-6 col-md-12">
            <div className="pricing-left-content">
              <div className="sec-heading mb-0">
                <span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
                  {hero.eyebrow}
                </span>
                <h2 className="sec-title text-anim">{hero.title}</h2>
                <span
                  className="bt-page-intro-rule wow fadeInUp"
                  data-wow-delay="0.4s"
                  aria-hidden="true"
                ></span>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="desc mb-0 bt-page-intro-copy wow fadeInUp" data-wow-delay="0.3s">
              <p className="bt-page-intro-lead">{lead}</p>
              {supporting.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
