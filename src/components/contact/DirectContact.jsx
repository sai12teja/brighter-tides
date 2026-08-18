import { direct } from "../../data/contact";

/**
 * Direct contact details, on contact.html's own `contact-item style-2` cards
 * - the same component the template uses for its "Email us / Call us / Our
 * Location / Live chat" row, which is exactly this content.
 *
 * Earlier passes rendered this as a bordered side panel and then as a ruled
 * label/value list. Both were generic: neither used the theme's circular
 * icon badge, its card border, or its hover transition, so the block read as
 * though it came from a different site. This is the template's component,
 * unmodified.
 *
 * Two cards centred rather than the template's four across - there are two
 * real channels, and padding the row out with invented ones (a phone line,
 * an office) would be worse than a shorter row.
 */
export default function DirectContact() {
  return (
    <section className="tj-contact-area bt-direct">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sec-heading text-center">
              <h2 className="sec-title text-anim">{direct.title}</h2>
            </div>
          </div>
        </div>
        <div className="row rg-30 justify-content-center">
          <div className="col-xl-4 col-lg-5 col-md-6 col-sm-6">
            <div className="contact-item style-2 wow fadeInUp" data-wow-delay="0.1s">
              <div className="contact-icon">
                <i className="tji-email"></i>
              </div>
              <h3 className="contact-title">Email us</h3>
              <ul className="contact-list">
                <li>
                  <a href={`mailto:${direct.email}`}>{direct.email}</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-4 col-lg-5 col-md-6 col-sm-6">
            <div className="contact-item style-2 wow fadeInUp" data-wow-delay="0.3s">
              <div className="contact-icon">
                <i className="fa-brands fa-linkedin-in"></i>
              </div>
              <h3 className="contact-title">Connect on LinkedIn</h3>
              <ul className="contact-list">
                <li>
                  <a href={direct.linkedin.href} target="_blank" rel="noreferrer">
                    {direct.linkedin.handle}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p className="bt-direct-note wow fadeInUp" data-wow-delay="0.5s">
              {direct.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
