/**
 * The story, in order. Each step says what I did and what I learned.
 * Newest last, so the timeline reads like growth.
 */

export type Step = {
  period: string;
  title: string;
  org: string;
  kind: string;
  place: string;
  text: string;
  href?: string;
};

export const story: Step[] = [
  {
    period: "TODO(safwan): years",
    title: "Computer science degree",
    org: "Muffakham Jah College of Engineering and Technology",
    kind: "Degree",
    place: "Hyderabad",
    text: "Studied computer science and found my strength on the backend: data, APIs and how the parts of a system fit together.",
  },
  {
    period: "Jul 2024 – Apr 2025",
    title: "Core team member",
    org: "IEEE Signal Processing Society",
    kind: "Volunteer",
    place: "Hyderabad",
    text: "Helped organise technical workshops and events for students. Learned to plan work with other people and deliver it on a date.",
  },
  {
    period: "Jun – Aug 2025",
    title: "Solo founder, Shipped Season 1",
    org: "Lovable",
    kind: "Selected founder",
    place: "Remote",
    text: "Selected as a solo founder to build and ship startup MVPs end to end. Built Zenix, which ranked in the top 28 in Asia in a Lovable weekly challenge.",
    href: "/work/zenix/",
  },
  {
    period: "Jun – Oct 2025",
    title: "Incubatee",
    org: "SU Knowledge Hub Foundation",
    kind: "Incubation",
    place: "Hyderabad",
    text: "Worked on AI products and early-stage startup ideas with structured mentorship.",
  },
  {
    period: "Oct – Nov 2025",
    title: "Intern",
    org: "Mindalike",
    kind: "Internship",
    place: "Hyderabad",
    text: "TODO(safwan): what you worked on and shipped at Mindalike.",
  },
  {
    period: "Mar – Apr 2026",
    title: "Two papers on AI agent security",
    org: "arXiv",
    kind: "Research",
    place: "",
    text: "Published AegisUI, on detecting misleading agent-generated interfaces, and APEX, on letting agents pay for APIs under a spending policy.",
    href: "#research",
  },
  {
    period: "Oct 2026 – now",
    title: "MSc Applied AI",
    org: "London South Bank University",
    kind: "Master's",
    place: "London",
    text: "A two-year course with a placement year. I am here to learn how AI systems work from first principles, not only how to call them.",
  },
];
