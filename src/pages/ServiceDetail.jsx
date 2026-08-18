import { useParams, Navigate } from "react-router-dom";

import PageHeader from "../components/layout/PageHeader";
import ServiceBody from "../components/service-detail/ServiceBody";
import ServiceSidebar from "../components/service-detail/ServiceSidebar";
import CtaBand from "../components/sections/CtaBand";
import { services } from "../data/navigation";
import { serviceDetails } from "../data/serviceDetails";

export default function ServiceDetail() {
  const { slug } = useParams();
  const route = services.find((item) => item.slug === slug);
  const service = serviceDetails[slug];

  if (!route || !service) return <Navigate to="/services" replace />;

  return (
    <>
      <PageHeader title={route.label} crumbs={[{ label: "Services", to: "/services" }]} />

      <section className="tj-service-area section-space">
        <div className="container">
          <div className="row rg-50">
            <div className="col-lg-8">
              <ServiceBody slug={slug} service={service} />
            </div>
            <div className="col-lg-4">
              <ServiceSidebar currentSlug={slug} />
            </div>
          </div>
        </div>
      </section>

      <CtaBand content={service.closing} size="compact" />
    </>
  );
}
