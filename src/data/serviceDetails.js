// Brighter Tides - service detail pages, keyed by route slug.
//
// The three pages share one shape, so they share one component
// (pages/ServiceDetail.jsx). Optional blocks are simply omitted:
// `advocate` appears only on fractional leadership, and `engagementFirst`
// swaps the engagement and outcome blocks for strategic advisory.

export const serviceDetails = {
  "servicenow-licensing-contract-advisory": {
    eyebrow: "ServiceNow Licensing & Contract Advisory",
    title: "Make Your Next ServiceNow Investment Decision With Confidence.",
    desc: "We provide independent guidance to help you understand your ServiceNow licensing, utilization, future needs, and options before you renew, expand, or true-up.",
    cta: { label: "Discuss Your Licensing Challenge", to: "/contact" },
    image: "/assets/images/service/tj-service-1.webp",

    intro: {
      title: "Know What You're Paying For—and Why.",
      paragraphs: [
        "ServiceNow licensing can become expensive quickly as organizations grow, add products, and accumulate licenses that aren't being fully utilized.",
        "We help you understand what you own, what you're using, and what you'll actually need based on your roadmap.",
      ],
    },

    areas: {
      title: "How We Help",
      items: [
        {
          icon: "tji-optimization",
          title: "Contract & Renewal Review",
          desc: "Review your agreement, licensing structure, utilization, future demand, and renewal strategy.",
        },
        {
          icon: "tji-strategic",
          title: "New License & Product Evaluation",
          desc: "Evaluate proposed ServiceNow products and determine whether existing capabilities can meet the business need.",
        },
        {
          icon: "tji-results",
          title: "Compliance & True-Up Advisory",
          desc: "Identify potential licensing gaps and evaluate options for reducing unnecessary cost and future compliance risk.",
        },
      ],
    },

    list: {
      title: "What We Review",
      items: [
        "Existing ServiceNow agreements",
        "Current license utilization",
        "Anticipated future demand",
        "Underutilized licenses",
        "Roadmap alignment",
        "Proposed products and capabilities",
        "Potential licensing gaps",
        "Renewal considerations",
      ],
    },

    outcome: {
      eyebrow: "The Goal",
      title: "Spend Intentionally.",
      desc: "Reduce shelfware, understand your options, and ensure every ServiceNow investment supports a real business need.",
    },

    engagement: {
      title: "Focused Advice. Clear Recommendations.",
      paragraphs: [
        "Engagements may include discovery, contract and utilization review, recommendations, and an executive review session.",
      ],
    },

    faq: [
      {
        id: "when-to-review",
        question: "When should we review our ServiceNow licensing?",
        answer:
          "Ideally before a renewal, true-up, major expansion, or purchase of additional ServiceNow products.",
      },
      {
        id: "unused-licenses",
        question: "Can you help identify unused ServiceNow licenses?",
        answer:
          "Yes. We can evaluate current utilization and anticipated future demand to identify potential underutilization.",
      },
      {
        id: "reseller",
        question: "Are you a ServiceNow reseller?",
        answer:
          "Our advisory is independent and focused on helping you determine what makes sense for your organization.",
      },
      {
        id: "evaluate-product",
        question: "Can you evaluate a proposed ServiceNow product before we purchase it?",
        answer:
          "Yes. We can evaluate the business need, existing capabilities, expected utilization, cost, and licensing implications.",
      },
    ],

    closing: {
      title: "Have a ServiceNow Renewal or Licensing Decision Ahead?",
      paragraphs: ["Let's make sure you understand your options before you commit."],
      cta: { label: "Discuss Your Licensing Challenge", to: "/contact" },
    },
  },

  "servicenow-strategic-advisory": {
    eyebrow: "ServiceNow Strategic Advisory",
    title: "Solve the Challenge Without Creating More Complexity.",
    desc: "Sometimes you don't need another implementation partner. You need experienced perspective to evaluate the problem, challenge assumptions, and determine what makes sense.",
    cta: { label: "Discuss Your ServiceNow Challenge", to: "/contact" },
    image: "/assets/images/service/tj-service-2.webp",
    engagementFirst: true,

    intro: {
      title: "When the Question Isn't “How Do We Implement It?”—But “What Should We Do?”",
      paragraphs: [
        "We provide targeted advisory around specific platform, operating model, and business challenges so you can make informed decisions before committing additional time, resources, or budget.",
      ],
    },

    areas: {
      title: "Advisory Areas",
      items: [
        {
          icon: "tji-results",
          title: "Platform Value Optimization",
          desc: "Identify opportunities to generate greater value from ServiceNow capabilities you already own.",
        },
        {
          icon: "tji-performance",
          title: "Platform Health & Simplification",
          desc: "Develop a strategy for moving a highly customized environment toward a healthier, more sustainable approach.",
        },
        {
          icon: "tji-strategy",
          title: "Platform Assessment & Roadmap",
          desc: "Evaluate the platform, operating model, utilization, and goals to establish clear priorities for what comes next.",
        },
        {
          icon: "tji-cube",
          title: "Solution & Use-Case Advisory",
          desc: "Evaluate potential solutions, licensing implications, implementation approaches, costs, timelines, risks, and tradeoffs.",
        },
        {
          icon: "tji-process",
          title: "Delivery & Operating Model Advisory",
          desc: "Improve governance, demand management, development methodology, release practices, and platform decision-making.",
        },
      ],
    },

    list: {
      title: "What We Consider",
      items: [
        "Solution Options",
        "Existing Capabilities",
        "Licensing Implications",
        "Implementation Approach",
        "Estimated Timeline",
        "Cost Considerations",
        "Risks & Tradeoffs",
        "Business Value",
      ],
    },

    engagement: {
      eyebrow: "Flexible by Design",
      title: "Scoped Around the Problem. Not a Predetermined Package.",
      paragraphs: [
        "An engagement might be a focused executive advisory session or a multi-week assessment and roadmap.",
        "We shape the scope around the problem you're trying to solve.",
      ],
    },

    outcome: {
      title: "A Clear, Actionable Path Forward.",
      desc: "Our goal is to give you the clarity to make the next decision—without creating unnecessary consulting work.",
    },

    faq: [
      {
        id: "what-is-strategic-advisory",
        question: "What is ServiceNow Strategic Advisory?",
        answer:
          "We help organizations evaluate ServiceNow platform, roadmap, operating model, use-case, and value decisions before committing to a particular solution or investment.",
      },
      {
        id: "assess-environment",
        question: "Can you assess an existing ServiceNow environment?",
        answer:
          "Yes. We can evaluate your platform, utilization, operating model, priorities, and organizational goals to help determine what should come next.",
      },
      {
        id: "simplify-platform",
        question: "Can you help simplify an overly customized ServiceNow platform?",
        answer:
          "Yes. We can help establish a strategy for moving toward a healthier and more sustainable platform approach.",
      },
      {
        id: "long-term-contract",
        question: "Do strategic advisory engagements require a long-term contract?",
        answer:
          "Not necessarily. Engagements can range from a focused advisory session to a multi-week assessment depending on the challenge.",
      },
    ],

    closing: {
      title: "Facing a ServiceNow Decision Without a Clear Answer?",
      paragraphs: ["Let's evaluate the options and determine what makes sense."],
      cta: { label: "Discuss Your Challenge", to: "/contact" },
    },
  },

  "fractional-servicenow-platform-leadership": {
    eyebrow: "Fractional ServiceNow Platform Leadership",
    title: "Senior ServiceNow Leadership Without Another Full-Time Hire.",
    desc: "We provide experienced platform leadership through a flexible engagement—helping protect your investment, guide priorities, manage partners, and keep ServiceNow aligned with business value.",
    cta: { label: "Discuss Fractional Leadership", to: "/contact" },
    image: "/assets/images/service/tj-service-3.webp",

    intro: {
      title: "Your Platform Still Needs an Owner.",
      paragraphs: [
        "Not every organization needs—or can justify—a full-time senior ServiceNow Platform Owner.",
        "But someone still needs to protect the investment, guide the roadmap, establish priorities, oversee licensing, manage vendors, and keep the platform delivering value.",
        "That's where fractional leadership can help.",
      ],
    },

    areas: {
      title: "How We Support Your Team",
      items: [
        {
          icon: "tji-strategy",
          title: "Strategy & Roadmap",
          desc: "Roadmap development, prioritization, product planning, and investment evaluation.",
        },
        {
          icon: "tji-performance",
          title: "Governance & Platform Health",
          desc: "Platform governance, technical-debt oversight, release practices, and development governance.",
        },
        {
          icon: "tji-manage",
          title: "Vendors & Partners",
          desc: "Implementation partner management and independent oversight of recommendations.",
        },
        {
          icon: "tji-optimization",
          title: "Licensing & Investment",
          desc: "Contract oversight, licensing strategy, business cases, and investment evaluation.",
        },
        {
          icon: "tji-executive",
          title: "Executive Alignment",
          desc: "Stakeholder advisory, strategy meetings, executive reporting, and value realization.",
        },
      ],
    },

    list: {
      title: "Capabilities",
      items: [
        "ServiceNow roadmap development",
        "Executive & stakeholder advisory",
        "Platform governance",
        "Vendor & implementation partner management",
        "Contract & licensing oversight",
        "Demand & backlog prioritization",
        "Platform health oversight",
        "Release & development governance",
        "Business-case evaluation",
        "Product & capability planning",
        "Executive reporting",
        "Value realization",
      ],
    },

    advocate: {
      eyebrow: "Independent Advocacy",
      title: "Someone Sitting on Your Side of the Table.",
      paragraphs: [
        "We can act as an independent advocate between your organization, ServiceNow, and your implementation partners.",
        "Our role is to help ensure recommendations stay aligned with your business priorities—not simply additional technology spend.",
      ],
    },

    engagement: {
      eyebrow: "Flexible Leadership",
      title: "Experienced Leadership at the Level You Need.",
      paragraphs: [
        "Fractional Platform Leadership is provided through a recurring monthly allocation of advisory and leadership hours based on the level of support your organization needs.",
        "You gain experienced ServiceNow leadership without adding another full-time senior position.",
      ],
    },

    faq: [
      {
        id: "what-is-fractional",
        question: "What is a Fractional ServiceNow Platform Owner?",
        answer:
          "A fractional Platform Owner provides senior ServiceNow leadership on a flexible basis without requiring a full-time senior hire.",
      },
      {
        id: "what-can-they-manage",
        question: "What can a fractional ServiceNow leader manage?",
        answer:
          "Support can include strategy, roadmap, governance, vendors, licensing, platform health, prioritization, executive reporting, and value realization.",
      },
      {
        id: "existing-partner",
        question: "Can you work with our existing ServiceNow partner?",
        answer:
          "Yes. We can work alongside your existing partners while providing independent oversight and helping keep recommendations aligned with your organization's priorities.",
      },
      {
        id: "ongoing",
        question: "Is Fractional Platform Leadership ongoing?",
        answer:
          "Yes. It is designed as a recurring monthly engagement based on the amount of advisory and leadership support your organization requires.",
      },
    ],

    closing: {
      title: "Your ServiceNow Investment Deserves Experienced Leadership.",
      paragraphs: ["Get senior platform guidance without adding another full-time position."],
      cta: { label: "Discuss Fractional Leadership", to: "/contact" },
    },
  },
};
