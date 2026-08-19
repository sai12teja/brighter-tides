import { Link } from "react-router-dom";
import { hero } from "../../data/servicesPage";
import { services } from "../../data/navigation";

/**
 * Opening statement, in the template's `tj-about-info` split - eyebrow and
 * title left, the copy right. The template's page header carries only a title
 * and breadcrumb on every inner page, so the page's real opening line belongs
 * here.
 *
 * It takes the same treatment as the about page's opening statement - see
 * `.bt-page-intro` in brand.css, where the first paragraph is set as the lead
 * and the rest as supporting detail - and adds the one thing that section does
 * not need: an index. Two paragraphs beside a three-line headline still leave
 * the column short.
 *
 * The three advisory areas fill it, and they are the right thing to fill it
 * with: they name what the page covers before the visitor has scrolled, and
 * each is a way into its own page. They come from data/navigation, the same
 * source as the menu and the cards further down, so the page cannot list a
 * service the site does not route to.
 */
export default function ServicesIntro() {
  const [lead, ...supporting] = hero.paragraphs;

  return (
    <section className="tj-about-info section-space bt-page-intro">
      <div className="container">
        {/* Top-aligned, with the copy dropped to the headline's first line
            rather than the eyebrow's - the two columns open together and end
            wherever their own length puts them. */}
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

              <ul className="bt-services-index">
                {services.map((service, i) => (
                  <li key={service.slug}>
                    <Link to={`/services/${service.slug}`}>
                      <span className="index" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="title">{service.label}</span>
                      <span className="nav" aria-hidden="true">
                        <i className="tji-arrow-right"></i>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
