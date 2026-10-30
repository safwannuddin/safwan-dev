import { notebook } from "@/content/notebook";
import Label from "./Label";
import s from "./NotebookList.module.css";

export default function NotebookList({ limit }: { limit?: number }) {
  const items = limit ? notebook.slice(0, limit) : notebook;
  return (
    <ol role="list" className={s.list}>
      {items.map((n, i) => (
        <li key={n.slug} className={s.item}>
          <span className={`mono ${s.no}`}>{String(i + 1).padStart(2, "0")}</span>
          <div className={s.text}>
            <h3 className={s.title}>{n.title}</h3>
            <p className={s.q}>{n.question}</p>
          </div>
          <span className={s.status}>
            <Label value={n.status} />
          </span>
        </li>
      ))}
    </ol>
  );
}
