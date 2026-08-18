import Seo from "../components/seo/Seo";
import PageHeader from "../components/layout/PageHeader";
import ContactIntro from "../components/contact/ContactIntro";
import DirectContact from "../components/contact/DirectContact";
import ContactForm from "../components/contact/ContactForm";
import ContactMap from "../components/contact/ContactMap";
import ContactReassurance from "../components/contact/ContactReassurance";
import CtaBand from "../components/sections/CtaBand";
import { cta } from "../data/contact";
import { seoFor } from "../lib/pageSeo";

const seo = seoFor("/contact");

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
  return (
    <>
      <Seo {...seo} />
      <PageHeader title="Contact" />
      <ContactIntro />
      <DirectContact />

      <section className="tj-contact-area section-space">
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
      <CtaBand content={cta} />
    </>
  );
}
