"use client";

import { useEffect, useRef, useState } from "react";
import { story } from "@/content/experience";
import { Txt, hasText } from "@/lib/todo";
import s from "./StoryCurve.module.css";

/**
 * The story plotted as a training-loss curve. On wide screens the section
 * pins and the track moves sideways as you scroll down; the curve draws
 * itself and each checkpoint lights up when reached.
 * Without JavaScript it is a normal horizontally scrollable strip.
 */

const GAP = 380; // px between checkpoints
const PAD = 160;
const H = 560;
const TOP = 70;
const BOTTOM = 470;

const n = story.length;
const W = PAD * 2 + GAP * (n - 1);
const pts = story.map((_, i) => {
  const x = PAD + i * GAP;
  const t = 1 - Math.exp(-i * 0.42);
  const y = TOP + (BOTTOM - TOP) * (t / (1 - Math.exp(-(n - 1) * 0.42)));
  return [x, y] as const;
});

// smooth path through the checkpoints, with small "noise" bumps between them
function buildPath() {
  const all: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    all.push([pts[i][0], pts[i][1]]);
    if (i < n - 1) {
      const mx = (pts[i][0] + pts[i + 1][0]) / 2;
      const my = (pts[i][1] + pts[i + 1][1]) / 2 + (i % 2 ? 26 : -30);
      all.push([mx, my]);
    }
  }
  const start: [number, number] = [0, TOP - 30];
  const end: [number, number] = [W, BOTTOM + 8];
  const p = [start, ...all, end];
  let d = `M${p[0][0]} ${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

const D = buildPath();

export default function StoryCurve() {
  const host = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [reached, setReached] = useState(0);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1000px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!wide.matches || reduce.matches) return;
    // switch to the pinned layout on the next frame
    const first = requestAnimationFrame(() => setEnhanced(true));

    const len = path.current?.getTotalLength() ?? 1;
    if (path.current) path.current.style.strokeDasharray = `${len}`;

    let raf = 0;
    const update = () => {
      raf = 0;
      const el = host.current;
      const tr = track.current;
      if (!el || !tr) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)));
      const overflow = Math.max(0, tr.scrollWidth - tr.clientWidth);
      tr.style.setProperty("--shift", `${-p * overflow}px`);
      if (path.current) path.current.style.strokeDashoffset = `${len * (1 - Math.min(1, p * 1.04 + 0.04))}`;
      setReached(Math.min(n, Math.floor(p * (n - 1) + 1.15)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const second = requestAnimationFrame(() => requestAnimationFrame(update));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, []);

  return (
    <div
      ref={host}
      className={s.host}
      data-enhanced={enhanced || undefined}
      style={enhanced ? { height: `${Math.round(n * 62)}vh` } : undefined}
    >
      <div className={s.sticky}>
        <div className={s.hud} aria-hidden="true">
          <span className="mono">
            epoch {String(enhanced ? reached : n).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </span>
          <span className={s.meter}>
            <span style={{ width: `${((enhanced ? reached : n) / n) * 100}%` }} />
          </span>
          <span className="mono">loss ↓</span>
        </div>

        <div ref={track} className={s.track}>
          <div className={s.canvas} style={{ width: W }}>
            <svg className={s.svg} width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
              <text x="8" y="22" className={s.axisLabel}>
                what I did not know yet
              </text>
              <path d={`M0 ${BOTTOM + 40} H${W}`} className={s.axis} />
              <path d={D} className={s.ghost} />
              <path ref={path} d={D} className={s.curve} />
            </svg>

            <ol role="list" className={s.points}>
              {story.map((step, i) => {
                const [x, y] = pts[i];
                const above = y > H / 2;
                const on = !enhanced || i < reached;
                return (
                  <li
                    key={step.title}
                    className={s.point}
                    data-on={on || undefined}
                    data-above={above || undefined}
                    data-last={i === n - 1 || undefined}
                    style={{ left: x, top: y }}
                  >
                    <span className={s.dot} aria-hidden="true" />
                    <span className={s.stem} aria-hidden="true" />
                    <div className={s.card}>
                      <p className={`mono ${s.when}`}>
                        <span>{String(i + 1).padStart(2, "0")}</span>
                        {hasText(step.period) ? <Txt value={step.period} /> : null}
                      </p>
                      <h3 className={s.title}>
                        {step.href ? <a href={step.href}>{step.title}</a> : step.title}
                      </h3>
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
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
        <p className={`mono ${s.hint}`} aria-hidden="true">
          time →
        </p>
      </div>
    </div>
  );
}
