import { Link } from "react-router-dom";
import { cards, cardCopy } from "../../data/servicesPage";

/**
 * The three advisory services, in the template's services-page card
 * (`service-style-2`: icon, number, title, copy, text link, thumbnail).
 * services.html runs six of these across two rows; three fill one row at
 * `col-lg-4`.
 */
export default function ServiceCards() {
  return (
    // `section-space`, as services.html has it: the card row follows the
    // coloured "Start With the Problem" band, and with only bottom padding the
    // cards sat flush against that band's edge.
    <div className="tj-service-area section-space">
      <div className="container">
        <div className="row rg-30">
          {cards.map((card, i) => {
            const copy = cardCopy[card.slug];
            return (
              <div className="col-lg-4 col-md-6" key={card.slug}>
                <div className="service-style-2 wow fadeInUp" data-wow-delay={`${0.1 + i * 0.2}s`}>
                  <div className="service-icon">
                    <i className={card.icon}></i>
                  </div>
                  <div className="service-content">
                    <span className="number">{card.number}</span>
                    <h4 className="title">
                      <Link to={card.to}>
                        {copy.titleLines[0]} <br /> {copy.titleLines[1]}
                      </Link>
                    </h4>
                    <div className="desc">
                      <p className="bt-lead-note">{copy.lead}</p>
                      <p>{copy.desc}</p>
                    </div>
                    <Link className="service-button text-btn" to={card.to}>
                      Explore Service <i className="tji-arrow-right"></i>
                    </Link>
                  </div>
                  <div className="thumb">
                    <img src={card.image} alt="image" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
