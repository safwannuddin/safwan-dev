import { links, person } from "@/content/site";
import IdCard from "./IdCard";
import s from "./Hero.module.css";

const results = [
  { big: "2", unit: "papers", text: "on AI agent security, arXiv 2026", href: "#research" },
  { big: "Top 28", unit: "in Asia", text: "Zenix, Lovable weekly challenge", href: "/work/zenix/" },
  { big: "Solo", unit: "founder", text: "Lovable Shipped, Season 1", href: "#experience" },
  { big: "MSc", unit: "Applied AI", text: "London South Bank University", href: "#experience" },
];

export default function Hero() {
  return (
    <section className={s.hero} aria-labelledby="hero-title">
      <div className={s.inner}>
        <div className={s.copy}>
          <p className={`mono ${s.status}`}>
            <span className={s.dot} aria-hidden="true" />
            {person.status}
          </p>

          <h1 id="hero-title" className={s.title}>
            <span className={s.hello}>Hi, I&apos;m {person.name}.</span>
            <span className={s.display}>
              <span className={s.line}>
                <span>Building AI,</span>
              </span>
              <span className={s.line}>
                <span>
                  from <em>first</em>
                </span>
              </span>
              <span className={s.line}>
                <span>
                  <em>principles.</em>
                </span>
              </span>
            </span>
          </h1>

          <p className={s.lede}>
            I build AI systems end to end and learn how they work underneath. Two papers on AI agent security, a
            startup MVP shipped solo, and now an MSc in London.
          </p>

          <ul role="list" className={s.actions}>
            <li>
              <a className={s.primary} href="#work">
                See the work
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <path d="M7 2v10M3 8l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </a>
            </li>
            <li>
              <a className={s.secondary} href={`mailto:${person.email}`}>
                Email
              </a>
            </li>
            <li>
              <a className={s.secondary} href={links.linkedin} rel="me noopener">
                LinkedIn
              </a>
            </li>
            <li>
              <a className={s.secondary} href={links.github} rel="me noopener">
                GitHub
              </a>
            </li>
          </ul>
        </div>

        <div className={s.figure}>
          <IdCard />
        </div>
      </div>

      <div className={s.strip}>
        <p className={`mono ${s.stripTitle}`}>At a glance</p>
        <ul role="list" className={s.results}>
          {results.map((r) => (
            <li key={r.text}>
              <a href={r.href} className={s.result}>
                <span className={s.big}>
                  {r.big} <span className={s.unit}>{r.unit}</span>
                </span>
                <span className={s.rtext}>{r.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
