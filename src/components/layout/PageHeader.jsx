import { Link } from "react-router-dom";

/**
 * Breadcrumb banner used at the top of every inner page.
 * `crumbs` is the trail between Home and the current page, e.g.
 * [{ label: "Services", to: "/services" }].
 *
 * `image` is the backdrop behind the 82% navy scrim. It defaults to the
 * about page's office frame, which is the neutral one of the set - so a page
 * that has no photograph of its own still gets a real one rather than the
 * template's placeholder.
 */
const DEFAULT_IMAGE = "/assets/images/bt/photos/about-hero.webp";

export default function PageHeader({ title, crumbs = [], image = DEFAULT_IMAGE }) {
  return (
    <section className="tj-page-header" data-bg-image={image}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="tj-page-header-content text-center">
              <h1 className="tj-page-title text-anim">{title}</h1>
              <div className="tj-page-link wow fadeInUp" data-wow-delay="0.1s">
                <span>
                  <Link to="/">
                    <span>Home</span>
                  </Link>
                </span>
                {crumbs.map((crumb) => (
                  <span key={crumb.to} style={{ display: "contents" }}>
                    <span>/</span>
                    <span>
                      <Link to={crumb.to}>
                        <span>{crumb.label}</span>
                      </Link>
                    </span>
                  </span>
                ))}
                <span>/</span>
                <span>
                  <span>{title}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
