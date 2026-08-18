import { Link } from "react-router-dom";

import BrandLogo from "./BrandLogo";
import { socialLinks } from "../../data/footer";
import { headerCta } from "../../data/navigation";
import { email, location } from "../../data/site";

export default function HamburgerMenu() {
  return (
    <>
      <div className="body-overlay"></div>
      <div className="hamburger-area" data-lenis-prevent>
        <div className="hamburger_bg"></div>
        <div className="hamburger_wrapper">
          <div className="hamburger_top d-flex align-items-center justify-content-between">
            <div className="hamburger_logo">
              <BrandLogo className="mobile_logo" />
            </div>
            <div className="hamburger_close">
              <button className="hamburger_close_btn hamburgerCloseBtn">
                <i className="fa-thin fa-times"></i>
              </button>
            </div>
          </div>
          {/* meanmenu.js clones #main-menu's markup into this container at runtime */}
          <div className="hamburger_menu">
            <div className="mobile_menu"></div>
          </div>

          {/* The header's call to action is `d-none d-md-inline-flex` - on a
              phone it is not on the page at all, which left the drawer as the
              only navigation with no way to act on it. It sits below the menu
              rather than above it so the nav still opens the drawer.

              This replaced the template's search field, which submitted
              nowhere: the drawer is the most valuable surface on a phone and
              a control that does nothing is a poor use of it. The markup is
              in the file's history if a working search ever arrives. */}
          <div className="bt-hamburger-cta">
            <Link to={headerCta.to} className="tj-primary-btn">
              <div className="btn_inner">
                <div className="btn_icon">
                  <span>
                    <i className="tji-arrow-right"></i>
                    <i className="tji-arrow-right"></i>
                  </span>
                </div>
                <div className="btn_text">
                  <span>{headerCta.label}</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="hamburger-infos">
            <h4 className="hamburger-title">Contact info</h4>
            <div className="contact-info">
              <div className="contact_item">
                <span className="subtitle">Email</span>
                <div className="text">
                  <a className="link" href={`mailto:${email}`}>
                    {email}
                  </a>
                </div>
              </div>
              <div className="contact_item">
                <span className="subtitle">Based in</span>
                <div className="text">{location.label}</div>
              </div>
            </div>
          </div>
          <div className="hamburger-socials">
            <h4 className="hamburger-title">Follow us</h4>
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
        </div>
      </div>
    </>
  );
}
