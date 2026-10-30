"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { grad, loss, toDomain, toView, VIEW } from "@/lib/loss";
import s from "./GradientFigure.module.css";

type P = [number, number];
type Status = "idle" | "running" | "global" | "local" | "diverged";

const STEP_MS = 42;
const START: P = [-0.6, 1.7];

function descend(start: P, LR: number, BETA: number, max = 400): P[] {
  const out: P[] = [start];
  let [x, y] = start;
  let vx = 0;
  let vy = 0;
  for (let k = 0; k < max; k++) {
    const [gx, gy] = grad(x, y);
    vx = BETA * vx - LR * gx;
    vy = BETA * vy - LR * gy;
    x += vx;
    y += vy;
    out.push([x, y]);
    if (Math.hypot(gx, gy) < 0.003 && Math.hypot(vx, vy) < 0.002) break;
    if (Math.abs(x) > 8 || Math.abs(y) > 8) break; // diverged
  }
  return out;
}

const basin = (p: P): Status =>
  Math.abs(p[0]) > 6 || Math.abs(p[1]) > 6 ? "diverged" : p[0] > -0.2 ? "global" : "local";

/** Interactive layer: click the plot to drop a point and watch it descend. */
type Props = { lab?: boolean };

export default function GradientRunner({ lab = false }: Props) {
  const [lr, setLr] = useState(0.12);
  const [beta, setBeta] = useState(0.8);
  const startRef = useRef<P>(START);
  const [path, setPath] = useState<P[]>([]);
  const [shown, setShown] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const svg = useRef<SVGSVGElement>(null);
  const timer = useRef<number | null>(null);

  const run = useCallback((start: P, LR = lr, BETA = beta) => {
    if (timer.current) window.clearInterval(timer.current);
    startRef.current = start;
    const full = descend(start, LR, BETA);
    setPath(full);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(full.length);
      setStatus(basin(full[full.length - 1]));
      return;
    }
    setShown(1);
    setStatus("running");
    let i = 1;
    timer.current = window.setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= full.length) {
        if (timer.current) window.clearInterval(timer.current);
        setStatus(basin(full[full.length - 1]));
      }
    }, STEP_MS);
  }, [lr, beta]);

  useEffect(() => {
    const t = window.setTimeout(() => run(START), 650);
    return () => {
      window.clearTimeout(t);
      if (timer.current) window.clearInterval(timer.current);
    };
    // run once on mount; later runs are triggered by the reader
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onPointer(e: React.PointerEvent<SVGSVGElement>) {
    const box = svg.current!.getBoundingClientRect();
    const vx = ((e.clientX - box.left) / box.width) * VIEW.w;
    const vy = ((e.clientY - box.top) / box.height) * VIEW.h;
    run(toDomain(vx, vy));
  }

  function randomStart() {
    run([-2.8 + Math.random() * 5.6, -1.8 + Math.random() * 3.6]);
  }

  const visible = path.slice(0, shown);
  const head = visible[visible.length - 1];
  const d = visible.map((p, i) => `${i ? "L" : "M"}${toView(...p).join(" ")}`).join("");
  const [hx, hy] = head ? toView(...head) : [0, 0];

  const message =
    status === "global"
      ? "Reached the global minimum."
      : status === "local"
        ? "Stuck in a local minimum. Try another start."
        : status === "diverged"
          ? "Diverged: the learning rate is too high."
        : status === "running"
          ? "Descending…"
          : "Click the plot to drop a point.";

  return (
    <>
      <svg
        ref={svg}
        className={s.runner}
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        preserveAspectRatio="none"
        onPointerDown={onPointer}
        role="img"
        aria-label="Loss surface. Click to start gradient descent from that point."
      >
        {d ? <path d={d} className={s.trail} vectorEffect="non-scaling-stroke" /> : null}
        {visible.map((p, i) =>
          i % 4 === 0 ? <circle key={i} cx={toView(...p)[0]} cy={toView(...p)[1]} r="2" className={s.tick} /> : null,
        )}
        {head ? (
          <g transform={`translate(${hx} ${hy})`}>
            <circle r="13" className={s.halo} data-status={status} />
            <circle r="5.5" className={s.head} />
          </g>
        ) : null}
      </svg>
      <div className={s.hud}>
        <span className="mono">
          step {String(Math.max(0, shown - 1)).padStart(3, "0")}
          <span className={s.sep}>·</span>
          loss {head ? loss(...head).toFixed(3) : "—"}
          <span className={s.sep}>·</span>
          lr {lr.toFixed(2)}
        </span>
        <span className={s.msg} aria-live="polite" data-status={status}>
          {message}
        </span>
        <button type="button" className={s.again} onClick={randomStart}>
          Random start
        </button>
      </div>
      {lab ? (
        <div className={s.controls}>
          <label className={s.control}>
            <span className="mono">Learning rate</span>
            <input
              type="range"
              min="0.02"
              max="0.6"
              step="0.01"
              value={lr}
              onChange={(e) => {
                const v = Number(e.target.value);
                setLr(v);
                run(startRef.current, v, beta);
              }}
            />
            <output className="mono">{lr.toFixed(2)}</output>
          </label>
          <label className={s.control}>
            <span className="mono">Momentum</span>
            <input
              type="range"
              min="0"
              max="0.95"
              step="0.05"
              value={beta}
              onChange={(e) => {
                const v = Number(e.target.value);
                setBeta(v);
                run(startRef.current, lr, v);
              }}
            />
            <output className="mono">{beta.toFixed(2)}</output>
          </label>
        </div>
      ) : null}
    </>
  );
}
