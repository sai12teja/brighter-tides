// Brighter Tides - Home page content.

export const hero = {
  eyebrow: "Independent ServiceNow Advisory",
  titleLead: "Get More Value From Your",
  // The accent line - theme accent colour, as the template's highlighted
  // phrase always was - is typed out a character at a time behind a caret,
  // held, cleared, and followed by the next word, on a loop. Each is a whole
  // sentence with the lead: "Get More Value From Your ServiceNow." then
  // "...From Your Investment."
  //
  // The full stop belongs to each phrase so it arrives with the word it
  // punctuates instead of hanging in space while the line is empty. Add or
  // reorder freely - the space the line reserves is sized to whichever
  // phrase is tallest, so a longer one cannot make the headline jump.
  titlePhrases: ["ServiceNow.", "Investment."],
  // What the <h1> says to a screen reader, and what a visitor copying the
  // headline gets: one settled line rather than a rotation.
  titleReadAs: "ServiceNow Investment.",
  desc: "We provide independent, executive-level ServiceNow advisory to help organizations make smarter decisions around licensing, platform strategy, governance, and leadership—without the complexity of a large consulting engagement.",
  primaryCta: { label: "Discuss Your ServiceNow Challenge", to: "/contact" },
  secondaryCta: { label: "Explore Our Services", to: "/services" },
};

export const about = {
  eyebrow: "About Brighter Tides",
  title: "Clearer ServiceNow Decisions. Better Business Outcomes.",
  paragraphs: [
    "We help organizations get more from ServiceNow through experienced, independent advisory.",
    "Whether you're approaching a renewal, evaluating new capabilities, improving a complex platform, or deciding what comes next, we help you understand your options and move forward with confidence.",
  ],
  highlights: ["Independent Perspective", "Executive-Level Guidance", "Business-First Strategy"],
  cta: { label: "About Brighter Tides", to: "/about" },
};

export const founder = {
  eyebrow: "Meet the Founder",
  title: "Executive Experience Behind Every Recommendation.",
  name: "Shannon Chapman",
  role: "Founder & Principal Consultant",
  // The home and about pages carry different frames of Shannon: this one,
  // and the studio headshot in data/about. Both are exported to the 645:796
  // the founder panels are built around, so swapping either does not resize
  // the panel it sits in.
  image: "/assets/images/bt/photos/shannon-home.webp",
  imageSmall: "/assets/images/bt/photos/shannon-home-645.webp",
  paragraphs: [
    "Shannon brings 18+ years of enterprise technology and business transformation leadership, combining deep ServiceNow experience with an executive understanding of strategy, governance, technology investment, and business priorities.",
    "Her approach is practical: understand the challenge, challenge assumptions, and create a clear path forward.",
  ],
  // `count` marks a figure that rolls up on scroll; `text` is a credential
  // that happens to contain a number but is not one ("Fortune 500").
  stats: [
    { count: 18, suffix: "+ Years", label: "Technology Leadership" },
    { text: "Fortune 500", label: "Leadership Experience" },
    { prefix: "$", count: 10, suffix: "M+", label: "Technology Portfolios" },
    { text: "Executive", label: "Perspective" },
  ],
  cta: { label: "Meet Shannon", to: "/about" },
};

export const experience = {
  eyebrow: "Proven Track Record",
  title: "Experience Shaped Across Leading Organizations.",
  note: "Organizations shown reflect Shannon Chapman's professional leadership experience.",
};

export const challenge = {
  eyebrow: "The ServiceNow Challenge",
  title: "You Have ServiceNow. Are You Getting the Value You Expected?",
  desc: "ServiceNow is a significant investment. As your environment grows, licensing costs, customization, platform complexity, and uncertainty can grow with it.",
  items: [
    {
      icon: "tji-optimization",
      title: "Rising Licensing Costs",
      desc: "Are you paying for capabilities your team isn't fully using, and could that spend be reduced?",
    },
    {
      icon: "tji-cube",
      title: "Platform Complexity",
      desc: "Has customization over time made your environment harder to maintain, update, and keep running smoothly?",
    },
    {
      icon: "tji-strategy",
      title: "Unclear Roadmap",
      desc: "Are you unsure what ServiceNow should solve next, or how to prioritize what comes after this?",
    },
    {
      icon: "tji-leadership",
      title: "Limited Platform Leadership",
      desc: "Who is protecting this investment, keeping priorities aligned, and making sure the platform delivers real value?",
    },
  ],
  note: "Sometimes you don't need another implementation. You need clarity on what to do next.",
};

export const expertise = {
  eyebrow: "Core ServiceNow Expertise",
  title: "Strategic Expertise Across Your ServiceNow Investment.",
};

export const servicesSection = {
  eyebrow: "ServiceNow Advisory Services",
  title: "Focused Expertise for the Decisions That Matter.",
};

export const whyUs = {
  eyebrow: "Why Brighter Tides",
  title: "Independent Advice. Built Around Your Business.",
  items: [
    {
      icon: "tji-globe",
      title: "Independent Perspective",
      desc: "Our recommendations focus on what makes sense for your organization—not on selling additional technology.",
    },
    {
      icon: "tji-executive",
      title: "Executive Experience",
      desc: "We look beyond the platform to consider business value, cost, risk, and organizational priorities.",
    },
    {
      icon: "tji-manage",
      title: "Right-Sized Engagements",
      desc: "We solve the challenge you actually have without automatically creating a large consulting project.",
    },
    {
      icon: "tji-results",
      title: "Practical Direction",
      desc: "We give you recommendations, priorities, and a path your organization can act on.",
    },
  ],
};

export const process = {
  eyebrow: "How We Work",
  title: "From ServiceNow Challenge to Clear Direction.",
  image: "/assets/images/bt/photos/services-problem-main.webp",
  cta: { label: "Discuss Your ServiceNow Challenge", to: "/contact" },
  steps: [
    {
      number: "01",
      title: "Start With the Problem",
      desc: "Tell us what's happening or what decision you're facing.",
      link: { label: "Start the conversation", to: "/contact" },
    },
    {
      number: "02",
      title: "Get an Independent Perspective",
      desc: "We assess the situation, challenge assumptions, and evaluate your options.",
      link: { label: "See how we help", to: "/services" },
    },
    {
      number: "03",
      title: "Move Forward With Clarity",
      desc: "Get practical recommendations, clear priorities, and an actionable path forward.",
      link: { label: "Meet Shannon", to: "/about" },
    },
  ],
};

export const faq = {
  eyebrow: "Common Questions",
  title: "ServiceNow Advisory, Explained.",
  // The panel beside the accordion - a room rather than a face, so the
  // heading laid over it has somewhere quiet to sit.
  image: "/assets/images/bt/photos/contact-hero.webp",
  panelTitle: "Questions and answers.",
  panelNote: "Not covered here? Tell us the decision you are facing and we will point you at the right starting place.",
  panelCta: { label: "Ask us directly", to: "/contact" },
  items: [
    {
      id: "advisory-consultant",
      question: "What does a ServiceNow advisory consultant do?",
      answer:
        "We help organizations make informed decisions around ServiceNow licensing, platform strategy, governance, operating models, optimization, and leadership.",
    },
    {
      id: "licensing-renewals",
      question: "Can you help with ServiceNow licensing and renewals?",
      answer:
        "Yes. We can review agreements, utilization, anticipated demand, renewal needs, and licensing options before you make your next investment decision.",
    },
    {
      id: "implementations",
      question: "Do you provide ServiceNow implementations?",
      answer:
        "Our primary focus is advisory, strategy, licensing, governance, and platform leadership. When implementation support is needed, we can help determine the right approach and resources.",
    },
    {
      id: "fractional-leadership",
      question: "What is Fractional ServiceNow Platform Leadership?",
      answer:
        "It gives your organization experienced ServiceNow platform leadership on a flexible basis without requiring another full-time senior position.",
    },
    {
      id: "which-service",
      question: "What if we don't know which service we need?",
      answer:
        "That's okay. Tell us what's happening or what decision you're trying to make. We'll help determine the right approach.",
    },
  ],
};

export const finalCta = {
  eyebrow: "Not Sure What You Need?",
  title: "Start With the Problem.",
  paragraphs: [
    "Tell us what's happening with your ServiceNow environment, what decision you're facing, or where you're struggling to get value.",
    "We'll help determine what makes sense next.",
  ],
  cta: { label: "Discuss Your ServiceNow Challenge", to: "/contact" },
};
