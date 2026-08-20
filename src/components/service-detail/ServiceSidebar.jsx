import { Link } from "react-router-dom";
import { services, CONTACT_FORM } from "../../data/navigation";

/**
 * service-details.html's sidebar: the other services, then a contact card.
 * The current service stays in the list and is marked `active`, exactly as
 * the template does.
 */
export default function ServiceSidebar({ currentSlug }) {
  return (
    <aside className="tj-service-sidebar">
      <div className="tj-sidebar-widget wow fadeInUp" data-wow-delay="0.1s">
        <h5 className="tj-sidebar-widget-title">Advisory services</h5>
        <div className="service-category">
          <ul>
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  className={service.slug === currentSlug ? "active" : undefined}
                  to={`/services/${service.slug}`}
                >
                  {service.label}
                  <i className="tji-angle-right"></i>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="tj-sidebar-widget wow fadeInUp" data-wow-delay="0.3s">
        {/* The contact photograph rather than the template's grey placeholder:
            an empty meeting room carries the card without a face competing
            with the copy laid over it. */}
        <div className="tj-sidebar-cta" data-bg-image="/assets/images/bt/photos/contact-hero.webp">
          <div className="content">
            <div className="icon">
              <img src="/assets/images/logos/brighter-tides-mark.png" alt="" width="256" height="256" />
            </div>
            {/* `h3` is what the theme colours white on this card
                (`.tj-sidebar-cta h3`); any other heading level falls back to
                the dark heading colour and disappears into the gradient. */}
            <h3>Not sure where to start?</h3>
            <p>Start with the problem. We'll help determine the right approach.</p>
          </div>
          <div className="cta-btn">
            {/* Short label deliberately: the widget is ~250px wide and the
                service's own long CTA overflowed the card. The full call to
                action is on the button above the copy and in the closing
                band. */}
            <Link to={CONTACT_FORM} className="tj-primary-btn white-btn">
              <div className="btn_inner">
                <div className="btn_icon">
                  <span>
                    <i className="tji-arrow-right"></i>
                    <i className="tji-arrow-right"></i>
                  </span>
                </div>
                <div className="btn_text">
                  <span>Get in touch</span>
                </div>
              </div>
            </Link>
            {/* Inside `.cta-btn`: that is the positioning context the theme
                gives this shape (`.tj-sidebar-cta .cta-btn .shapes` is
                absolute). As a sibling it stayed in flow and rendered as a
                full-width image across the card. */}
            <img className="shapes move-anim-2" src="/assets/images/shapes/carrow.png" alt="shape" />
          </div>
        </div>
      </div>
    </aside>
  );
}
