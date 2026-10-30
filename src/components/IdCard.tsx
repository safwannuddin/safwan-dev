"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { links, person } from "@/content/site";
import s from "./IdCard.module.css";

/**
 * A physical version of my contact card, hanging on a lanyard.
 * It tilts toward the pointer with a holographic sheen, and flips to show
 * my links. Rendered complete on the server; motion is enhancement only.
 */
export default function IdCard() {
  const wrap = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch") return;
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - py) * 16}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 20}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    el.dataset.active = "";
  }

  function onLeave() {
    const el = wrap.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    delete el.dataset.active;
  }

  const contact = [
    { k: "Email", v: person.email, href: `mailto:${person.email}` },
    ...(person.email2 ? [{ k: "Email", v: person.email2, href: `mailto:${person.email2}` }] : []),
    { k: "LinkedIn", v: "safwan-uddin-mohammed", href: links.linkedin },
    { k: "GitHub", v: "safwannuddin", href: links.github },
    ...(links.x ? [{ k: "X", v: links.x.replace(/^https?:\/\/(www\.)?x\.com\//, "@"), href: links.x }] : []),
  ];

  return (
    <div className={s.stage}>
      <div className={s.lanyard} aria-hidden="true">
        <span className={s.strap} />
        <span className={s.clip} />
      </div>

      <div
        ref={wrap}
        className={s.tilt}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        data-flipped={flipped || undefined}
      >
        <div className={s.card}>
          {/* front */}
          <div className={s.face} aria-hidden={flipped}>
            <div className={s.cover}>
              <span className={s.slot} aria-hidden="true" />
              <span className={`mono ${s.org}`}>MSc Applied AI · LSBU</span>
              <span className={`mono ${s.year}`}>2026 – 28</span>
            </div>
            <div className={s.body}>
              <Image
                className={s.photo}
                src={person.photo}
                alt={`Portrait of ${person.name}`}
                width={96}
                height={96}
                sizes="96px"
                priority
              />
              <p className={s.name}>
                Safwan Uddin
                <br />
                Mohammed
              </p>
              <p className={s.role}>AI engineer in training</p>
              <dl className={s.rows}>
                <div>
                  <dt className="mono">Focus</dt>
                  <dd>AI systems · agent security</dd>
                </div>
                <div>
                  <dt className="mono">Based</dt>
                  <dd>London, UK</dd>
                </div>
                <div>
                  <dt className="mono">Open to</dt>
                  <dd>AI/ML placements</dd>
                </div>
              </dl>
              <div className={s.foot}>
                <span className={s.mark}>SU</span>
                <span className={s.code} aria-hidden="true">
                  {"▮▯▮▮▯▮▯▯▮▮▮▯▮▯▮▮▯▮"}
                </span>
                <span className={`mono ${s.id}`}>safwan.dev</span>
              </div>
            </div>
            <span className={s.sheen} aria-hidden="true" />
          </div>

          {/* back */}
          <div className={`${s.face} ${s.back}`} aria-hidden={!flipped}>
            <div className={s.backHead}>
              <span className={s.slot} aria-hidden="true" />
              <span className={`mono ${s.org}`}>Reach me</span>
            </div>
            <ul role="list" className={s.links}>
              {contact.map((c) => (
                <li key={c.v}>
                  <a href={c.href} tabIndex={flipped ? 0 : -1} rel="me noopener">
                    <span className="mono">{c.k}</span>
                    <span className={s.linkV}>{c.v}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className={`mono ${s.backNote}`}>If found, please return to London.</p>
            <span className={s.sheen} aria-hidden="true" />
          </div>
        </div>
      </div>

      <button type="button" className={s.flip} onClick={() => setFlipped((f) => !f)} aria-pressed={flipped}>
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          <path d="M2 5h8.5a2.5 2.5 0 0 1 0 5H6M4 2.5L1.5 5 4 7.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
        {flipped ? "Flip to front" : "Flip for contacts"}
      </button>
    </div>
  );
}
