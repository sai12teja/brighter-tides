import Hero from "../components/home/Hero";
import About from "../components/home/About";
import MeetFounder from "../components/home/MeetFounder";
import LogoMarquee from "../components/sections/LogoMarquee";
import Challenge from "../components/home/Challenge";
import Features from "../components/home/Features";
import Services from "../components/home/Services";
import WhyUs from "../components/home/WhyUs";
import Process from "../components/home/Process";
import Skills from "../components/home/Skills";
import Testimonials from "../components/home/Testimonials";
import Blog from "../components/home/Blog";
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
      {/* Template sections still carrying Solvior placeholder content. */}
      <Skills />
      <Testimonials />
      {/* "Our projects" is off the home page: its four case studies are the
          template's placeholders and there is no real project work to show
          yet. components/home/Projects and data/projects are kept, so the
          section is two lines away from returning once there is. */}
      <Blog />
      <Faq />
      <CtaBand content={finalCta} />
    </>
  );
}
