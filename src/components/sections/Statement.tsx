"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "./Statement.module.css";

gsap.registerPlugin(ScrollTrigger);

const TEXT =
  "I like taking AI systems apart to see how they really work, then building better ones. I shipped a startup MVP solo, published two papers on keeping AI agents honest, and moved to London to go deeper.";
const HIGHLIGHT = new Set(["apart", "better", "solo,", "honest,", "London"]);

const STATS = [
  { n: 2, suffix: "", label: "papers on arXiv" },
  { n: 28, prefix: "Top ", suffix: "", label: "in Asia, Lovable challenge" },
  { n: 4, suffix: "", label: "roles before the MSc" },
  { n: 7, suffix: "", label: "certificates and badges" },
];

/** A big statement that lights up word by word as you scroll, plus counters. */
export default function Statement() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-word]",
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: { trigger: "[data-words]", start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
      el.querySelectorAll<HTMLElement>("[data-count]").forEach((n) => {
        const to = Number(n.dataset.count);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: to,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: n, start: "top 90%", once: true },
          onUpdate: () => (n.textContent = String(Math.round(obj.v))),
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={s.wrap} aria-labelledby="about-title">
      <div className={s.inner}>
        <p id="about-title" className={`mono ${s.label}`}>
          <span className={s.index}>00</span> About
        </p>
        <p className={s.text} data-words>
          {TEXT.split(" ").map((w, i) => (
            <span key={i} data-word className={HIGHLIGHT.has(w) ? s.hi : undefined}>
              {w}{" "}
            </span>
          ))}
        </p>
        <ul role="list" className={s.stats}>
          {STATS.map((st) => (
            <li key={st.label} className={s.stat}>
              <span className={s.num}>
                {st.prefix}
                <span data-count={st.n}>{st.n}</span>
                {st.suffix}
              </span>
              <span className={s.statLabel}>{st.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
