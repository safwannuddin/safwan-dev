import { arxivAbs, arxivPdf, formatMonth, type Paper } from "@/content/papers";
import s from "./PaperFrame.module.css";

/**
 * A published paper, shown as a miniature first page next to its facts.
 * The sheet is drawn in HTML/CSS (not a screenshot), so it stays crisp and
 * follows the theme.
 */

const LINES = [96, 100, 98, 100, 94, 100, 97, 62];
const BODY = [100, 98, 100, 95, 100, 88];

function stampDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function PaperFrame({ paper, showProjectLink = true }: { paper: Paper; showProjectLink?: boolean }) {
  const headingId = `paper-${paper.id.replace(".", "-")}`;
  return (
    <article className={s.frame} aria-labelledby={headingId}>
      <a className={s.sheetLink} href={arxivAbs(paper.id)} tabIndex={-1} aria-hidden="true">
        <div className={s.sheet}>
          <span className={s.stamp}>
            arXiv:{paper.id}v1 [{paper.category.split(" · ")[0]}] {stampDate(paper.date)}
          </span>
          <p className={s.sTitle}>{paper.title}</p>
          <p className={s.sAuthors}>{paper.authors.join(", ")}</p>
          <p className={s.sHead}>Abstract</p>
          <div className={s.lines}>
            {LINES.map((w, i) => (
              <i key={i} style={{ width: `${w}%` }} />
            ))}
          </div>
          <p className={s.sHead}>1&nbsp;&nbsp;Introduction</p>
          <div className={s.lines}>
            {BODY.map((w, i) => (
              <i key={i} style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      </a>

      <div className={s.meta}>
        <p className={`mono ${s.kicker}`}>
          <span>arXiv {paper.id}</span>
          <span aria-hidden="true">·</span>
          <span>{formatMonth(paper.date)}</span>
          <span aria-hidden="true">·</span>
          <span>{paper.category}</span>
        </p>
        <h3 id={headingId} className={s.title}>
          <a href={arxivAbs(paper.id)}>{paper.title}</a>
        </h3>
        <p className={s.authors}>
          {paper.authors.map((a, i) => (
            <span key={a}>
              {i === 0 ? <strong>{a}</strong> : a}
              {i < paper.authors.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
        <p className={s.finding}>{paper.finding}</p>

        <dl className={s.figures}>
          {paper.figures.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>

        <ul role="list" className={s.links}>
          <li>
            <a className="link" href={arxivAbs(paper.id)}>
              Read on arXiv
            </a>
          </li>
          <li>
            <a className="link" href={arxivPdf(paper.id)}>
              PDF
            </a>
          </li>
          {showProjectLink ? (
            <li>
              <a className="link" href={`/work/${paper.slug}/`}>
                How it works
              </a>
            </li>
          ) : null}
        </ul>
      </div>
    </article>
  );
}
