import Hero from "../components/home/Hero";
import About from "../components/home/About";
import MeetFounder from "../components/home/MeetFounder";
import LogoMarquee from "../components/sections/LogoMarquee";
import Challenge from "../components/home/Challenge";
import Features from "../components/home/Features";
import Services from "../components/home/Services";
import WhyUs from "../components/home/WhyUs";
import Process from "../components/home/Process";
import Faq from "../components/home/Faq";
import CtaBand from "../components/sections/CtaBand";
import { experience, finalCta } from "../data/home";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      {/* Shannon's credentials live inside this section, not in the
          template's odometer counter - see components/home/MeetFounder. */}
      <MeetFounder />
      <LogoMarquee content={experience} variant="dark" />
      <Challenge />
      {/* Core ServiceNow expertise */}
      <Features />
      <Services />
      <WhyUs />
      <Process />
      {/* Four of the template's sections are off the home page: Skills,
          Testimonials, Projects and Blog. Every one is still carrying
          Solvior's placeholder content - invented client quotes and faces,
          "Business consultants 90%", case studies that are not ours, posts
          dated June 2024 - over a grey 1920x780 box. A fabricated
          testimonial costs more trust than the section buys.

          Their components and data files are all kept, so each is one line
          away from returning once there is something real to put in it. */}
      <Faq />
      <CtaBand content={finalCta} />
    </>
  );
}
