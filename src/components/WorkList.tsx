import { projects } from "@/content/projects";
import { visible } from "@/lib/todo";
import Label from "./Label";
import ProjectCover from "./ProjectCover";
import s from "./WorkList.module.css";

/**
 * Selected work as an editorial grid of illustrated covers:
 * two large pieces, then three smaller ones.
 */
export default function WorkList() {
  return (
    <ol role="list" className={s.grid}>
      {projects.map((p, i) => (
        <li key={p.slug} className={s.item} data-size={i < 2 ? "large" : "small"}>
          {/* Plain <a>: a full navigation lets the browser run the
              cross-document view transition on the cover and title. */}
          <a href={`/work/${p.slug}/`} className={`${s.card} coverHost`}>
            <span className={s.coverWrap} style={{ viewTransitionName: `cover-${p.slug}` }}>
              <ProjectCover slug={p.slug} title={p.title} />
            </span>
            <span className={s.meta}>
              <span className={s.head}>
                <span className={s.title} style={{ viewTransitionName: `work-${p.slug}` }}>
                  {p.title}
                  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                    <path d="M5 13L13 5M6 5h7v7" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </span>
                <span className={`mono ${s.year}`}>{p.year}</span>
              </span>
              <span className={s.idea}>{p.idea}</span>
              <span className={s.tags}>
                <Label value={p.label} />
                <span className={`mono ${s.stack}`}>{visible(p.stack).slice(0, 3).join(" / ")}</span>
              </span>
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
}
