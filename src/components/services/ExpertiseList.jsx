import { expertise } from "../../data/servicesPage";

/**
 * "Where We Help" - ten capability lines. Ten feature cards would swamp the
 * page, so this uses the template's existing tick list (`check-list-one`,
 * the one the home page's about section uses).
 *
 * Layout is Bootstrap's own grid throughout, no custom measures:
 *
 * - The heading sits in a `col-xl-7 col-lg-9`, which constrains its line
 *   length with a real column box. A `max-width` on the `<h2>` did not hold:
 *   `text-anim` hands the heading to GSAP SplitText, which rebuilds its
 *   contents as sized inline-block wrappers, and those overflowed the cap -
 *   the heading was running ~1110px wide against a 760px limit.
 *
 * - The list uses `col-md-auto`, so each column shrinks to its text. With
 *   fixed `col-lg-4` columns the short lines left trailing space inside each
 *   one, and because the text sits at the column's left edge the block's
 *   visual centre fell ~130px left of the heading's, pooling the slack at the
 *   right. Auto-width columns let `justify-content-center` centre what is
 *   actually visible.
 */
export default function ExpertiseList() {
  const columns = [expertise.items.slice(0, 5), expertise.items.slice(5)];

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
        {/* `gx-md-5`, not `gx-5`: the wide gutter's -24px row margins are only
            absorbed once the container is a fixed width. Below `md` the
            container runs full-bleed with 12px padding, so the row hung 12px
            past each edge and the page scrolled sideways. The columns stack
            below `md` anyway, where the gutter does nothing. */}
        <div className="row justify-content-center gx-md-5 rg-30">
          {columns.map((column, i) => (
            <div className="col-12 col-md-auto" key={column[0]}>
              <div className="check-list-one wow fadeInUp" data-wow-delay={`${0.1 + i * 0.2}s`}>
                <ul>
                  {column.map((item) => (
                    <li key={item}>
                      <i className="tji-double-check"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
