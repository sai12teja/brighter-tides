/*
 * Brighter Tides - Privacy Policy and Terms & Conditions.
 *
 * ---------------------------------------------------------------------------
 * BEFORE LAUNCH: have both documents reviewed by counsel.
 * ---------------------------------------------------------------------------
 * This is honest, business-specific boilerplate written to match how the site
 * actually behaves - it describes the inquiry form's real fields, the fact
 * that there is no analytics or advertising script on the site today, and the
 * confidentiality an advisory practice owes its clients. It is not legal
 * advice, and three things are deliberately left as placeholders because they
 * depend on facts only the business can supply:
 *
 *   1. "jurisdiction" below - the governing law and courts.
 *   2. "entity" below - the registered legal name of the practice. Its
 *      address is now set from data/site.
 *   3. The cookies section, which is written for a site that runs no
 *      measurement at all. Add an analytics script and that section has to
 *      change with it.
 *
 * Both documents are driven from this one file so the two pages stay in step:
 * one "sections" array per document, rendered by components/legal/LegalBody.
 * Each section's id is its anchor and its entry in the contents rail, so ids
 * must be unique within a document and should not change once published -
 * people link to them.
 */

import { email as contactEmail, location } from "./site";

/** Shown in the meta line under the title on both documents. */
export const lastUpdated = "18 August 2026";

/**
 * PARTIAL PLACEHOLDER - the registered legal name is still to be confirmed
 * with counsel. Where the practice is based is a settled fact and comes from
 * data/site, so both documents name it without a second place to update.
 */
export const entity = "Brighter Tides";

/** PLACEHOLDER - governing law. Set once the operating jurisdiction is fixed. */
export const jurisdiction = "the jurisdiction in which Brighter Tides is established";

const EMAIL = contactEmail;

export const legalDocuments = {
  "privacy-policy": {
    eyebrow: "Legal",
    title: "Privacy Policy",
    summary:
      "How Brighter Tides handles the information you share with us - what we collect, why we hold it, and what we will never do with it.",
    intro: [
      "This policy covers the Brighter Tides website and the inquiries sent through it. Brighter Tides is an independent ServiceNow advisory practice, and most of what we hold about you is simply what you chose to tell us when you got in touch.",
      "We do not sell personal information, we do not run advertising trackers on this site, and we do not add anyone to a mailing list because they contacted us.",
    ],
    sections: [
      {
        id: "what-we-collect",
        title: "What we collect",
        paragraphs: [
          "Almost everything we hold comes from the inquiry form on the contact page. When you submit it, we receive the fields you filled in:",
        ],
        list: {
          items: [
            "Full name",
            "Company",
            "Work email address",
            "Role or title",
            "The type of help you selected",
            "An upcoming renewal date, if you gave one",
            "Your description of the challenge",
          ],
        },
        after: [
          "If you email us directly or connect with us on LinkedIn instead, we hold whatever that message contains.",
          "Our hosting provider records ordinary server logs - IP address, browser type, pages requested, timestamps - as part of serving and securing the site. We do not use those logs to build a profile of you.",
        ],
      },
      {
        id: "why-we-hold-it",
        title: "Why we hold it",
        paragraphs: [
          "To read your inquiry, work out whether Brighter Tides is the right fit, and reply to you. That is the whole purpose.",
          "If a conversation turns into an engagement, the same details become part of the ordinary record of that engagement - correspondence, scope, and the work itself.",
          "We also keep enough of a record to run the practice responsibly: knowing who we have spoken to, what was discussed, and where a potential conflict of interest might arise.",
        ],
      },
      {
        id: "confidentiality",
        title: "Client confidentiality",
        paragraphs: [
          "Advisory work involves being shown things organizations do not publish: contract terms, licensing positions, platform decisions, internal politics, and the problems behind them.",
          "We treat that material as confidential by default, whether or not a non-disclosure agreement is in place. We do not name clients publicly without permission, and we do not use one client's commercial information to advantage another.",
          "Where a written engagement agreement sets stricter confidentiality terms than this policy, those terms apply.",
        ],
      },
      {
        id: "who-we-share-it-with",
        title: "Who we share it with",
        paragraphs: [
          "We do not sell, rent, or trade personal information, and we do not share it for anyone else's marketing.",
          "A small number of service providers necessarily handle it in the course of running the practice - our email provider, our hosting provider, and the tools used to prepare and deliver work. They act on our instructions and only for those purposes.",
          "We may also disclose information where the law requires it, or where it is necessary to establish or defend a legal claim.",
        ],
      },
      {
        id: "cookies-and-measurement",
        title: "Cookies and measurement",
        paragraphs: [
          "This site does not run advertising trackers, cross-site pixels, or third-party analytics profiling.",
          "The embedded map on the contact page is served by Google and may set cookies of its own when it loads. That embed is the one third-party component on the site; if you would rather it did not load, block third-party content for this domain in your browser.",
          "If measurement is added to this site later, this section will be updated before it goes live.",
        ],
      },
      {
        id: "how-long-we-keep-it",
        title: "How long we keep it",
        paragraphs: [
          "Inquiries that do not lead anywhere are kept only as long as they are useful for context, and are then deleted.",
          "Records connected to an engagement are kept for as long as the relationship continues, and afterwards for the period our professional, tax, and legal obligations require.",
        ],
      },
      {
        id: "your-choices",
        title: "Your choices",
        paragraphs: [
          "You can ask us what we hold about you, ask us to correct it, or ask us to delete it. Depending on where you live you may also have the right to object to or restrict how we use it, or to receive a copy in a portable form.",
        ],
        after: [
          "Write to " + EMAIL + " and we will deal with it. We will not ask you to justify the request, and using these rights will never affect how we work with you.",
        ],
      },
      {
        id: "security",
        title: "Security",
        paragraphs: [
          "The site is served over HTTPS, and the accounts and devices used to run the practice are protected with multi-factor authentication and full-disk encryption.",
          "No system is perfect. If a breach ever affected your information, we would tell you and the relevant regulator as promptly as the law requires - and as promptly as you would want to know.",
        ],
      },
      {
        id: "changes-to-this-policy",
        title: "Changes to this policy",
        paragraphs: [
          "When this policy changes, the date at the top of the page changes with it. Material changes will be described here rather than slipped in quietly.",
        ],
      },
      {
        id: "contact-privacy",
        title: "Contact",
        paragraphs: [
          "Questions about this policy, or about anything we hold, go to " + EMAIL + ". Inquiries are read by Shannon, not a shared inbox.",
          entity + " is an independent ServiceNow advisory practice based in " + location.label + ", United States, and advises its clients remotely.",
        ],
      },
    ],
    closing: {
      title: "Questions about how we handle your information?",
      cta: { label: "Get in touch", to: "/contact" },
    },
  },

  "terms-and-conditions": {
    eyebrow: "Legal",
    title: "Terms & Conditions",
    summary:
      "The terms that apply to this website - what the content here is, what it is not, and where the actual agreement for advisory work lives.",
    intro: [
      "These terms apply to your use of the Brighter Tides website. They are not the terms of an advisory engagement - those are set out in a separate written agreement, and that agreement takes precedence over anything on this page.",
      "By using this site you accept these terms. If you do not accept them, please do not use the site.",
    ],
    sections: [
      {
        id: "using-this-site",
        title: "Using this site",
        paragraphs: ["You are welcome to read, quote, and link to anything published here."],
        list: {
          title: "Please do not:",
          items: [
            "Use the site in a way that damages it or interferes with anyone else's use of it",
            "Attempt to gain unauthorised access to any part of it",
            "Scrape or reproduce the content wholesale as if it were your own",
            "Use the inquiry form for unsolicited sales approaches or automated submissions",
          ],
        },
      },
      {
        id: "not-advice",
        title: "Nothing here is advice for your situation",
        paragraphs: [
          "The pages on this site describe how Brighter Tides approaches ServiceNow licensing, platform strategy, governance, and leadership in general terms.",
          "General material is not a substitute for advice on your environment, your contract, or your roadmap. Licensing outcomes in particular depend on the specific terms of your agreement and the specific state of your platform.",
          "Do not make a renewal, true-up, purchase, or architectural decision on the strength of a web page - ours or anyone else's. Advice for your situation begins with an engagement.",
        ],
      },
      {
        id: "engagements",
        title: "Engagements",
        paragraphs: [
          "Nothing on this site is an offer capable of acceptance, and submitting the inquiry form does not create a client relationship or any obligation on either side.",
          "Advisory work begins only when both parties sign a written agreement setting out the scope, deliverables, fees, confidentiality, and liability for that specific engagement. Where those terms differ from these, the engagement agreement wins.",
        ],
      },
      {
        id: "what-you-send-us",
        title: "What you send us",
        paragraphs: [
          "Please do not send confidential material, contract documents, or personal data about other people through the inquiry form. A short description of the problem is enough to start; we will agree a secure route before anything sensitive changes hands.",
          "Anything you do send is handled in line with our Privacy Policy, and treated as confidential.",
        ],
      },
      {
        id: "independence",
        title: "Independence and trademarks",
        paragraphs: [
          "Brighter Tides is an independent advisory practice. We are not a ServiceNow reseller or implementation partner, we do not take commission on software you buy, and we are not affiliated with, endorsed by, or sponsored by ServiceNow, Inc.",
          "That independence is the point: it is what allows our recommendation to be that you buy nothing at all.",
          "ServiceNow and the ServiceNow logo are trademarks of ServiceNow, Inc. Other product and company names on this site are the trademarks of their respective owners, and are used only to identify those products and companies.",
        ],
      },
      {
        id: "intellectual-property",
        title: "Intellectual property",
        paragraphs: [
          "The content, structure, and design of this site belong to " + entity + " or its licensors. You may quote short extracts with attribution and a link. Republishing substantial parts, or presenting the material as your own, requires written permission.",
        ],
      },
      {
        id: "third-party-links",
        title: "Links to other sites",
        paragraphs: [
          "This site links to third-party sites, including LinkedIn and an embedded map. We do not control them and are not responsible for their content, availability, or privacy practices. A link is not an endorsement.",
        ],
      },
      {
        id: "availability-and-accuracy",
        title: "Availability and accuracy",
        paragraphs: [
          "We aim to keep this site accurate and available, but we do not guarantee either. Content may become out of date, particularly where it describes a vendor's licensing or product model, and the site may be unavailable for maintenance or for reasons outside our control.",
          "The site is provided on an as-is basis, without warranties of any kind so far as the law allows.",
        ],
      },
      {
        id: "liability",
        title: "Liability",
        paragraphs: [
          "To the extent permitted by law, Brighter Tides is not liable for loss arising from your use of, or reliance on, this website - including lost profits, lost savings, or business interruption.",
          "Liability for advisory work is dealt with in the engagement agreement for that work, not here. Nothing in these terms limits liability for fraud, for death or personal injury caused by negligence, or for anything else that cannot lawfully be limited.",
        ],
      },
      {
        id: "governing-law",
        title: "Governing law",
        paragraphs: [
          "These terms are governed by the laws of " + jurisdiction + ", and disputes relating to them fall to the courts of that jurisdiction.",
        ],
      },
      {
        id: "changes-to-these-terms",
        title: "Changes to these terms",
        paragraphs: [
          "We may update these terms from time to time. The date at the top of the page shows when they last changed, and the version published here is the one that applies.",
        ],
      },
      {
        id: "contact-terms",
        title: "Contact",
        paragraphs: ["Questions about these terms go to " + EMAIL + "."],
      },
    ],
    closing: {
      title: "Want to talk about an actual ServiceNow decision?",
      cta: { label: "Discuss Your Challenge", to: "/contact" },
    },
  },
};

/** Route table for the footer's legal links and the sidebar's cross-link. */
export const legalRoutes = [
  { slug: "privacy-policy", label: "Privacy Policy" },
  { slug: "terms-and-conditions", label: "Terms & Conditions" },
];
