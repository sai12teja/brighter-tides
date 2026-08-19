import { Link } from "react-router-dom";
import WaveDivider from "../sections/WaveDivider";
import TypedText from "../sections/TypedText";
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
                {/* `text-anim` is on the lead alone, not on the whole <h1>
                    as the template had it. It is the hook main.js uses to run
                    GSAP SplitText over an element - and SplitText rebuilds
                    that element's DOM into one node per character, which is
                    fine for text that never changes and fatal for text React
                    re-renders sixteen times a second. The lead keeps the
                    character reveal; the accent line types itself instead. */}
                <h1 className="hero-title">
                  <span className="text-anim hero-title-lead">{hero.titleLead}</span>
                  <TypedText
                    phrases={hero.titlePhrases}
                    readAs={hero.titleReadAs}
                    className="active-color"
                  />
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
                  {/* The LCP element on the home page: eager, high priority,
                      and carrying its dimensions so the hero does not reflow
                      around it. Two widths, because the box is 610px on
                      desktop - a 1x screen has no use for the 2x file, and it
                      is the largest image on the page. */}
                  <img
                    src="/assets/images/bt/photos/hero.webp"
                    srcSet="/assets/images/bt/photos/hero-610.webp 610w, /assets/images/bt/photos/hero.webp 1220w"
                    sizes="(max-width: 991px) 100vw, 610px"
                    alt="Two advisors reviewing platform data on a tablet in an office"
                    width="1220"
                    height="1514"
                    fetchPriority="high"
                  />
                </div>
                <div className="images-shapes move-anim-2">
                  <img src="/assets/images/shapes/hero-2.png" alt="Shapes" />
                </div>
                {/* The template's "PLAY OUR PROMOTIONAL VIDEO" badge is gone.
                    It opened a Venobox lightbox on a hard-coded YouTube URL
                    that came with the theme - someone else's video, on
                    someone else's channel - and it sat across the faces in
                    the photograph. There is no Brighter Tides video to put
                    in its place yet; when there is, the markup is one commit
                    back in this file's history and the vendor bundle still
                    ships Venobox. */}
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

      {/* Outside the section on purpose. The hero carries a scroll-scrubbed
          parallax (`y: 30%` - see initHeroParallax), so anything inside it
          travels down as the page scrolls; the wave rode past the section
          boundary and the next section, which does not move, painted over it.
          By the time the hero's foot was on screen the curve was gone.

          As a child of the stack instead - which is not transformed - it stays
          welded to the boundary and the hero recedes behind it. */}
      <WaveDivider />
    </div>
  );
}
