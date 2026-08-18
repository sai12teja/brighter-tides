import { Link } from "react-router-dom";
import { services } from "../../data/services";
import { servicesSection } from "../../data/home";

export default function Services() {
  return (
    <section id="services" className="tj-service-section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sec-heading">
              <div className="sec-text">
                <span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
                  {servicesSection.eyebrow}
                </span>
                <h2 className="sec-title text-anim">{servicesSection.title}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="service-wrapper">
              {services.map((service) => (
                <div className={`service-item${service.stacked ? " service-stack" : ""}`} key={service.number}>
                  <div className="service-content">
                    <div className="service-number">
                      <span className="active">{service.number}</span>
                      <span>/{services.length}</span>
                    </div>
                    <div className="service-text">
                      <div className="service-icons">
                        <img src={service.icon} alt="Icons" />
                      </div>
                      <h3 className="title">
                        <Link to={service.to}>
                          {service.titleLines[0]} <br /> {service.titleLines[1]}
                        </Link>
                      </h3>
                      <div className="desc">
                        {service.lead && <p className="service-lead">{service.lead}</p>}
                        <p>{service.desc}</p>
                      </div>

                      <Link to={service.to} className="tj-primary-btn service-btn">
                        <div className="btn_inner">
                          <div className="btn_icon">
                            <span>
                              <i className="tji-arrow-right"></i>
                              <i className="tji-arrow-right"></i>
                            </span>
                          </div>
                          <div className="btn_text">
                            <span>Explore Service</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="service-images hover:shine">
                    {/* The card's image half is 645px on desktop and full
                        width below lg. Cards that have a photograph carry a
                        second width for it; the ones still on the template's
                        placeholder have only the one. */}
                    <img
                      src={service.image}
                      srcSet={
                        service.imageSmall
                          ? `${service.imageSmall} 645w, ${service.image} 1290w`
                          : undefined
                      }
                      sizes={service.imageSmall ? "(max-width: 991px) 100vw, 645px" : undefined}
                      alt={service.imageAlt || ""}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
