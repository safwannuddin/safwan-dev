/**
 * Facts about me, in one place. Layout code never hard-codes these.
 * Any string starting with "TODO(safwan)" is a placeholder for a fact
 * only I can supply; it is hidden in production builds.
 */

export const SITE_URL = "https://safwan-dev.netlify.app";

export const person = {
  name: "Safwan Uddin Mohammed",
  // Older spellings people may search for (arXiv papers use the first).
  alternateNames: ["Mohd Safwan Uddin", "Safwan Uddin"],
  shortName: "Safwan",
  initials: "SU",
  identity:
    "I build AI systems and learn how they work underneath. MSc Applied AI student in London.",
  description:
    "Safwan Uddin Mohammed is an MSc Applied AI student at London South Bank University who builds AI systems and publishes research on AI agent security.",
  status: "MSc Applied AI · LSBU · London",
  location: "London, UK",
  lookingFor: "AI/ML engineering placements and roles in the UK",
  photo: "/safwan-uddin-mohammed.jpg",
  email: "safwanuddin.work@gmail.com",
  // TODO(safwan): second email address. Shown in Contact when filled in.
  email2: "",
};

export const links = {
  linkedin: "https://www.linkedin.com/in/safwan-uddin-mohammed-299602257/",
  github: "https://github.com/safwannuddin",
  card: "https://safwannuddin.github.io/Card/",
  // TODO(safwan): full URL of your new X account, e.g. https://x.com/handle
  x: "",
};

/** The "Now" panel in the hero: plain facts, no buzzwords. */
export const now: { label: string; value: string; href?: string }[] = [
  { label: "Studying", value: "MSc Applied AI, LSBU", href: "#experience" },
  { label: "Researching", value: "AI agent security", href: "#research" },
  { label: "Building", value: "Fair Price, a London price estimator", href: "/work/fair-price/" },
  { label: "Open to", value: "AI/ML placements in the UK", href: "#contact" },
];

export const nav = [
  { id: "work", label: "Work" },
  { id: "research", label: "Research" },
  { id: "experience", label: "Experience" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
] as const;
