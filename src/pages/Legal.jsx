import { Navigate } from "react-router-dom";

import PageHeader from "../components/layout/PageHeader";
import LegalBody from "../components/legal/LegalBody";
import LegalContents from "../components/legal/LegalContents";
import CtaBand from "../components/sections/CtaBand";
import useHashLanding from "../hooks/useHashLanding";
import { legalDocuments } from "../data/legal";

/**
 * Privacy Policy and Terms & Conditions - one component, two routes, driven
 * by data/legal.js. The layout is service-details.html's: the reading column
 * at `col-lg-8` with a sidebar rail at `col-lg-4`.
 */
export default function Legal({ slug }) {
  const doc = legalDocuments[slug];
  useHashLanding();

  if (!doc) return <Navigate to="/" replace />;

  return (
    <>
      <PageHeader title={doc.title} />

      <section className="tj-service-area section-space">
        <div className="container">
          {/* Bootstrap ordering, not two copies of the rail: below `lg` the
              columns stack, and a table of contents underneath the document
              it indexes is no use to anyone - so on phones and tablets the
              rail comes first, as a jump-to-section index. From `lg` up it
              returns to the right, where the service detail pages put
              theirs. */}
          <div className="row rg-50">
            <div className="col-lg-8 order-2 order-lg-1">
              <LegalBody doc={doc} />
            </div>
            <div className="col-lg-4 order-1 order-lg-2">
              <LegalContents doc={doc} currentSlug={slug} />
            </div>
          </div>
        </div>
      </section>

      <CtaBand content={doc.closing} size="compact" />
    </>
  );
}
