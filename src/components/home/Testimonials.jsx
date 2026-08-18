import { testimonials } from "../../data/testimonials";
import StarRating from "./StarRating";

export default function Testimonials() {
  return (
    <section className="tj-testimonial-section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sec-heading">
              <div className="sec-text">
                <span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
                  Testimonials
                </span>
                <h2 className="sec-title text-anim">Listening to our clients</h2>
              </div>
              <div className="swiper_navigations testimonial-navigation d-none d-md-inline-flex">
                <div className="navigation slider-prev">
                  <i className="tji-arrow-left"></i>
                </div>
                <div className="navigation slider-next">
                  <i className="tji-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="testimonial-slider-wrapper">
              <div className="swiper swiper-container tj-testimonial-slider">
                <div className="swiper-wrapper rightSwipeWrap">
                  {testimonials.map((testimonial, i) => (
                    <div className="swiper-slide right-swipe" key={`${testimonial.name}-${i}`}>
                      <div className="testimonial-item">
                        <div className="testimonial-content">
                          <div className="testimonial-quote">
                            <i className="tji-right-quote"></i>
                          </div>
                          <div className="desc">
                            <p>{testimonial.quote}</p>
                          </div>
                        </div>
                        <div className="tj-testimonial-author">
                          <div className="author-images">
                            <img src={testimonial.image} alt="Images" />
                          </div>
                          <div className="author-content">
                            <div className="author-rating">
                              <StarRating width={testimonial.rating} />
                            </div>
                            <div className="author-text">
                              <h4 className="author-name">{testimonial.name}</h4>
                              <span className="sub-title">{testimonial.role}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="swiper_pagination testimonial-pagination"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
