"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Site-wide motion: Lenis smooth scrolling driven by GSAP's ticker, a
 * custom cursor that grows over [data-cursor] targets, and magnetic pull on
 * [data-magnetic] elements. Pure enhancement: everything works without it,
 * and it switches itself off for reduced motion and touch screens.
 */
export default function Motion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const cleanups: (() => void)[] = [];

    // ---- smooth scroll ----
    if (!reduce) {
      const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, anchors: { offset: -72 } });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
      cleanups.push(() => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      });
    }

    // ---- cursor ----
    if (fine && !reduce) {
      const dot = document.createElement("div");
      dot.className = "cursor";
      dot.setAttribute("aria-hidden", "true");
      dot.innerHTML = '<span class="cursor-label"></span>';
      document.body.appendChild(dot);
      document.documentElement.classList.add("has-cursor");
      const label = dot.querySelector(".cursor-label") as HTMLSpanElement;
      const xTo = gsap.quickTo(dot, "x", { duration: 0.35, ease: "power3" });
      const yTo = gsap.quickTo(dot, "y", { duration: 0.35, ease: "power3" });

      const move = (e: PointerEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
        const t = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor], a, button");
        if (t?.dataset.cursor) {
          dot.dataset.state = "label";
          label.textContent = t.dataset.cursor;
        } else if (t) {
          dot.dataset.state = "link";
          label.textContent = "";
        } else {
          dot.dataset.state = "";
          label.textContent = "";
        }
      };
      const leave = () => (dot.dataset.state = "hidden");
      const down = () => dot.classList.add("is-down");
      const up = () => dot.classList.remove("is-down");
      window.addEventListener("pointermove", move);
      document.addEventListener("pointerleave", leave);
      window.addEventListener("pointerdown", down);
      window.addEventListener("pointerup", up);
      cleanups.push(() => {
        window.removeEventListener("pointermove", move);
        document.removeEventListener("pointerleave", leave);
        window.removeEventListener("pointerdown", down);
        window.removeEventListener("pointerup", up);
        dot.remove();
        document.documentElement.classList.remove("has-cursor");
      });
    }

    // ---- magnetic elements ----
    if (fine && !reduce) {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
      els.forEach((el) => {
        const strength = Number(el.dataset.magnetic) || 0.35;
        const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * strength);
          yTo((e.clientY - (r.top + r.height / 2)) * strength);
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        });
      });
    }

    return () => cleanups.forEach((c) => c());
  }, []);

  return null;
}
