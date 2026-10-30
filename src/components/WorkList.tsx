import { projects } from "@/content/projects";
import Label from "./Label";
import s from "./WorkList.module.css";

export default function WorkList() {
  return (
    <ol role="list" className={s.list}>
      {projects.map((p) => (
        <li key={p.slug}>
          {/* Plain <a>: a full navigation lets the browser run the
              cross-document view transition on the title. */}
          <a href={`/work/${p.slug}/`} className={s.row}>
            <span className={s.meta}>
              <span className={`mono ${s.year}`}>{p.year}</span>
              <span className={s.label}>
                <Label value={p.label} />
              </span>
            </span>
            <span className={s.text}>
              <span className={s.title} style={{ viewTransitionName: `work-${p.slug}` }}>
                {p.title}
              </span>
              <span className={s.idea}>{p.idea}</span>
            </span>
            <svg className={s.arrow} width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M4 9h10M10 5l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
        </li>
      ))}
    </ol>
  );
}
