"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { story } from "@/content/experience";
import { Txt, hasText } from "@/lib/todo";
import s from "./StackCards.module.css";

gsap.registerPlugin(ScrollTrigger);

const TONES = ["slate", "blue", "coral", "green", "violet", "amber", "light"] as const;

/**
 * Experience as a deck of coloured cards. Each card sticks near the top
 * and the next one slides over it; covered cards shrink back slightly.
 * Without JS it is a plain stack of cards that still sticks (CSS).
 */
export default function StackCards() {
  const root = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-stack]");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card.firstElementChild, {
          scale: 0.9 + i * 0.012,
          filter: "brightness(0.55)",
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top 20%",
            scrub: true,
          },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <ol ref={root} role="list" className={s.deck}>
      {story.map((step, i) => (
        <li key={step.title} className={s.slot} data-stack style={{ "--i": i } as React.CSSProperties}>
          <article className={s.card} data-tone={TONES[i % TONES.length]}>
            <div className={s.top}>
              <p className={`mono ${s.kind}`}>{step.kind}</p>
              {hasText(step.period) ? (
                <p className={`mono ${s.period}`}>
                  <Txt value={step.period} />
                </p>
              ) : null}
            </div>
            <div className={s.body}>
              <h3 className={s.title}>{step.href ? <a href={step.href}>{step.title}</a> : step.title}</h3>
              <p className={s.org}>
                {step.org}
                {step.place ? ` · ${step.place}` : ""}
              </p>
              {hasText(step.text) ? (
                <p className={s.text}>
                  <Txt value={step.text} />
                </p>
              ) : null}
            </div>
            <span className={s.big} aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
          </article>
        </li>
      ))}
    </ol>
  );
}
