import { links, now, person } from "@/content/site";
import s from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={s.hero} aria-labelledby="hero-title">
      <div className={s.inner}>
        <div className={s.main}>
          <p className={`mono ${s.status}`}>
            <span className={s.dot} aria-hidden="true" />
            {person.status}
          </p>

          {/* Signature moment: each line rises into place once, in CSS only.
              The text is in the HTML from the first byte. */}
          <h1 id="hero-title" className={s.name}>
            <span className={s.line}>
              <span>Safwan Uddin</span>
            </span>
            <span className={s.line}>
              <span>Mohammed</span>
            </span>
          </h1>

          <p className={s.identity}>{person.identity}</p>

          <ul role="list" className={s.actions}>
            <li>
              <a className={s.primary} href="#work">
                Selected work
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

        <aside className={s.now} aria-labelledby="now-title">
          <h2 id="now-title" className={`mono ${s.nowTitle}`}>
            Now
          </h2>
          <dl className={s.nowList}>
            {now.map((n) => (
              <div key={n.label} className={s.nowRow}>
                <dt className="mono">{n.label}</dt>
                <dd>{n.href ? <a href={n.href}>{n.value}</a> : n.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
