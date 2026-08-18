import Seo from "../components/seo/Seo";
import PageHeader from "../components/layout/PageHeader";
import ServicesIntro from "../components/services/ServicesIntro";
import ProblemFirst from "../components/services/ProblemFirst";
import ServiceCards from "../components/services/ServiceCards";
import ExpertiseList from "../components/services/ExpertiseList";
import CtaBand from "../components/sections/CtaBand";
import { cta } from "../data/servicesPage";
import { seoFor } from "../lib/pageSeo";

const seo = seoFor("/services");

export default function Services() {
  return (
    <>
      <Seo {...seo} />
      <PageHeader title="Services" />
      <ServicesIntro />
      <ProblemFirst />
      <ServiceCards />
      <ExpertiseList />
      <CtaBand content={cta} size="compact" />
    </>
  );
}
