import { hero } from "../../data/contact";

/**
 * contact.html opens with a centred `sec-heading` above its card row - the
 * "CONTACT US / Our contact information" block. The page's real opening
 * statement goes here, since the template's page header carries only a title
 * and breadcrumb on every one of its inner pages.
 */
export default function ContactIntro() {
  return (
    <section className="tj-contact-area section-space bt-contact-intro">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-12">
            <div className="sec-heading text-center mb-0">
              <span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
                {hero.eyebrow}
              </span>
              <h2 className="sec-title text-anim">{hero.title}</h2>
              <div className="desc wow fadeInUp" data-wow-delay="0.3s">
                <p className="bt-lead">{hero.lead}</p>
                <p>{hero.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
