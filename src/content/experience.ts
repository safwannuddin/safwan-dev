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
    period: "2022 – 2026",
    title: "B.E. Computer Science",
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
    title: "Founder, Zenix",
    org: "Lovable Shipped Season 1",
    kind: "Selected founder",
    place: "Remote",
    text: "Selected as a solo founder. Built Zenix, a three-agent UI generator, which ranked in the top 28 in Asia among 3,000+ participants in a weekly challenge.",
    href: "/work/zenix/",
  },
  {
    period: "Aug 2025 – Jan 2026",
    title: "Incubatee",
    org: "SU Knowledge Hub Foundation",
    kind: "Incubation",
    place: "Hyderabad",
    text: "Built NeuroNav, a brain MRI classification pipeline with CNN, SVM and Random Forest, and used Grad-CAM heatmaps so doctors can check why the model decided what it did.",
    href: "/work/neuronav/",
  },
  {
    period: "Dec 2025 – Feb 2026",
    title: "Machine Learning Intern",
    org: "Mindalike",
    kind: "Internship",
    place: "Hyderabad",
    text: "Built a user-matching system with TF-IDF features and cosine similarity, wired into the live product's REST APIs. Owned the ML work end to end in a three-person startup team.",
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
