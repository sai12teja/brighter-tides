import { Link } from "react-router-dom";
import { faq } from "../../data/home";
import FaqAccordion from "../sections/FaqAccordion";

/**
 * "Common Questions" - the template's Home 07 FAQ layout (`h7-faq`): the
 * accordion across two thirds of the row, and a photographic panel beside it.
 *
 * The template puts this section's only heading inside that panel, and on its
 * own page that works - the panel is the tall thing you meet first. Here it
 * did not: at `lg` the panel sits to the *right* of twelve numbered questions,
 * so the column of questions arrived with nothing naming it, and in the source
 * the section's `h2` came after all twelve of them - a heading that follows
 * its own content is no heading at all to anything reading the outline.
 *
 * So the section takes the same centred `sec-heading` every other section on
 * this page uses, and the panel keeps the job its copy was already doing: the
 * way out for a question the list does not answer.
 *
 * `h7-faq` sits on the row rather than the section, which it has to. The
 * template scopes the banner's overlay to `.h7-faq .sec-heading` - absolute,
 * pinned 30px from the top, `sec-title` in white - written when the only
 * `.sec-heading` under that class was the one inside the banner. With the
 * class on the section, a heading above the row matched it too: lifted out of
 * flow onto the questions and painted white on white. On the row, the
 * selector reaches only what it was drawn for, and every `.h7-faq .faq-banner`
 * rule still resolves because the banner is inside that row.
 */
export default function Faq() {
  return (
    <section className="bt-faq-section section-space">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sec-heading text-center bt-narrow-heading">
              <span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
                {faq.eyebrow}
              </span>
              <h2 className="sec-title text-anim">{faq.title}</h2>
            </div>
          </div>
        </div>

        {/* Natural order now, not `flex-column-reverse`: that existed to float
            the panel above the questions on a phone, back when the panel was
            the heading. With a real heading above the row, the reading order
            is simply heading, questions, then the way to ask. */}
        <div className="row rg-50 h7-faq">
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
                {/* `h3`, and no eyebrow: the section's own heading is above,
                    and a second `h2` with a second eyebrow beside it read as
                    two competing titles for one block of questions. */}
                <h3 className="bt-faq-panel-title">{faq.panelTitle}</h3>
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
