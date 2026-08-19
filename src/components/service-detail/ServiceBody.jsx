import { Link } from "react-router-dom";
import FaqAccordion from "../sections/FaqAccordion";

/**
 * The main column of service-details.html (`tj-post-wrapper`): banner image,
 * title, entry copy, a tick list, feature cards and the FAQ accordion.
 *
 * All three services share this shape; blocks a service does not define are
 * skipped, and `engagementFirst` swaps the engagement and outcome order for
 * strategic advisory.
 */
export default function ServiceBody({ slug, service }) {
  const { intro, areas, list, advocate, outcome, engagement, faq } = service;

  const engagementBlock = engagement && (
    <div className="check-list mb-40" key="engagement">
      {engagement.eyebrow && (
        <span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
          {engagement.eyebrow}
        </span>
      )}
      <h4 className="text-anim">{engagement.title}</h4>
      {engagement.paragraphs.map((paragraph, i) => (
        <p className="wow fadeInUp" data-wow-delay={`${0.1 + i * 0.2}s`} key={paragraph}>
          {paragraph}
        </p>
      ))}
    </div>
  );

  const outcomeBlock = outcome && (
    <div className="bt-outcome-box wow fadeInUp" data-wow-delay="0.1s" key="outcome">
      {outcome.eyebrow && <span className="sub-title">{outcome.eyebrow}</span>}
      <h4 className="title">{outcome.title}</h4>
      <p>{outcome.desc}</p>
    </div>
  );

  return (
    <div className="tj-post-wrapper">
      <div className="tj-post-single-post mb-0">
        {/* The banner is 831px wide in the reading column, so it ships at
            1x and 2x like the home page's cards. */}
        <div className="tj-post-thumb hover:shine wow fadeInUp" data-wow-delay="0.1s">
          <img
            src={service.image}
            srcSet={service.imageSmall ? `${service.imageSmall} 831w, ${service.image} 1662w` : undefined}
            sizes={service.imageSmall ? "(max-width: 991px) 100vw, 831px" : undefined}
            alt={service.eyebrow}
            width="1662"
            height="1108"
          />
        </div>

        <span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
          {service.eyebrow}
        </span>
        <h3 className="tj-post-title text-anim">{service.title}</h3>

        <div className="tj-entry-content">
          <p className="wow fadeInUp" data-wow-delay="0.1s">
            {service.desc}
          </p>

          <div className="bt-service-hero-btn wow fadeInUp" data-wow-delay="0.3s">
            <Link to={service.cta.to} className="tj-primary-btn">
              <div className="btn_inner">
                <div className="btn_icon">
                  <span>
                    <i className="tji-arrow-right"></i>
                    <i className="tji-arrow-right"></i>
                  </span>
                </div>
                <div className="btn_text">
                  <span>{service.cta.label}</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="tj-check-list">
            <h4 className="text-anim">{intro.title}</h4>
            {intro.paragraphs.map((paragraph, i) => (
              <p className="wow fadeInUp" data-wow-delay={`${0.1 + i * 0.2}s`} key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="check-list mb-40">
            <h4 className="text-anim">{areas.title}</h4>
          </div>
          <div className="row rg-30">
            {areas.items.map((item, i) => (
              <div className="col-md-6" key={item.title}>
                <div className="tj-feature wow fadeInUp" data-wow-delay={`${0.1 + i * 0.15}s`}>
                  <div className="tj-feature-icon">
                    <i className={item.icon}></i>
                  </div>
                  <h5 className="tj-feature-title">{item.title}</h5>
                  <div className="desc">
                    <p>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="check-list mb-40 mt-40">
            <h4 className="text-anim">{list.title}</h4>
          </div>
          <div className="service-check-list wow fadeInUp" data-wow-delay="0.1s">
            <ul>
              {list.items.map((item) => (
                <li key={item}>
                  <i className="tji-double-check"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {advocate && (
            <div className="bt-outcome-box wow fadeInUp" data-wow-delay="0.1s">
              <span className="sub-title">{advocate.eyebrow}</span>
              <h4 className="title">{advocate.title}</h4>
              {advocate.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          )}

          {service.engagementFirst ? [engagementBlock, outcomeBlock] : [outcomeBlock, engagementBlock]}

          <div className="check-list mb-40 mt-40">
            <h4 className="text-anim">Common questions</h4>
          </div>
          {/* The card treatment the home page's accordion uses. Without the
              numbering, which belongs to a section heading its own questions
              lead - here they sit under one of several h4s in a reading
              column. */}
          <FaqAccordion id={`bt-faq-${slug}`} items={faq} variant="bt-faq-premium" />
        </div>
      </div>
    </div>
  );
}
