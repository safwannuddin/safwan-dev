"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "./Marquee.module.css";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = ["AI engineer", "Researcher", "Founder", "MSc Applied AI", "Agent security", "London"];

function Star() {
  return (
    <svg className={s.star} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 0c1.6 11.2 8.8 18.4 20 20-11.2 1.6-18.4 8.8-20 20-1.6-11.2-8.8-18.4-20-20C11.2 18.4 18.4 11.2 20 0z" />
    </svg>
  );
}

/** Two huge rows of text that drift forever, speed up and skew with scroll. */
export default function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rows = Array.from(el.querySelectorAll<HTMLElement>("[data-row]"));
    const tweens = rows.map((row, i) =>
      gsap.to(row, { xPercent: i % 2 ? 0 : -50, startAt: { xPercent: i % 2 ? -50 : 0 }, duration: 28, ease: "none", repeat: -1 }),
    );
    const skewTo = gsap.quickTo(el, "skewY", { duration: 0.5, ease: "power3" });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const v = self.getVelocity();
        const boost = 1 + Math.min(5, Math.abs(v) / 400);
        tweens.forEach((t) => t.timeScale(boost));
        skewTo(gsap.utils.clamp(-6, 6, v / -300));
      },
    });
    const settle = gsap.ticker.add(() => {
      tweens.forEach((t) => {
        const ts = t.timeScale();
        t.timeScale(ts + (1 - ts) * 0.05);
      });
    });
    return () => {
      st.kill();
      tweens.forEach((t) => t.kill());
      gsap.ticker.remove(settle as unknown as gsap.TickerCallback);
    };
  }, []);

  const line = (
    <>
      {ITEMS.map((t) => (
        <span key={t} className={s.item}>
          {t}
          <Star />
        </span>
      ))}
    </>
  );

  return (
    <div ref={root} className={s.marquee} aria-label={ITEMS.join(", ")} role="img">
      <div className={s.row} data-row aria-hidden="true">
        {line}
        {line}
      </div>
      <div className={`${s.row} ${s.outline}`} data-row aria-hidden="true">
        {line}
        {line}
      </div>
    </div>
  );
}
