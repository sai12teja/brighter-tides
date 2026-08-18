import { Link, useLocation } from "react-router-dom";
import {
  footerBrand,
  footerCompany,
  footerServices,
  footerConnect,
  footerLegal,
  socialLinks,
  copyright,
} from "../../data/footer";

// The brand/logo marquee that used to open the footer now lives on the pages
// themselves - see components/sections/LogoMarquee.

export default function Footer() {
  // `.footerStack` is `position: sticky; bottom: 0` - the page scrolls over a
  // pinned footer. The template applies it on index.html only, and every home
  // section paints an opaque background to cover it. Inner pages use the
  // plain footer; wrapping them too made the footer show through any section
  // that did not set its own background.
  const isHome = useLocation().pathname === "/";

  return (
    // Always the same element, with the sticky class toggled: returning a
    // different root type per route made React unmount the whole footer on
    // every crossing of the Home boundary, and main.js binds the GO TOP
    // button once at load (it captures `#back_to_top` and
    // `.back-to-top-wrapper` in a closure), so after a remount the button
    // could never be shown again.
    <div className={isHome ? "footerStack" : undefined}>
      <footer id="contact" className={`tj-footer-area${isHome ? " footer-1" : ""}`}>
      <div className="footer-top-area fix">
        <div className="container">
          {/* `line` draws the vertical rule that sets the fourth column
              apart, exactly as in the template's own footer. */}
          <div className="row rg-50 line">
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
              <div className="footer-widget footer1-col-1">
                <div className="footer-title">
                  <h4 className="title">{footerBrand.name}</h4>
                </div>
                <p className="bt-footer-blurb">{footerBrand.desc}</p>
              </div>
            </div>

            <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6">
              <div className="footer-widget footer1-col-2 widget_nav_menu">
                <div className="footer-title">
                  <h4 className="title">Company</h4>
                </div>
                <div className="widget-menu">
                  <ul>
                    {footerCompany.map((link) => (
                      <li key={link.to}>
                        <Link to={link.to}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
              <div className="footer-widget footer1-col-3 widget_nav_menu">
                <div className="footer-title">
                  <h4 className="title">Services</h4>
                </div>
                <div className="widget-menu">
                  <ul>
                    {footerServices.map((link) => (
                      <li key={link.to}>
                        <Link to={link.to}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
              <div className="footer-widget footer1-col-4 bt-footer-connect">
                <div className="newsletter-title">
                  <h3 className="title">Connect</h3>
                </div>
                <a className="bt-footer-email" href={`mailto:${footerConnect.email}`}>
                  {footerConnect.email}
                </a>
                <a
                  className="text-btn bt-footer-linkedin"
                  href={footerConnect.linkedin.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {footerConnect.linkedin.label} <i className="tji-arrow-right" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-copyright-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="copyright-content-area">
                <div className="copyright-text">
                  <p>
                    © {new Date().getFullYear()} {copyright}
                  </p>
                </div>
                <div className="copyright-socails">
                  <ul>
                    {socialLinks.map((social) => (
                      <li key={social.icon}>
                        <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
                          <i className={`fa-brands ${social.icon}`}></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="copyright-menu">
                  <ul>
                    {footerLegal.map((item) =>
                      item.to ? (
                        <li key={item.label}>
                          <Link to={item.to}>{item.label}</Link>
                        </li>
                      ) : (
                        <li key={item.label}>
                          <span className="bt-footer-pending">{item.label}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <div className="back-to-top-wrapper">
          <button id="back_to_top" type="button" className="back-to-top-btn style-2">
            <i className="tji-arrow-up"></i>
            <span>GO TOP</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
