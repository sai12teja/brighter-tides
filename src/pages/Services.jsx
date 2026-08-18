import PageHeader from "../components/layout/PageHeader";
import ServicesIntro from "../components/services/ServicesIntro";
import ProblemFirst from "../components/services/ProblemFirst";
import ServiceCards from "../components/services/ServiceCards";
import ExpertiseList from "../components/services/ExpertiseList";
import CtaBand from "../components/sections/CtaBand";
import { cta } from "../data/servicesPage";

export default function Services() {
  return (
    <>
      <PageHeader title="Services" image="/assets/images/bt/photos/services-hero.webp" />
      <ServicesIntro />
      <ProblemFirst />
      <ServiceCards />
      <ExpertiseList />
      <CtaBand content={cta} size="compact" />
    </>
  );
}
