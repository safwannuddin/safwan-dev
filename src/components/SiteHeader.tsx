import { nav, person } from "@/content/site";
import Mark from "./Mark";
import s from "./SiteHeader.module.css";

export default function SiteHeader() {
  return (
    <header className={s.header}>
      <div className={s.inner}>
        <a href="/" className={s.brand}>
          <Mark size={28} />
          <span className={s.name}>{person.name}</span>
        </a>

        <nav aria-label="Sections" className={s.desktop}>
          <ul role="list" className={s.list}>
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`/#${n.id}`} data-nav={n.id} className={s.link}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <details className={s.mobile}>
          <summary className={s.toggle}>
            <span>Menu</span>
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M2 5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </summary>
          <nav aria-label="Sections" className={s.sheet}>
            <ul role="list">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`/#${n.id}`} data-nav={n.id} className={s.sheetLink}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
