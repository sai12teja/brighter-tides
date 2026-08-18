import { lastUpdated } from "../../data/legal";

/**
 * The reading column of a legal document, on service-details.html's own
 * article blocks (`tj-post-wrapper` / `tj-post-single-post` /
 * `tj-entry-content`), so the measure, type scale and paragraph rhythm are
 * the theme's untouched.
 *
 * Headings are `h2` under the page header's `h1`, stepped down to the scale's
 * h4 by `.bt-legal-heading` - a legal section heading at the theme's full 48px
 * h2 would read as a page title, and skipping to a real `h4` to get the size
 * would leave a hole in the heading outline for anyone navigating by it.
 *
 * Each section carries its `id`: it is the anchor the contents rail scrolls
 * to and the element the scroll-spy measures.
 */
export default function LegalBody({ doc }) {
  return (
    <div className="tj-post-wrapper bt-legal">
      <div className="tj-post-single-post mb-0">
        {/* Category and revision date on one line: two stacked micro-lines
            above the copy read as clutter, and on a legal document the date
            is the second thing anyone looks for. */}
        <div className="bt-legal-kicker wow fadeInUp" data-wow-delay="0.1s">
          <span className="sub-title">{doc.eyebrow}</span>
          <span className="bt-legal-meta">
            Last updated <time dateTime="2026-08-18">{lastUpdated}</time>
          </span>
        </div>

        <div className="tj-entry-content">
          <p className="bt-lead wow fadeInUp" data-wow-delay="0.2s">
            {doc.summary}
          </p>

          {doc.intro.map((paragraph, i) => (
            <p className="wow fadeInUp" data-wow-delay={`${0.25 + i * 0.1}s`} key={paragraph}>
              {paragraph}
            </p>
          ))}

          {doc.sections.map((section) => (
            <section className="bt-legal-section" id={section.id} key={section.id}>
              {/* `text-anim` is the site's heading reveal - GSAP SplitText,
                  re-run per route by lib/templateAnimations. */}
              <h2 className="bt-legal-heading text-anim">{section.title}</h2>

              {section.paragraphs.map((paragraph, i) => (
                <p className="wow fadeInUp" data-wow-delay={`${0.1 + i * 0.1}s`} key={paragraph}>
                  {paragraph}
                </p>
              ))}

              {section.list && (
                <div className="tj-check-list wow fadeInUp" data-wow-delay="0.1s">
                  {/* A plain paragraph rather than the block's own `h4`: this
                      is a lead-in to the list, not another section heading. */}
                  {section.list.title && <p className="bt-legal-list-title">{section.list.title}</p>}
                  <ul>
                    {section.list.items.map((item) => (
                      <li key={item}>
                        <i className="tji-double-check"></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {section.after?.map((paragraph, i) => (
                <p className="wow fadeInUp" data-wow-delay={`${0.1 + i * 0.1}s`} key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
