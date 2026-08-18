import { Link } from "react-router-dom";

/**
 * The template's `tj-faq-style` accordion, driven by the Bootstrap collapse
 * plugin that already ships in the vendor bundle. Bootstrap binds
 * `data-bs-toggle` handlers by delegation, so markup React mounts later is
 * picked up without any extra wiring.
 *
 * `id` must be unique per page - it is what `data-bs-parent` uses to close
 * the sibling panel when another opens.
 *
 * An item may carry a `link`: the page that covers its question properly,
 * shown as the answer's last line. That is what stops the FAQ being a dead
 * end - someone reading the renewals answer is one click from the licensing
 * page - and it is a large share of the site's internal linking, since these
 * are the passages most likely to be quoted back at a reader out of context.
 */
export default function FaqAccordion({ id, items, openFirst = true }) {
  return (
    <div className="accordion tj-faq-style wow fadeInUp" data-wow-delay="0.2s" id={id}>
      {items.map((item, i) => {
        const bodyId = `${id}-${item.id}`;
        const headingId = `${bodyId}-heading`;
        const isOpen = openFirst && i === 0;

        return (
          <div className="accordion-item" key={item.id}>
            <h3 className="accordion-header" id={headingId}>
              <button
                className={`accordion-button${isOpen ? "" : " collapsed"}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#${bodyId}`}
                aria-expanded={isOpen}
                aria-controls={bodyId}
              >
                {item.question}
              </button>
            </h3>
            <div
              id={bodyId}
              className={`accordion-collapse collapse${isOpen ? " show" : ""}`}
              aria-labelledby={headingId}
              data-bs-parent={`#${id}`}
            >
              <div className="accordion-body">
                <p>{item.answer}</p>
                {item.link && (
                  <p className="bt-faq-link">
                    <Link className="text-btn" to={item.link.to}>
                      {item.link.label} <i className="tji-arrow-right" aria-hidden="true"></i>
                    </Link>
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
