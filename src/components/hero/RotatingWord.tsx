"use client";

import { useEffect, useState } from "react";
import s from "./Hero.module.css";

const WORDS = ["AI agents", "research that ships", "weird experiments", "things you can poke"];

/** Swaps the word every few seconds; each letter flips in on its own. */
export default function RotatingWord() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % WORDS.length), 2600);
    return () => window.clearInterval(t);
  }, []);

  const word = WORDS[i];
  return (
    <span className={s.rotWrap}>
      <span className="visually-hidden">{WORDS.join(", ")}</span>
      <span className={s.rot} key={word} aria-hidden="true">
        {Array.from(word).map((ch, k) => (
          <span key={k} className={s.rotCh} style={{ "--k": k } as React.CSSProperties}>
            {ch === " " ? " " : ch}
          </span>
        ))}
      </span>
    </span>
  );
}
