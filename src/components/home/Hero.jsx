import { Link } from "react-router-dom";
import { hero } from "../../data/home";

export default function Hero() {
  return (
    <div className="heroStack">
      <div className="stackOverlay"></div>
      <section className="tj-hero-section">
        <div className="container">
          <div className="row">
            <div className="hero-wrapper">
              <div className="hero-content">
                <span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
                  {hero.eyebrow}
                </span>
                <h1 className="hero-title text-anim">
                  {hero.titleLead} <span className="active-color">{hero.titleAccent}</span>
                  {hero.titleTail}
                </h1>
                <div className="desc wow fadeInUp" data-wow-delay="0.1s">
                  <p>{hero.desc}</p>
                </div>
                <div className="hero-buttons wow fadeInUp" data-wow-delay="0.3s">
                  <Link to={hero.primaryCta.to} className="tj-primary-btn hero-button">
                    <div className="btn_inner">
                      <div className="btn_icon">
                        <span>
                          <i className="tji-arrow-right"></i>
                          <i className="tji-arrow-right"></i>
                        </span>
                      </div>
                      <div className="btn_text">
                        <span>{hero.primaryCta.label}</span>
                      </div>
                    </div>
                  </Link>
                  <Link to={hero.secondaryCta.to} className="text-btn hero-text-btn">
                    {hero.secondaryCta.label} <i className="tji-arrow-right" aria-hidden="true"></i>
                  </Link>
                </div>
                <div className="hero-shapes-1 move-anim">
                  <img src="/assets/images/shapes/hero-1.png" alt="Shapes" />
                </div>
                <div className="hero-shapes-2 zoominout">
                  <img src="/assets/images/shapes/hero-3.png" alt="Shapes" />
                </div>
              </div>
              <div className="hero-images-box">
                <div className="hero-images">
                  <img src="/assets/images/hero/h1-hero-1.webp" alt="Images" />
                </div>
                <div className="images-shapes move-anim-2">
                  <img src="/assets/images/shapes/hero-2.png" alt="Shapes" />
                </div>
                <div className="hero-circle">
                  <div className="circle-wrap">
                    <img className="rotate-image" src="/assets/images/shapes/play-text.png" alt="image" />
                    <a
                      className="circle video-popup"
                      data-autoplay="true"
                      data-vbtype="video"
                      data-maxwidth="1200px"
                      href="https://www.youtube.com/watch?v=MLpWrANjFbI"
                    >
                      <i className="fa-sharp fa-solid fa-play"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero_scroll d-none d-lg-block">
          <a className="down" href="#scroll-hero">
            <span>
              <i className="tji-arrow-bown"></i>
            </span>
            Scroll
          </a>
        </div>
      </section>
    </div>
  );
}
