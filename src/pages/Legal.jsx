import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

import PageHeader from "../components/layout/PageHeader";
import LegalBody from "../components/legal/LegalBody";
import LegalContents from "../components/legal/LegalContents";
import CtaBand from "../components/sections/CtaBand";
import { whenBundleReady } from "../hooks/useSiteScripts";
import { legalDocuments } from "../data/legal";

/**
 * Deep links into a document (`/privacy-policy#liability`) land before the
 * vendor bundle has laid the page out, so the browser's own hash jump either
 * misses or is undone by the layout's scroll reset. Once everything is in
 * place, put the visitor where they asked to be.
 */
function useHashLanding() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    let cancelled = false;

    whenBundleReady().then(() => {
      if (cancelled) return;
      const target = document.getElementById(hash.slice(1));
      if (!target) return;
      // One frame, so the section is at its final position before we measure.
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: "auto", block: "start" });
      });
    });

    return () => {
      cancelled = true;
    };
  }, [hash]);
}

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
