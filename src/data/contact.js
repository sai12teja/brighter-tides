// Brighter Tides - Contact page content.

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

// Direct contact details, shown as a ruled list beneath the form/map row.
export const direct = {
  title: "Prefer to reach out directly?",
  email: "hello@brightertides.com",
  linkedin: {
    label: "Connect on LinkedIn",
    // Shown as the card's value - swap for the real profile handle.
    handle: "Shannon Chapman",
    href: "https://www.linkedin.com/",
  },
  note: "Every inquiry is read by Shannon, not a shared inbox.",
};

// PLACEHOLDER LOCATION. This is the embed contact.html ships with. Brighter
// Tides is a remote advisory practice with no public office, so replace this
// with the real service area (or drop the map) before launch - a map pin on
// somewhere the business is not is worse than no map at all.
export const map = {
  title: "Brighter Tides service area",
  embedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96840.74259815917!2d-74.21035326499913!3d40.66794886378488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1742025261462!5m2!1sen!2sbd",
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
