// Brighter Tides - Contact page content.

import { email, location } from "./site";

export const hero = {
  eyebrow: "Contact Brighter Tides",
  title: "Start With the Problem.",
  lead: "You don't need to know which service you need.",
  desc: "Tell us what's happening with your ServiceNow environment, what decision you're facing, or where you're struggling to get value. We'll help determine the right approach.",
};

export const enquiryOptions = [
  "Licensing & Contract Advisory",
  "Strategic Advisory",
  "Fractional Platform Leadership",
  "Not Sure Yet",
];

export const form = {
  title: "Tell us about your ServiceNow challenge.",
  submitLabel: "Submit Inquiry",
  // `name` doubles as the FormData key. The form is uncontrolled - see
  // components/contact/ContactForm for why.
  fields: {
    fullName: { name: "fullName", label: "Full Name", placeholder: "Full Name*", required: true },
    company: { name: "company", label: "Company", placeholder: "Company*", required: true },
    email: { name: "email", label: "Work Email", placeholder: "Work Email*", required: true, type: "email" },
    role: { name: "role", label: "Role / Title", placeholder: "Role / Title" },
    enquiry: { name: "enquiry", label: "What can we help with?", placeholder: "What can we help with?*", required: true },
    renewalDate: {
      name: "renewalDate",
      label: "Upcoming ServiceNow Renewal Date",
      placeholder: "Upcoming ServiceNow Renewal Date (optional)",
    },
    challenge: {
      name: "challenge",
      label: "Tell us about your ServiceNow challenge",
      placeholder: "Tell us about your ServiceNow challenge*",
      required: true,
    },
  },
  success: {
    title: "Thanks - your inquiry is with us.",
    desc: "We'll review what you've shared and be in touch if a conversation makes sense.",
  },
};

// Direct contact details, shown as a card row above the form/map row.
export const direct = {
  title: "Prefer to reach out directly?",
  email,
  linkedin: {
    label: "Connect on LinkedIn",
    // Shown as the card's value - swap for the real profile handle.
    handle: "Shannon Chapman",
    href: "https://www.linkedin.com/",
  },
  // The practice advises remotely, so the card says where it is based rather
  // than implying a walk-in office.
  location: {
    title: "Where we're based",
    value: location.label,
    note: location.region,
  },
  note: "Every inquiry is read by Shannon, not a shared inbox.",
};

// The template shipped a New York pin; this one is built from the practice's
// own base (data/site). The `maps?q=...&output=embed` form is used rather than
// the `maps/embed?pb=` blob Google's share dialog produces: the `pb` string
// encodes a specific viewport and place id that cannot be edited by hand, so
// it would go stale silently the next time the location changes. This form
// needs no API key and geocodes the query on load.
//
// Brighter Tides advises remotely and has no walk-in office, so the map is
// deliberately zoomed to the city rather than a street address.
export const map = {
  title: `Brighter Tides is based in ${location.label}`,
  embedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(location.mapQuery)}&z=11&output=embed`,
};

export const cta = {
  // Deliberately not pointing at /contact - the visitor is already here.
  title: "Not sure which service fits your challenge?",
  cta: { label: "Explore Our Services", to: "/services" },
};

export const reassurance = {
  eyebrow: "What Happens Next?",
  title: "A Considered Reply, Not a Sales Call.",
  steps: [
    {
      icon: "tji-search",
      title: "We review your inquiry",
      desc: "We'll review your inquiry to understand the challenge and determine whether Brighter Tides is the right fit.",
    },
    {
      icon: "tji-email",
      title: "We reach out",
      desc: "If a conversation makes sense, we'll reach out to arrange the next step.",
    },
    {
      icon: "tji-check",
      title: "No calendar required",
      desc: "No public calendar booking required.",
    },
  ],
};
