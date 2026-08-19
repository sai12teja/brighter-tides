import PageHeader from "../components/layout/PageHeader";
import AboutIntro from "../components/about/AboutIntro";
import Purpose from "../components/about/Purpose";
import Approach from "../components/about/Approach";
import FounderStory from "../components/about/FounderStory";
import Credentials from "../components/about/Credentials";
import LogoMarquee from "../components/sections/LogoMarquee";
import Beliefs from "../components/about/Beliefs";
import CtaBand from "../components/sections/CtaBand";
import { experience, cta } from "../data/about";

export default function About() {
  return (
    <>
      <PageHeader title="About" />
      <AboutIntro />
      <Purpose />
      <Approach />
      <FounderStory />
      <Credentials />
      {/* about.html ships the light, ruled variant of this strip; both pages
          run the home page's dark band instead, so the one set of logos reads
          the same wherever it appears. */}
      <LogoMarquee content={experience} variant="dark" />
      <Beliefs />
      {/* A full sentence, not a two-word slogan: the h2 step of the type
          scale rather than the 72px display size. */}
      <CtaBand content={cta} size="compact" />
    </>
  );
}
