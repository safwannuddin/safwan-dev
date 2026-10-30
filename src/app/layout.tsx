import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import NavSpy from "@/components/NavSpy";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, person, links } from "@/content/site";
import { papers, arxivAbs } from "@/content/papers";

const sans = localFont({
  src: "../fonts/SchibstedGrotesk-Variable.woff2",
  weight: "400 900",
  display: "swap",
  variable: "--font-schibsted",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

const mono = localFont({
  src: "../fonts/IBMPlexMono-Medium.woff2",
  weight: "500",
  display: "swap",
  variable: "--font-plex-mono",
  fallback: ["ui-monospace", "Menlo", "monospace"],
  preload: false,
});

const title = person.name;
const description = person.description;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s · ${person.name}` },
  description,
  applicationName: person.name,
  authors: [{ name: person.name, url: SITE_URL }],
  creator: person.name,
  keywords: [
    person.name,
    ...person.alternateNames,
    "Safwan",
    "MSc Applied AI",
    "London South Bank University",
    "AI engineer",
    "machine learning",
    "AI agent security",
    "AegisUI",
    "APEX",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: person.name,
    title,
    description,
    locale: "en_GB",
    firstName: "Safwan Uddin",
    lastName: "Mohammed",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${person.name}, MSc Applied AI, London` }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/favicon.ico", sizes: "32x32" }],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  // Add the token from Google Search Console here to verify ownership.
  // verification: { google: "TODO(safwan)" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f7fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0e14" },
  ],
};

const sameAs = [links.linkedin, links.github, links.card, links.x].filter(Boolean);

const personLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: person.name,
      alternateName: person.alternateNames,
      givenName: "Safwan Uddin",
      familyName: "Mohammed",
      url: SITE_URL,
      image: `${SITE_URL}${person.photo}`,
      email: `mailto:${person.email}`,
      jobTitle: "MSc Applied AI student",
      description,
      address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
      affiliation: {
        "@type": "CollegeOrUniversity",
        name: "London South Bank University",
        url: "https://www.lsbu.ac.uk",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Muffakham Jah College of Engineering and Technology",
      },
      knowsAbout: ["Machine learning", "AI agent security", "Backend engineering", "Python"],
      sameAs,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: person.name,
      inLanguage: "en-GB",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    ...papers.map((p) => ({
      "@type": "ScholarlyArticle",
      "@id": arxivAbs(p.id),
      headline: p.title,
      name: p.title,
      url: arxivAbs(p.id),
      datePublished: p.date,
      author: p.authors.map((a, i) =>
        i === 0 ? { "@id": `${SITE_URL}/#person` } : { "@type": "Person", name: a },
      ),
      abstract: p.finding,
    })),
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <NavSpy />
        <JsonLd data={personLd} />
      </body>
    </html>
  );
}
