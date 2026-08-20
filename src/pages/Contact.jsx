import useHashLanding from "../hooks/useHashLanding";
import PageHeader from "../components/layout/PageHeader";
import ContactIntro from "../components/contact/ContactIntro";
import DirectContact from "../components/contact/DirectContact";
import ContactForm from "../components/contact/ContactForm";
import ContactMap from "../components/contact/ContactMap";
import ContactReassurance from "../components/contact/ContactReassurance";
import CtaBand from "../components/sections/CtaBand";
import { cta } from "../data/contact";

/**
 * contact.html's running order, kept intact: breadcrumb header, a centred
 * heading, the contact-detail card row, the form/map row, then the closing
 * CTA band. "What Happens Next?" is added before the band - the content
 * guide's third section, on the same card component.
 *
 * The two card rows sit either side of the form/map row, as the template's
 * own single row and form row do, so neither reads as a repeat of the other.
 */
export default function Contact() {
  // `/contact#inquiry` is where the standing "Book a Consult" button sends
  // people, so arriving at that hash has to land on the form.
  useHashLanding();

  return (
    <>
      <PageHeader title="Contact" image="/assets/images/bt/photos/contact-hero.webp" />
      <ContactIntro />
      <DirectContact />

      {/* `inquiry` is a published anchor - the site-wide booking button and
          any link shared to the form both point at it. Renaming it breaks
          those. */}
      <section className="tj-contact-area section-space" id="inquiry">
        <div className="container">
          <div className="row rg-50">
            <div className="col-lg-7">
              <ContactForm />
            </div>
            <div className="col-lg-5">
              <ContactMap />
            </div>
          </div>
        </div>
      </section>

      <ContactReassurance />
      {/* `compact`, like every other inner page: this closer is a full
          sentence, and the template's display size sets it in 72px uppercase
          - three lines of shouting across the foot of the page. The home
          page keeps the display size, which is what it is drawn for: a
          three-word slogan. */}
      <CtaBand content={cta} size="compact" />
    </>
  );
}
