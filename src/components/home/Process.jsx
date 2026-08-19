import { Link } from "react-router-dom";
import { process } from "../../data/home";

/**
 * "How We Work" - the template's Home 07 process layout (`h7-process`):
 * heading, call to action and a photograph down the left, and the steps as
 * cards threaded onto a vertical rail on the right.
 *
 * The rail is the point of it. Three plain columns gave equal weight to three
 * things that happen in order; a numbered rail reads as a sequence, which is
 * what an engagement actually is.
 *
 * `id="tj-process"` is a contract with lib/templateAnimations: that is what
 * the rail's hover tracking looks for.
 */
export default function Process() {
  return (
    <section id="tj-process" className="h7-process section-space">
      <div className="container">
        <div className="row rg-50">
          <div className="col-xl-5 col-lg-5">
            <div className="process-left">
              <div className="sec-heading style-3">
                <span className="sub-title wow fadeInUp" data-wow-delay="0.2s">
                  {process.eyebrow}
                </span>
                <h2 className="sec-title text-anim">{process.title}</h2>
              </div>

              <div className="case-btn wow fadeInUp" data-wow-delay="0.4s">
                <Link to={process.cta.to} className="tj-primary-btn">
                  <div className="btn_inner">
                    <div className="btn_icon">
                      <span>
                        <i className="tji-arrow-right"></i>
                        <i className="tji-arrow-right"></i>
                      </span>
                    </div>
                    <div className="btn_text">
                      <span>{process.cta.label}</span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Desktop only, as the template has it: below `lg` the steps
                  carry the section on their own and the photograph would push
                  the rail off the first screen. */}
              <div className="process-banner d-none d-lg-block wow fadeInUp" data-wow-delay=".5s">
                <div className="process-banner-bg"></div>
                <img src={process.image} alt="" loading="lazy" />
              </div>
            </div>
          </div>

          <div className="col-xl-7 col-lg-7">
            <div className="row">
              <div className="col-12">
                <div className="process-inner">
                  <div className="process-line">
                    <div className="process-line-active"></div>
                  </div>

                  {process.steps.map((step, i) => (
                    <div
                      className={`process-item style-4${i === 0 ? " active" : ""} wow fadeInUp`}
                      data-wow-delay={`${0.3 + i * 0.1}s`}
                      key={step.number}
                    >
                      <div className="process-index">
                        <span>{step.number}</span>
                      </div>
                      <div className="process-content">
                        <h5 className="title">{step.title}</h5>
                        <div className="desc">
                          <p>{step.desc}</p>
                        </div>
                        <Link className="service-button text-btn" to={step.link.to}>
                          {step.link.label} <i className="tji-angle-right"></i>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
