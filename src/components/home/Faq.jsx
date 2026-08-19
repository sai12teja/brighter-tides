import { Link } from "react-router-dom";
import { faq } from "../../data/home";
import FaqAccordion from "../sections/FaqAccordion";

/**
 * "Common Questions" - the template's Home 07 FAQ layout (`h7-faq`): the
 * accordion across two thirds of the row, and a photographic panel beside it
 * carrying the section's heading.
 *
 * `flex-column-reverse flex-lg-row` is the template's own ordering: the panel
 * leads on a phone, where it acts as the section's heading, and moves to the
 * right of the questions from `lg` up.
 */
export default function Faq() {
  return (
    <section className="bt-faq-section h7-faq section-space">
      <div className="container">
        <div className="row flex-column-reverse flex-lg-row rg-50">
          <div className="col-12 col-lg-8">
            <div className="tj-faq">
              {/* `h7-faq-style` is what numbers the questions and moves the
                  toggle to a circle on the right. */}
              <FaqAccordion id="bt-home-faq" items={faq.items} numbered variant="h7-faq-style bt-faq-premium" />
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="faq-banner wow fadeInUp" data-wow-delay="0.1s">
              <img src={faq.image} alt="" loading="lazy" />
              <div className="sec-heading h7-section-heading style-4">
                <span className="sub-title">{faq.eyebrow}</span>
                <h2 className="sec-title text-anim">{faq.panelTitle}</h2>
                <p className="bt-faq-panel-note">{faq.panelNote}</p>
                <Link to={faq.panelCta.to} className="tj-primary-btn white-btn bt-faq-panel-btn">
                  <div className="btn_inner">
                    <div className="btn_icon">
                      <span>
                        <i className="tji-arrow-right"></i>
                        <i className="tji-arrow-right"></i>
                      </span>
                    </div>
                    <div className="btn_text">
                      <span>{faq.panelCta.label}</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
