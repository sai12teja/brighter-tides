/**
 * The template's `tj-faq-style` accordion, driven by the Bootstrap collapse
 * plugin that already ships in the vendor bundle. Bootstrap binds
 * `data-bs-toggle` handlers by delegation, so markup React mounts later is
 * picked up without any extra wiring.
 *
 * `id` must be unique per page - it is what `data-bs-parent` uses to close
 * the sibling panel when another opens.
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
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
