import Seo from "../components/seo/Seo";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import MeetFounder from "../components/home/MeetFounder";
import LogoMarquee from "../components/sections/LogoMarquee";
import Challenge from "../components/home/Challenge";
import Features from "../components/home/Features";
import Services from "../components/home/Services";
import WhyUs from "../components/home/WhyUs";
import Process from "../components/home/Process";
// Hidden, not deleted - see the block further down where these would render.
// import Skills from "../components/home/Skills";
// import Testimonials from "../components/home/Testimonials";
// import Blog from "../components/home/Blog";
import Faq from "../components/home/Faq";
import CtaBand from "../components/sections/CtaBand";
import { experience, finalCta } from "../data/home";
import { seoFor } from "../lib/pageSeo";

const seo = seoFor("/");

export default function Home() {
  return (
    <>
      <Seo {...seo} />
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

      {/* HIDDEN FOR LAUNCH - not deleted. The components and their data files
          are all still in the repo, so each of these is an uncomment away
          from returning:

          - Skills: the template's generic percentage bars. A "ServiceNow
            strategy - 85%" figure is not a claim the practice can stand
            behind, and it reads as template filler.
          - Testimonials: the template's invented quotes. Back when Brighter
            Tides has genuine ones to show.
          - Blog: placeholder posts, every link pointing at "#". Back when
            there is something real to publish.

          Projects (components/home/Projects) was hidden the same way
          earlier, and the odometer fun-facts counter (components/home/
          Counter) is superseded by MeetFounder above. */}
      {/* <Skills /> */}
      {/* <Testimonials /> */}
      {/* <Blog /> */}

      <Faq />
      <CtaBand content={finalCta} />
    </>
  );
}
