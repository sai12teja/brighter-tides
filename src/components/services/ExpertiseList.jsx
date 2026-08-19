import { expertise } from "../../data/servicesPage";

/**
 * "Where We Help" - ten capability lines.
 *
 * Ten feature cards would swamp the page and the template's tick list
 * (`check-list-one`) under-sold them: ten short phrases set as plain body
 * copy in two columns, adrift in the middle of a white section. They are the
 * page's index of what the practice actually does, so each one is a tile of
 * its own - a mark, a label, a hairline, and a lift on hover.
 *
 * The heading sits in a `col-xl-7 col-lg-9`, which constrains its line length
 * with a real column box. A `max-width` on the `<h2>` did not hold:
 * `text-anim` hands the heading to GSAP SplitText, which rebuilds its
 * contents as sized inline-block wrappers, and those overflowed the cap - the
 * heading was running ~1110px wide against a 760px limit.
 *
 * The tiles are one flex-wrapped list rather than Bootstrap columns, so the
 * rows centre themselves at every width and a short last row sits under the
 * middle of the block instead of hanging off its left edge. See
 * `.bt-expertise-grid` in brand.css.
 */
export default function ExpertiseList() {
  return (
    <section className="bt-expertise-section section-bottom-space">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-9 col-12">
            <div className="sec-heading text-center">
              <span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
                {expertise.eyebrow}
              </span>
              <h2 className="sec-title text-anim">{expertise.title}</h2>
            </div>
          </div>
        </div>
        <ul className="bt-expertise-grid">
          {expertise.items.map((item, i) => (
            <li
              className="bt-expertise-item wow fadeInUp"
              /* Reveals along the reading order, capped so the last tile is
                 not still arriving half a second after the first. */
              data-wow-delay={`${0.1 + Math.min(i, 5) * 0.06}s`}
              key={item}
            >
              <span className="bt-expertise-mark" aria-hidden="true">
                <i className="tji-double-check"></i>
              </span>
              <span className="bt-expertise-label">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
