import { beliefs } from "../../data/about";

/**
 * "What We Believe" - the home page's "Our company" split
 * (`tj-about-section`, from index.html): copy on the right, the template's
 * shape collage filling the left half.
 *
 * `bt-beliefs-collage` marks this instance of that collage apart from the
 * home page's, which is the same block with a different photograph - see
 * brand.css, where the two are framed differently because their subjects
 * sit in different parts of the frame.
 */
export default function Beliefs() {
  return (
    <section className="tj-about-section bt-beliefs-collage">
      <div className="container">
        <div className="row">
          <div className="col-lg-6"></div>
          <div className="col-lg-6">
            <div className="about-left-content">
              <div className="sec-heading mb-0">
                <span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
                  {beliefs.eyebrow}
                </span>
                <h2 className="sec-title text-anim">{beliefs.title}</h2>
                <div className="desc wow fadeInUp" data-wow-delay="0.3s">
                  {beliefs.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about-bg-images">
        <div className="about-shape-1 hover:shine">
          <img
            src="/assets/images/bt/photos/about-believe-main.webp"
            alt="Two advisors working through a document at a meeting table"
            width="1490"
            height="1352"
            loading="lazy"
          />
        </div>
        <div className="about-shape-2 hover:shine">
          <img
            src="/assets/images/bt/photos/about-believe-small.webp"
            alt="Hands comparing options on a printed matrix"
            width="400"
            height="396"
            loading="lazy"
          />
        </div>
        <div className="about-shape-3 zoominout">
          <img src="/assets/images/bt/star.svg" alt="Shapes" />
        </div>
      </div>
    </section>
  );
}
