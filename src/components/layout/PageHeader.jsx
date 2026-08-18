import { Link } from "react-router-dom";

/**
 * Breadcrumb banner used at the top of every inner page.
 * `crumbs` is the trail between Home and the current page, e.g.
 * [{ label: "Services", to: "/services" }].
 */
export default function PageHeader({ title, crumbs = [] }) {
  return (
    <section className="tj-page-header" data-bg-image="/assets/images/bg/pheader-bg.webp">
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
