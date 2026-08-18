import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import useScrollSpy from "../../hooks/useScrollSpy";
import { legalRoutes } from "../../data/legal";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * Keeps the lit entry inside the rail's own scroll box.
 *
 * The rail is capped so it can stay pinned on a twelve-clause document, which
 * means the section you are reading can be below the fold of the rail itself.
 * Scrolling the list - never the page - brings it back into view.
 *
 * Measured with `getBoundingClientRect` rather than `offsetTop`: the theme
 * does not position the list, so `offsetTop` would be relative to whichever
 * ancestor happens to be positioned rather than to the scroll box.
 */
function useKeepActiveInView(listRef, activeId) {
  useEffect(() => {
    const list = listRef.current;
    if (!list || !activeId) return;
    if (list.scrollHeight <= list.clientHeight) return;

    const item = list.querySelector(`[data-section="${activeId}"]`);
    if (!item) return;

    const listBox = list.getBoundingClientRect();
    const itemBox = item.getBoundingClientRect();
    const margin = 8;
    const behavior = window.matchMedia(REDUCED_MOTION).matches ? "auto" : "smooth";

    if (itemBox.top < listBox.top + margin) {
      list.scrollBy({ top: itemBox.top - listBox.top - margin, behavior });
    } else if (itemBox.bottom > listBox.bottom - margin) {
      list.scrollBy({ top: itemBox.bottom - listBox.bottom + margin, behavior });
    }
  }, [listRef, activeId]);
}

/**
 * The contents rail beside a legal document.
 *
 * Built on the theme's sidebar components - `tj-sidebar-widget` for the box
 * and its ruled title, `service-category` for the list, including the blue
 * `.active` fill the service sidebar gives its current item. The only things
 * added are what a long document needs: the entry you are reading lights up
 * as you scroll (hooks/useScrollSpy), and a thin bar under the title shows
 * how far through you are.
 *
 * `data-lenis-prevent` on the list hands its inner scroll back to the browser
 * - the same attribute the mobile drawer uses - otherwise Lenis swallows the
 * wheel and scrolls the page instead.
 */
export default function LegalContents({ doc, currentSlug }) {
  const { activeId, progress } = useScrollSpy(doc.sections.map((section) => section.id));
  const listRef = useRef(null);
  useKeepActiveInView(listRef, activeId);

  const other = legalRoutes.find((route) => route.slug !== currentSlug);

  return (
    <aside className="tj-service-sidebar bt-legal-sidebar">
      <div className="tj-sidebar-widget bt-legal-toc wow fadeInUp" data-wow-delay="0.1s">
        <h5 className="tj-sidebar-widget-title">On this page</h5>

        <div
          className="bt-legal-progress"
          role="progressbar"
          aria-label="Reading progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
        >
          <span className="bt-legal-progress-bar" style={{ transform: `scaleX(${progress})` }} />
        </div>

        <nav className="service-category" aria-label={`${doc.title} sections`}>
          <ul ref={listRef} data-lenis-prevent>
            {doc.sections.map((section) => {
              const isActive = section.id === activeId;
              return (
                <li key={section.id} data-section={section.id}>
                  {/* A real hash link, so it survives without JS and can be
                      copied. lib/smoothScroll intercepts the click and hands
                      it to Lenis with the fixed header's height as offset. */}
                  <a
                    className={isActive ? "active" : undefined}
                    href={`#${section.id}`}
                    aria-current={isActive ? "location" : undefined}
                  >
                    {section.title}
                    <i className="tji-angle-right"></i>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {other && (
          <div className="bt-legal-crosslink">
            <Link className="text-btn" to={`/${other.slug}`}>
              {other.label} <i className="tji-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
