import { person } from "@/content/site";
import Balls from "./Balls";
import RotatingWord from "./RotatingWord";
import s from "./Hero.module.css";

function Chars({ text, start = 0 }: { text: string; start?: number }) {
  return (
    <>
      {Array.from(text).map((ch, i) => (
        <span key={i} className={s.ch} style={{ "--i": start + i } as React.CSSProperties}>
          {ch}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  return (
    <section className={s.hero} aria-labelledby="hero-title" data-cursor-zone>
      <div className={s.glow} aria-hidden="true" />
      <Balls />

      <div className={s.inner}>
        <p className={`mono ${s.kicker}`}>
          <span className={s.dot} aria-hidden="true" />
          {person.status}
        </p>

        <h1 id="hero-title" className={s.title}>
          <span className={s.row} aria-hidden="true">
            <Chars text="Hi, I'm" />
          </span>
          <span className={`${s.row} ${s.name}`} aria-hidden="true">
            <Chars text="Safwan" start={7} />
            <span className={`${s.ch} ${s.period}`} style={{ "--i": 13 } as React.CSSProperties}>
              .
            </span>
          </span>
          <span className="visually-hidden">Hi, I&apos;m {person.name}.</span>
        </h1>

        <p className={s.build}>
          I build <RotatingWord />
        </p>

        <div className={s.bottom}>
          <p className={s.lede}>
            AI engineer in the making, MSc Applied AI in London. Two papers on AI agent security, one startup shipped
            solo, lots of curiosity.
          </p>
          <div className={s.actions}>
            <a className={s.primary} href="#work" data-magnetic="0.4" data-cursor="Let's go">
              <span>See my work</span>
            </a>
            <a className={s.ghost} href={`mailto:${person.email}`} data-magnetic="0.3">
              Say hi
            </a>
            <a className={s.ghost} href={person.cv} data-magnetic="0.3" data-cursor="PDF">
              Download CV
            </a>
          </div>
        </div>

        <p className={`mono ${s.hint}`} aria-hidden="true">
          <span className={s.hintLine} />
          Move, then click the balls
        </p>
      </div>
    </section>
  );
}
