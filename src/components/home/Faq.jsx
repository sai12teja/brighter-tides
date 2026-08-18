import { faq } from "../../data/home";
import FaqAccordion from "../sections/FaqAccordion";

export default function Faq() {
  return (
    <section className="bt-faq-section section-space">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sec-heading text-center">
              <span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
                {faq.eyebrow}
              </span>
              <h2 className="sec-title text-anim">{faq.title}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-8 col-lg-10 mx-auto">
            <FaqAccordion id="bt-home-faq" items={faq.items} />
          </div>
        </div>
      </div>
    </section>
  );
}
