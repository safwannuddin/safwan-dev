import type { ReactNode } from "react";
import s from "./Section.module.css";

type Props = {
  id: string;
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
};

/** Shared section shell: mono rail label on the left, content on the right. */
export default function Section({ id, index, label, title, intro, children }: Props) {
  const headingId = `${id}-title`;
  return (
    <section id={id} data-section className={s.section} aria-labelledby={headingId}>
      <div className={s.inner}>
        <div className={s.rail} aria-hidden="true">
          <p className={`mono ${s.railLabel}`}>
            <span className={s.index}>{index}</span>
            <span>{label}</span>
          </p>
        </div>
        <div className={s.body}>
          <header className={s.head}>
            <h2 id={headingId} className={s.title}>
              {title}
            </h2>
            {intro ? <p className={s.intro}>{intro}</p> : null}
          </header>
          {children}
        </div>
      </div>
    </section>
  );
}
