import { useState } from "react";

/**
 * The template's `tj-faq-style` accordion, driven by React state.
 *
 * It used to be driven by Bootstrap's collapse plugin, which is why
 * `bootstrap.bundle.min.js` was in the vendor bundle: 24KB of script,
 * delegating clicks and animating a height, for a list that opens one panel
 * at a time. Nothing else on the site used the plugin.
 *
 * The classes are unchanged - `.collapse`, `.show`, `.collapsed` are what
 * main.css and `.bt-faq-premium` in brand.css both style against - so this
 * looks and reads exactly as it did. The height transition is CSS on
 * `grid-template-rows`, which animates from nothing to content height
 * without anyone having to measure it.
 *
 * `id` is still unique per page: the panel ids are what `aria-controls` and
 * `aria-labelledby` point at.
 */
export default function FaqAccordion({ id, items, openFirst = true, numbered = false, variant = "" }) {
  const [openId, setOpenId] = useState(openFirst && items.length ? items[0].id : null);

  return (
    <div
      className={`accordion tj-faq-style ${variant} wow fadeInUp`.replace(/\s+/g, " ").trim()}
      data-wow-delay="0.2s"
      id={id}
    >
      {items.map((item, i) => {
        const bodyId = `${id}-${item.id}`;
        const headingId = `${bodyId}-heading`;
        const isOpen = openId === item.id;

        return (
          <div className="accordion-item" key={item.id}>
            <h3 className="accordion-header" id={headingId}>
              <button
                className={`accordion-button${isOpen ? "" : " collapsed"}`}
                type="button"
                aria-expanded={isOpen}
                aria-controls={bodyId}
                /* One open at a time, as `data-bs-parent` used to enforce -
                   and clicking the open one closes it. */
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                {numbered && <span>{String(i + 1).padStart(2, "0")}.</span>}
                {numbered ? " " : null}
                {item.question}
              </button>
            </h3>
            <div
              id={bodyId}
              className={`accordion-collapse collapse${isOpen ? " show" : ""}`}
              aria-labelledby={headingId}
              role="region"
            >
              {/* The grid row animates from 0fr to 1fr, and a grid item can
                  only collapse to nothing if it has no padding of its own -
                  so the padding stays on `.accordion-body`, which every
                  stylesheet targets, and this wrapper is what shrinks. */}
              <div className="bt-collapse-inner">
                <div className="accordion-body">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
