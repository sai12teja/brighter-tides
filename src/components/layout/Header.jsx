import { Link } from "react-router-dom";
import MainNav from "./MainNav";
import BrandLogo from "./BrandLogo";
import { headerCta, CONTACT_FORM } from "../../data/navigation";
import { email, location } from "../../data/site";

function HeaderRight() {
  return (
    <>
      {/* The template's 'Explore' control opened a site search overlay. There
          is no search to run - the site is five pages of editorial content -
          so the trigger, its popup and the drawer's search field are all
          gone rather than left as a dead end. */}
      <div className="header_right_info d-none d-md-inline-flex">
        <Link to={headerCta.to} className="tj-primary-btn header_btn">
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

      <button className="menu_btn d-lg-none hamburgerBtn">
        Menu
        <span className="cubes">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    </>
  );
}

export default function Header() {
  return (
    <>
      <header id="top" className="tj-header-area header-1 header-absolute">
        <div className="header-topbar">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="header-topbar_wrap">
                  <div className="topbar_note">
                    <i className="tji-check"></i> ServiceNow licensing, strategy and platform leadership
                    <Link to={CONTACT_FORM}>
                      <span>Discuss your challenge</span>
                      <i className="tji-angle-right"></i>
                    </Link>
                  </div>

                  <div className="topbar_infos">
                    {/* No opening hours here. The template published a
                        Mon-Fri 9-18 line; nobody has confirmed those are the
                        practice's, and it advises remotely rather than keeping
                        counter hours, so the bar carries only what is known.

                        The location drops out below lg, where the bar centres
                        and wraps, leaving the email as the only item. Below
                        768px main.css hides the bar outright, so neither
                        shows on a phone - both are in the drawer instead. */}
                    <div className="info_item d-none d-lg-inline-flex">
                      <span>
                        <i className="tji-location"></i>
                      </span>
                      <span>{location.label}</span>
                    </div>
                    <div className="info_item">
                      <span>
                        <i className="tji-email"></i>
                      </span>
                      <a href={`mailto:${email}`}>{email}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-bottom">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="header-wrapper">
                  <div className="site-logo">
                    <BrandLogo />
                  </div>

                  <MainNav id="main-menu" />

                  <HeaderRight />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <header className="tj-header-area header-1 header-duplicate header-sticky">
        <div className="header-bottom">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="header-wrapper">
                  <div className="site-logo">
                    <BrandLogo />
                  </div>

                  <MainNav />

                  <HeaderRight />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
