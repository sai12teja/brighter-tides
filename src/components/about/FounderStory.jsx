import { Link } from "react-router-dom";
import { founder } from "../../data/about";

/**
 * "Meet Shannon" - about.html's Evolution section (`tj-evolute-area`): the
 * clipped panel of copy on the left, a clipped image bleeding off the right.
 * The template's video overlay is dropped, per the content brief, so the
 * image is purely Shannon's portrait.
 *
 * The template ships this section as two DOM copies - a full-bleed grid for
 * >=1400px and a contained version below it - and only animates the first,
 * so the second does not register a duplicate set of scroll triggers. Both
 * are kept here, with the copy factored out rather than repeated.
 */
function EvoluteContent({ animate }) {
  // Only the first copy animates - see the note above - so the reveal classes
  // are appended to each element's own classes rather than replacing them.
  const anim = (base, delay) =>
    animate ? { className: `${base} wow fadeInUp`.trim(), "data-wow-delay": delay } : { className: base };

  return (
    <div className="tj-evolute">
      <span {...anim("tj-evolute-title mb-30", "0.1s")}>
        <i className="tji-star-2"></i>
        {founder.eyebrow}
      </span>
      {/* `mb-30` is the template's own spacing utility, the one this panel
          already uses on its pill. */}
      <h2 className={`sec-title mb-30${animate ? " text-anim" : ""}`}>{founder.title}</h2>
      <div {...anim("bt-founder-identity", "0.3s")}>
        <h3 className="name">{founder.name}</h3>
        <span className="role">{founder.role}</span>
      </div>
      <div {...anim("desc mb-60", "0.4s")}>
        {founder.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div {...anim("", "0.5s")}>
        <Link to={founder.cta.to} className="tj-primary-btn">
          <div className="btn_inner">
            <div className="btn_icon">
              <span>
                <i className="tji-arrow-right"></i>
                <i className="tji-arrow-right"></i>
              </span>
            </div>
            <div className="btn_text">
              <span>{founder.cta.label}</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

function Portrait() {
  return (
    <div className="tj-evolute-image hover:shine">
      <img src={founder.image} alt={founder.name} />
    </div>
  );
}

export default function FounderStory() {
  return (
    <section className="tj-evolute-area">
      <div className="container-xxl-fluid p-0 d-none d-xxl-block">
        <div className="row g-0">
          <div className="col-lg-7">
            <EvoluteContent animate />
          </div>
          <div className="col-lg-5">
            <Portrait />
          </div>
        </div>
      </div>
      <div className="container d-xxl-none">
        <div className="row rg-50 align-items-center">
          <div className="col-xl-6 col-12">
            <EvoluteContent />
          </div>
          <div className="col-xl-6 col-12">
            <Portrait />
          </div>
        </div>
      </div>
    </section>
  );
}
