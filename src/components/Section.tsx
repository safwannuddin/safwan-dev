import type { ReactNode } from "react";
import s from "./Section.module.css";

type Props = {
  id: string;
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  tone?: "plain" | "band" | "ink";
};

/** Section shell: mono index, a large display heading, intro set beside it. */
export default function Section({ id, index, label, title, intro, children, tone = "plain" }: Props) {
  const headingId = `${id}-title`;
  return (
    <section id={id} data-section data-tone={tone} className={s.section} aria-labelledby={headingId}>
      <div className={s.inner}>
        <header className={s.head}>
          <p className={`mono ${s.label}`} aria-hidden="true">
            <span className={s.index}>{index}</span>
            <span className={s.bar} />
            <span>{label}</span>
          </p>
          <h2 id={headingId} className={s.title}>
            {title}
          </h2>
          {intro ? <p className={s.intro}>{intro}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}
