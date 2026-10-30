"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/content/projects";
import Label from "../Label";
import ProjectCover from "../ProjectCover";
import s from "./WorkJourney.module.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Selected work as a journey: on wide screens the section pins and the
 * projects slide sideways along a path that draws itself as you scroll.
 * Narrow screens (and no JS) get a normal vertical list.
 */
export default function WorkJourney() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = root.current;
    const tr = track.current;
    if (!el || !tr) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1000px)", () => {
      el.dataset.ride = "";
      const distance = () => tr.scrollWidth - window.innerWidth;
      const len = path.current?.getTotalLength() ?? 0;
      if (path.current) gsap.set(path.current, { strokeDasharray: len, strokeDashoffset: len });

      const scrollTween = gsap.to(tr, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true,
        },
      });
      if (path.current) {
        gsap.to(path.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: () => `+=${distance()}`, scrub: 1 },
        });
      }

      // each card tilts up into place as it enters the viewport
      gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card) => {
        gsap.from(card, {
          rotate: 5,
          y: 80,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: "left right",
            end: "left 55%",
            scrub: true,
          },
        });
      });
      return () => {
        delete el.dataset.ride;
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="work" data-section className={s.section} aria-labelledby="work-title">
      <div ref={track} className={s.track}>
        <svg className={s.path} viewBox="0 0 3600 600" preserveAspectRatio="none" aria-hidden="true">
          <path
            ref={path}
            d="M0 420 C 300 420, 380 160, 700 180 S 1100 520, 1420 470 S 1820 120, 2140 150 S 2560 500, 2880 460 S 3300 220, 3600 240"
          />
        </svg>

        <header className={s.intro}>
          <p className={`mono ${s.label}`}>
            <span className={s.index}>01</span> Work
          </p>
          <h2 id="work-title" className={s.title}>
            Things I&apos;ve <em>built</em>
            <br />
            and shipped.
          </h2>
          <p className={s.lead}>A founder project, two research systems and what&apos;s next. Scroll to ride along.</p>
          <span className={s.arrow} aria-hidden="true">
            <svg viewBox="0 0 48 16" width="48" height="16">
              <path d="M0 8h44M37 1l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </span>
        </header>

        <ol role="list" className={s.cards}>
          {projects.map((p, i) => (
            <li key={p.slug} className={s.cardWrap} style={{ "--i": i } as React.CSSProperties}>
              <a href={`/work/${p.slug}/`} className={`${s.card} coverHost`} data-cursor="View" data-card>
                <span className={s.num} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={s.cover} style={{ viewTransitionName: `cover-${p.slug}` }}>
                  <ProjectCover slug={p.slug} title={p.title} />
                </span>
                <span className={s.meta}>
                  <span className={s.head}>
                    <span className={s.name} style={{ viewTransitionName: `work-${p.slug}` }}>
                      {p.title}
                    </span>
                    <span className={`mono ${s.year}`}>{p.year}</span>
                  </span>
                  <span className={s.idea}>{p.idea}</span>
                  <Label value={p.label} />
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
