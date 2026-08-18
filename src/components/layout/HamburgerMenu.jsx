import BrandLogo from "./BrandLogo";
import { socialLinks } from "../../data/footer";

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
          <div className="hamburger_search">
            <form method="get" action="#0" onSubmit={(e) => e.preventDefault()}>
              <button type="submit">
                <i className="fal fa-search"></i>
              </button>
              <input type="search" autoComplete="off" name="s" defaultValue="" placeholder="Search here" />
            </form>
          </div>

          {/* meanmenu.js clones #main-menu's markup into this container at runtime */}
          <div className="hamburger_menu">
            <div className="mobile_menu"></div>
          </div>

          <div className="hamburger-infos">
            <h4 className="hamburger-title">Contact info</h4>
            <div className="contact-info">
              <div className="contact_item">
                <span className="subtitle">Email</span>
                <div className="text">
                  <a className="link" href="mailto:hello@brightertides.com">
                    hello@brightertides.com
                  </a>
                </div>
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
