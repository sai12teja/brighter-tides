import { Link } from "react-router-dom";

import Seo from "../components/seo/Seo";
import PageHeader from "../components/layout/PageHeader";
import CtaBand from "../components/sections/CtaBand";
import { services } from "../data/navigation";
import { notFoundSeo } from "../lib/pageSeo";

/**
 * The catch-all route.
 *
 * It used to render the home page, which meant every mistyped or stale URL
 * answered 200 with the full home page on it - a soft 404 to a crawler, and
 * an unbounded set of duplicate copies of the home page to index. This says
 * what happened, keeps the visitor moving with the links they were probably
 * after, and takes itself out of the index.
 *
 * The `noindex` is the honest half of the fix, not the whole of it: a static
 * host still serves this with a 200 status. See the note in public/robots.txt.
 */
const closing = {
  title: "Tell Us What You Were Looking For.",
  paragraphs: ["If something sent you here that should have worked, we would like to know."],
  cta: { label: "Get in Touch", to: "/contact" },
};

export default function NotFound() {
  return (
    <>
      <Seo {...notFoundSeo} />
      <PageHeader title="Page Not Found" />

      <section className="tj-service-area section-space">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-10 mx-auto text-center">
              <div className="sec-heading">
                <h2 className="sec-title">This page has moved or never existed.</h2>
                <div className="desc">
                  <p>Here is everything else on the site:</p>
                </div>
              </div>
              <div className="service-check-list bt-notfound-links">
                <ul>
                  <li>
                    <i className="tji-double-check"></i>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <i className="tji-double-check"></i>
                    <Link to="/about">About Shannon Chapman</Link>
                  </li>
                  <li>
                    <i className="tji-double-check"></i>
                    <Link to="/services">ServiceNow Advisory Services</Link>
                  </li>
                  {services.map((service) => (
                    <li key={service.slug}>
                      <i className="tji-double-check"></i>
                      <Link to={`/services/${service.slug}`}>{service.label}</Link>
                    </li>
                  ))}
                  <li>
                    <i className="tji-double-check"></i>
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand content={closing} size="compact" />
    </>
  );
}
