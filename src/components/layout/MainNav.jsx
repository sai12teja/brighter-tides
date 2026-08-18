import { NavLink } from "react-router-dom";
import { navLinks } from "../../data/navigation";

export default function MainNav({ id }) {
  return (
    <div className="mainmenu d-lg-block d-none" id={id}>
      <ul>
        {navLinks.map((link) => (
          <li key={link.label} className={link.children ? "has-dropdown" : undefined}>
            <NavLink
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              {link.label}
            </NavLink>
            {link.children && (
              <ul className="sub-menu mega-menu-service">
                {link.children.map((child) => (
                  <li key={child.to}>
                    <NavLink className="mega-menu-service-single" to={child.to}>
                      <span className="mega-menu-service-icon">
                        <i className={child.icon}></i>
                      </span>
                      <span className="mega-menu-service-title">{child.label}</span>
                      <span className="mega-menu-service-nav">
                        <i className="tji-arrow-right"></i>
                        <i className="tji-arrow-right"></i>
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
