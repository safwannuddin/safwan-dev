import { notebook } from "@/content/notebook";
import Label from "./Label";
import s from "./NotebookList.module.css";

function Glyph({ slug }: { slug: string }) {
  if (slug === "gradient-descent")
    return (
      <svg viewBox="0 0 120 80" aria-hidden="true">
        {[34, 26, 18, 10].map((r) => (
          <ellipse key={r} cx="78" cy="44" rx={r * 1.3} ry={r} className={s.gl} />
        ))}
        <path d="M12 12 C 30 30, 52 30, 62 40 S 74 44, 78 44" className={s.gp} />
        <circle cx="78" cy="44" r="4" className={s.gd} />
      </svg>
    );
  if (slug === "train-vs-test-error")
    return (
      <svg viewBox="0 0 120 80" aria-hidden="true">
        <path d="M10 70 H112 M10 70 V8" className={s.gl} />
        <path d="M14 18 C 40 50, 70 62, 110 66" className={s.gp} />
        <path d="M14 22 C 40 52, 60 50, 72 46 S 100 30, 110 22" className={s.gq} />
      </svg>
    );
  return (
    <svg viewBox="0 0 120 80" aria-hidden="true">
      {[14, 30, 46, 62].map((y, i) => (
        <rect key={y} x={14 + i * 6} y={y - 8} width={64 - i * 6} height="10" rx="3" className={i === 3 ? s.gfill : s.gl} />
      ))}
      <path d="M92 14 V62 M86 56 l6 6 6-6" className={s.gp} />
    </svg>
  );
}

export default function NotebookList({ limit }: { limit?: number }) {
  const items = limit ? notebook.slice(0, limit) : notebook;
  return (
    <ol role="list" className={s.list}>
      {items.map((n, i) => {
        const live = n.status === "PUBLISHED";
        const body = (
          <>
            <span className={s.glyph}>
              <Glyph slug={n.slug} />
            </span>
            <span className={s.top}>
              <span className={`mono ${s.no}`}>{String(i + 1).padStart(2, "0")}</span>
              <Label value={live ? "INTERACTIVE" : n.status} />
            </span>
            <span className={s.title}>{n.title}</span>
            <span className={s.q}>{n.question}</span>
            {live ? <span className={s.open}>Open the explainer →</span> : null}
          </>
        );
        return (
          <li key={n.slug}>
            {live ? (
              <a href={`/notebook/${n.slug}/`} className={s.card} data-live>
                {body}
              </a>
            ) : (
              <div className={s.card}>{body}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
