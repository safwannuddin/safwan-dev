import { story } from "@/content/experience";
import { Txt, hasText } from "@/lib/todo";
import s from "./Timeline.module.css";

/**
 * The story as a timeline. As you scroll, an ink-blue line fills down the
 * rail and each step's marker lights up (CSS scroll-driven animation).
 * Browsers without support show the finished, static timeline.
 */
export default function Timeline() {
  return (
    <div className={s.timeline}>
      <span className={s.track} aria-hidden="true">
        <span className={s.fill} />
      </span>
      <ol role="list" className={s.steps}>
      {story.map((step) => (
        <li key={step.title} className={s.step}>
          <span className={s.marker} aria-hidden="true" />
          <div className={s.when}>
            {hasText(step.period) ? (
              <p className="mono">
                <Txt value={step.period} />
              </p>
            ) : null}
            <p className={`mono ${s.kind}`}>{step.kind}</p>
          </div>
          <div className={s.what}>
            <h3 className={s.title}>
              {step.href ? <a href={step.href}>{step.title}</a> : step.title}
            </h3>
            <p className={s.org}>
              {step.org}
              {step.place ? <span className={s.place}> · {step.place}</span> : null}
            </p>
            {hasText(step.text) ? (
              <p className={s.text}>
                <Txt value={step.text} />
              </p>
            ) : null}
          </div>
        </li>
      ))}
      </ol>
    </div>
  );
}
