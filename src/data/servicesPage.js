// Brighter Tides - Services page content.

import { services as serviceRoutes, CONTACT_FORM } from "./navigation";

export const hero = {
  eyebrow: "ServiceNow Advisory Services",
  title: "Experienced Guidance for the ServiceNow Decisions That Matter.",
  // First is the claim and is set as the lead; the rest are supporting
  // detail at body size - the same shape the about page's opening uses.
  paragraphs: [
    "From licensing and platform strategy to ongoing platform leadership, we help organizations make smarter ServiceNow decisions and keep their investment aligned with business value.",
    "Our advisory spans the full lifecycle, from initial platform decisions through to long-term governance; so you get consistent, experienced guidance at every stage.",
  ],
};

export const problemFirst = {
  eyebrow: "How Can We Help?",
  title: "Start With What You're Trying to Solve.",
  lead: "You don't need to know which service fits before contacting us.",
  paragraphs: [
    "Tell us what's happening with your ServiceNow environment, what decision you're facing, or where you're struggling to get value. We'll help determine the right approach.",
  ],
  cta: { label: "Discuss Your ServiceNow Challenge", to: CONTACT_FORM },
};

// The template's services page card (`service-style-2`) carries an icon, a
// number, a title, copy and a thumbnail. Icons and slugs come from
// navigation.js so the page, the menu and the routes stay in step.
export const cards = serviceRoutes.map((route, i) => ({
  slug: route.slug,
  icon: route.icon,
  number: String(i + 1).padStart(2, "0"),
  to: `/services/${route.slug}`,
  // The same photograph the home page's card uses, at its 1x width - here
  // it sits behind a navy scrim and only appears on hover, so it does not
  // need the 2x file.
  image: `/assets/images/bt/photos/service-0${i + 1}-645.webp`,
}));

export const cardCopy = {
  "servicenow-licensing-contract-advisory": {
    titleLines: ["ServiceNow Licensing &", "Contract Advisory"],
    lead: "Optimize your investment before you renew, expand, or true-up.",
    desc: "We help you understand what you're paying for, what you're actually using, and what you'll need based on where your organization is going.",
  },
  "servicenow-strategic-advisory": {
    titleLines: ["ServiceNow Strategic", "Advisory"],
    lead: "Solve the ServiceNow challenges that don't require a six-month consulting engagement.",
    desc: "We help evaluate platform, operating model, roadmap, value, and business challenges to determine a practical path forward.",
  },
  "fractional-servicenow-platform-leadership": {
    titleLines: ["Fractional ServiceNow", "Platform Leadership"],
    lead: "Senior ServiceNow leadership without the cost of another full-time senior position.",
    desc: "We provide ongoing strategic oversight to help protect your investment, guide priorities, manage partners, and keep ServiceNow aligned with business value.",
  },
};

export const expertise = {
  eyebrow: "Where We Help",
  title: "Expertise Across Your ServiceNow Investment.",
  items: [
    "Licensing & Renewals",
    "Platform Assessments",
    "Roadmap Development",
    "Value Optimization",
    "Platform Governance",
    "Operating Models",
    "Vendor Management",
    "Platform Health",
    "Executive Advisory",
    "Value Realization",
  ],
};

export const cta = {
  title: "Not Sure Which Service Fits?",
  paragraphs: ["That's okay. Start with the challenge, not the service."],
  cta: { label: "Discuss Your ServiceNow Challenge", to: CONTACT_FORM },
};
