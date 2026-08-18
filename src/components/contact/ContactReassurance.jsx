import { reassurance } from "../../data/contact";

/**
 * Repurposes contact.html's "Our contact information" card row
 * (`contact-item style-2`), exactly as the content guide asks. The template
 * used those cards for phone / address / live-chat; here they carry what
 * happens after an inquiry is sent, which is the reassurance this business
 * actually needs to give.
 *
 * Three cards across `col-lg-4` rather than the template's four `col-xl-3`,
 * so the row stays balanced instead of leaving a gap.
 */
export default function ContactReassurance() {
  return (
    <section className="tj-contact-area section-bottom-space">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sec-heading text-center">
              <span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
                {reassurance.eyebrow}
              </span>
              <h2 className="sec-title text-anim">{reassurance.title}</h2>
            </div>
          </div>
        </div>
        <div className="row rg-30">
          {reassurance.steps.map((step, index) => (
            <div className="col-lg-4 col-md-6 col-sm-6" key={step.title}>
              <div className="contact-item style-2 wow fadeInUp" data-wow-delay={`${0.1 + index * 0.2}s`}>
                <div className="contact-icon">
                  <i className={step.icon}></i>
                </div>
                <h3 className="contact-title">{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
