/**
 * Certificates and recognition.
 * To add a certificate: drop an image into /public/certificates (webp,
 * about 1400px wide), a 192x144 crop with the same name into
 * /public/certificates/thumbs, and append an entry below. Newest first is
 * automatic.
 * Titles are copied exactly from the certificate; nothing is upgraded.
 */

export type CertKind =
  | "AWARD"
  | "PROGRAMME"
  | "COURSE"
  | "CERTIFICATION"
  | "JOB SIMULATION"
  | "WORKSHOP"
  | "HACKATHON"
  | "BADGE";

export type Certificate = {
  title: string;
  issuer: string;
  date: string; // YYYY-MM, used for sorting; "" if unknown
  kind: CertKind;
  detail?: string;
  image?: { src: string; width: number; height: number };
  verify?: string;
  /** recognition only: the large figure on the award tile */
  big?: string;
};

/** Things I achieved, shown above the certificates. */
export const recognition: Certificate[] = [
  {
    big: "Top 28",
    title: "Zenix ranked in the top 28 in Asia",
    issuer: "Lovable weekly challenge, 3,000+ participants",
    date: "2025-08",
    kind: "AWARD",
    detail: "Multi-agent UI engine, built solo.",
  },
  {
    big: "S1",
    title: "Selected as a solo founder, Shipped Season 1",
    issuer: "Lovable",
    date: "2025-06",
    kind: "PROGRAMME",
  },
  {
    // Resume (Oct 2026) says Winner; LinkedIn said Runner-up. Using the resume.
    big: "1st",
    title: "Tech Hack 3, Winner",
    issuer: "Tech Hack",
    date: "",
    kind: "AWARD",
  },
];

export const certificates: Certificate[] = [
  {
    title: "AI for Impact APAC Hackathon",
    issuer: "Google Cloud × Hack2skill",
    date: "2025-06",
    kind: "HACKATHON",
    image: { src: "/certificates/google-cloud-ai-for-impact.webp", width: 809, height: 808 },
  },
  {
    title: "Basic Performance Measurement",
    issuer: "Google Cloud",
    date: "2025-06",
    kind: "BADGE",
    image: { src: "/certificates/google-cloud-basic-performance.webp", width: 811, height: 730 },
  },
  {
    title: "BOSCH × Tinkerers' Lab IIT Hyderabad Hackathon",
    issuer: "IIT Hyderabad · Unstop",
    date: "2025-05",
    kind: "HACKATHON",
    detail: "Participated as Team Blaze.",
    image: { src: "/certificates/iith-bosch-tinkerers-hackathon.webp", width: 1400, height: 957 },
  },
  {
    title: "The Complete 2024 Web Development Bootcamp",
    issuer: "Udemy · Dr. Angela Yu",
    date: "2024-12",
    kind: "COURSE",
    detail: "61.5 hours.",
    image: { src: "/certificates/udemy-web-development-bootcamp.webp", width: 1400, height: 1041 },
    verify: "https://ude.my/UC-66e53566-9ca4-4e13-a5d7-5d3ec5b565c0",
  },
  {
    title: "Postman API Fundamentals Student Expert",
    issuer: "LetsUpgrade · GDG MAD",
    date: "2024-12",
    kind: "CERTIFICATION",
    image: { src: "/certificates/postman-api-student-expert.webp", width: 1400, height: 963 },
  },
  {
    title: "GenAI 101 with Pieces",
    issuer: "LetsUpgrade · GDG MAD",
    date: "2024-12",
    kind: "WORKSHOP",
    image: { src: "/certificates/letsupgrade-genai-101.webp", width: 1400, height: 993 },
  },
  {
    title: "Data Analytics and Visualization Job Simulation",
    issuer: "Accenture · Forage",
    date: "2024-10",
    kind: "JOB SIMULATION",
    detail: "Data cleaning, modelling and presenting to a client.",
    image: { src: "/certificates/accenture-forage-data-analytics.webp", width: 1400, height: 982 },
  },
];

export const byNewest = (a: Certificate, b: Certificate) => b.date.localeCompare(a.date);

export function certYear(date: string) {
  return date ? date.slice(0, 4) : "";
}
