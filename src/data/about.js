// Brighter Tides - About page content.
//
// Shared with the home page where the same fact appears twice: the founder's
// credentials and the experience-logo strip are imported from data/home.js
// rather than restated, so the two pages cannot drift apart.

import { founder as homeFounder, experience } from "./home";

export const hero = {
  eyebrow: "About Brighter Tides",
  title: "Independent ServiceNow Guidance, Grounded in Executive Experience.",
  desc: "We help organizations make better ServiceNow decisions through experienced, independent advisory focused on business value—not more technology for technology's sake.",
};

export const purpose = {
  eyebrow: "Our Purpose",
  title: "Better Decisions Before More Technology.",
  paragraphs: [
    "ServiceNow can create tremendous business value—but only when platform decisions, licensing, governance, and investment stay aligned with what the organization actually needs.",
    "That's where we come in.",
    "We help you step back from day-to-day complexity, understand what's working, identify what isn't, and make informed decisions about where to go next.",
  ],
  note: "Our goal is simple: help you get more value from the investment you've already made.",
  image: "/assets/images/about/h4-about-1.webp",
};

export const approach = {
  eyebrow: "Our Approach",
  title: "Advice Designed Around Your Organization.",
  items: [
    {
      icon: "tji-globe",
      title: "Independent",
      desc: "We evaluate what makes sense for your organization—not what creates more technology spend.",
    },
    {
      icon: "tji-results",
      title: "Practical",
      desc: "Our recommendations are designed to be understood, prioritized, and acted upon.",
    },
    {
      icon: "tji-executive",
      title: "Experienced",
      desc: "We combine ServiceNow expertise with executive technology leadership.",
    },
    {
      icon: "tji-business",
      title: "Business-First",
      desc: "Every recommendation considers value, cost, risk, priorities, and long-term impact.",
    },
  ],
};

export const founder = {
  eyebrow: "Meet Shannon",
  title: "Technology Leadership From the Executive Side of the Table.",
  name: homeFounder.name,
  role: homeFounder.role,
  image: homeFounder.image,
  paragraphs: [
    "Shannon brings more than 18 years of enterprise technology and business transformation leadership to Brighter Tides.",
    "Her experience goes beyond the platform itself. She understands the decisions leaders face around technology investment, governance, vendors, organizational priorities, and demonstrating business value.",
    "Through Brighter Tides, we bring that perspective to organizations that need experienced ServiceNow guidance without the complexity of a traditional large consulting engagement.",
  ],
  cta: { label: "Learn More About Shannon", to: "/contact" },
};

// Same figures as the home page, with the fuller labels this page uses.
export const credentials = [
  { count: 18, suffix: "+ Years", label: "Technology & Business Transformation" },
  { text: "Fortune 500", label: "Leadership Experience" },
  { prefix: "$", count: 10, suffix: "M+", label: "Technology Portfolios" },
  { text: "Executive", label: "Leadership Perspective" },
];

export { experience };

export const beliefs = {
  eyebrow: "What We Believe",
  title: "Good Advisory Should Create Clarity, Not Dependency.",
  paragraphs: [
    "We don't believe every ServiceNow challenge needs to become a six-month consulting project.",
    "Sometimes the right answer is optimizing what you already own. Sometimes it's simplifying the platform, improving governance, making a better licensing decision, or bringing in the right implementation support.",
    "Our role is to help you understand which path actually makes sense.",
  ],
  image: "/assets/images/about/h5-about-1.webp",
};

export const cta = {
  title: "Have a ServiceNow Decision You're Trying to Make?",
  paragraphs: ["Start with the problem. We'll help you determine the right path forward."],
  cta: { label: "Discuss Your ServiceNow Challenge", to: "/contact" },
};
