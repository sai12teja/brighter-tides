import { useRef, useState } from "react";
import { form, enquiryOptions } from "../../data/contact";

const { fields } = form;

/**
 * Contact / inquiry form, built on the template's `contact-form-one` markup.
 *
 * The form is deliberately UNCONTROLLED and read via FormData on submit.
 * nice-select replaces the native `<select>` with its own markup and writes
 * the chosen value back with `.val(...).trigger("change")` - a jQuery event,
 * which React's synthetic onChange does not observe. Binding the select to
 * React state would therefore leave the state stale on every choice. Reading
 * FormData at submit time takes the value straight off the native element
 * that nice-select keeps in sync, so the two never disagree.
 *
 * For the same reason the select carries no `required` attribute: nice-select
 * calls `.hide()` on it, and browsers refuse to validate a `display: none`
 * control ("An invalid form control is not focusable"), which would silently
 * block submission. It is validated here instead.
 */
export default function ContactForm() {
  const formRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [enquiryError, setEnquiryError] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!data.get(fields.enquiry.name)) {
      setEnquiryError(true);
      return;
    }
    setEnquiryError(false);

    // No submission endpoint is wired up yet - this is where the POST to a
    // form backend belongs. Until then the values are surfaced rather than
    // silently dropped, so nothing looks like it sent when it did not.
    console.info("[contact] inquiry", Object.fromEntries(data.entries()));
    setSubmitted(true);
    formRef.current?.reset();
  }

  if (submitted) {
    return (
      <div className="contact-form-one style-2">
        <h3 className="title">{form.success.title}</h3>
        <div className="desc">
          <p>{form.success.desc}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-form-one style-2 wow fadeInUp" data-wow-delay="0.1s">
      <h3 className="title text-anim">{form.title}</h3>
      <form ref={formRef} onSubmit={handleSubmit} noValidate={false}>
        <div className="row">
          <div className="col-sm-6">
            <div className="form-input">
              <label className="bt-visually-hidden" htmlFor="fullName">
                {fields.fullName.label}
              </label>
              <input
                type="text"
                id="fullName"
                name={fields.fullName.name}
                placeholder={fields.fullName.placeholder}
                autoComplete="name"
                required
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-input">
              <label className="bt-visually-hidden" htmlFor="company">
                {fields.company.label}
              </label>
              <input
                type="text"
                id="company"
                name={fields.company.name}
                placeholder={fields.company.placeholder}
                autoComplete="organization"
                required
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-input">
              <label className="bt-visually-hidden" htmlFor="email">
                {fields.email.label}
              </label>
              <input
                type="email"
                id="email"
                name={fields.email.name}
                placeholder={fields.email.placeholder}
                autoComplete="email"
                required
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-input">
              <label className="bt-visually-hidden" htmlFor="role">
                {fields.role.label}
              </label>
              <input
                type="text"
                id="role"
                name={fields.role.name}
                placeholder={fields.role.placeholder}
                autoComplete="organization-title"
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-input">
              <label className="bt-visually-hidden" htmlFor="enquiry">
                {fields.enquiry.label}
              </label>
              <div className="tj-nice-select-box">
                <div className="tj-select">
                  <select className="nice-select" id="enquiry" name={fields.enquiry.name} defaultValue="">
                    <option value="">{fields.enquiry.placeholder}</option>
                    {enquiryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {enquiryError && (
                <p className="bt-field-error" role="alert">
                  Please choose what we can help with.
                </p>
              )}
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-input">
              <label className="bt-visually-hidden" htmlFor="renewalDate">
                {fields.renewalDate.label}
              </label>
              {/* `text` until focused, so the optional field shows its full
                  label rather than an empty date widget the user must decode. */}
              <input
                type="text"
                id="renewalDate"
                name={fields.renewalDate.name}
                placeholder={fields.renewalDate.placeholder}
                onFocus={(event) => {
                  event.target.type = "date";
                }}
                onBlur={(event) => {
                  if (!event.target.value) event.target.type = "text";
                }}
              />
            </div>
          </div>
          <div className="col-12">
            <div className="form-input input-textarea">
              <label className="bt-visually-hidden" htmlFor="challenge">
                {fields.challenge.label}
              </label>
              <textarea
                id="challenge"
                name={fields.challenge.name}
                placeholder={fields.challenge.placeholder}
                rows={6}
                required
              ></textarea>
            </div>
          </div>
          <div className="submit-button">
            <button type="submit" className="tj-primary-btn">
              <span className="btn_inner">
                <span className="btn_icon">
                  <span>
                    <i className="tji-arrow-right"></i>
                    <i className="tji-arrow-right"></i>
                  </span>
                </span>
                <span className="btn_text">
                  <span>{form.submitLabel}</span>
                </span>
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
