import { Link } from "react-router-dom";
import { founder } from "../../data/about";

/**
 * "Meet Shannon" - about.html's Evolution section (`tj-evolute-area`): a
 * panel of copy beside Shannon's portrait. The template's video overlay is
 * dropped, per the content brief, so the image is purely the portrait.
 *
 * The template ships this section as two DOM copies - a full-bleed grid for
 * >=1400px and a contained one below it, switched by `d-none d-xxl-block` /
 * `d-xxl-none`. Only one is kept: the whole section now lives in the same
 * container as every other section, so the copy starts where the rest of the
 * page starts at every width. That also takes the second copy of this
 * content out of the document, and with it the reason the reveals had to be
 * bound to only one of them. See `.bt-founder-story` in brand.css.
 */
function EvoluteContent() {
  return (
    <div className="tj-evolute">
      <span className="tj-evolute-title mb-30 wow fadeInUp" data-wow-delay="0.1s">
        <i className="tji-star-2"></i>
        {founder.eyebrow}
      </span>
      {/* `mb-30` is the template's own spacing utility, the one this panel
          already uses on its pill. */}
      <h2 className="sec-title mb-30 text-anim">{founder.title}</h2>
      <div className="bt-founder-identity wow fadeInUp" data-wow-delay="0.3s">
        <h3 className="name">{founder.name}</h3>
        <span className="role">{founder.role}</span>
      </div>
      <div className="desc mb-60 wow fadeInUp" data-wow-delay="0.4s">
        {founder.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="wow fadeInUp" data-wow-delay="0.5s">
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
    <div className="tj-evolute-image hover:shine wow fadeInUp" data-wow-delay="0.2s">
      <img
        src={founder.image}
        srcSet={`${founder.imageSmall} 645w, ${founder.image} 1290w`}
        /* Half the container above lg, the full column width below it. */
        sizes="(max-width: 991px) 100vw, 645px"
        alt={`${founder.name}, ${founder.role}`}
        width="1290"
        height="1592"
        loading="lazy"
      />
    </div>
  );
}

export default function FounderStory() {
  return (
    <section className="tj-evolute-area bt-founder-story">
      <div className="container">
        {/* Side by side from `xl` only. At 1024 a half-column left the copy
            368px wide - three paragraphs at eight lines each, and a panel
            over 1000px tall next to a portrait stretched to match. Stacked,
            the same copy is four lines shorter than the screen.

            No `align-items`: where they are side by side the columns stretch
            to the taller of the two, which is what lets the portrait take
            the panel's height instead of ending wherever its own aspect
            happens to put it. */}
        <div className="row rg-50">
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
