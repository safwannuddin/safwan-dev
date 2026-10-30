"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { certificates, recognition, byNewest, certYear, type Certificate } from "@/content/certificates";
import s from "./Certificates.module.css";

/**
 * Recognition as trophy tiles, then certificates as a gallery of framed
 * prints that scrolls sideways (scroll-snap, swipe or the arrow buttons).
 * Any print opens full size in a native <dialog>.
 * To add a certificate, append to src/content/certificates.ts.
 */

function Medal() {
  return (
    <svg className={s.medal} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M22 4 L32 22 L42 4" />
      <path d="M16 4 L26 24 M48 4 L38 24" />
      <circle cx="32" cy="40" r="17" />
      <circle cx="32" cy="40" r="11" />
      <path d="M32 33 l2.2 4.5 4.9.7 -3.5 3.4 .8 4.9 -4.4 -2.3 -4.4 2.3 .8 -4.9 -3.5 -3.4 4.9 -.7 z" />
    </svg>
  );
}

export default function Certificates() {
  const sorted = [...certificates].sort(byNewest);
  const [open, setOpen] = useState<Certificate | null>(null);
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const rail = useRef<HTMLOListElement>(null);

  const show = (c: Certificate) => {
    setOpen(c);
    dialog.current?.showModal();
  };

  function step(dir: 1 | -1) {
    const el = rail.current;
    if (!el) return;
    const item = el.querySelector("li");
    const w = item ? item.getBoundingClientRect().width + 24 : 360;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  }

  function onScroll() {
    const el = rail.current;
    if (!el) return;
    const item = el.querySelector("li");
    const w = item ? item.getBoundingClientRect().width + 24 : 360;
    setIndex(Math.min(sorted.length - 1, Math.round(el.scrollLeft / w)));
  }

  return (
    <div className={s.wrap}>
      <ul role="list" className={s.trophies} aria-label="Recognition">
        {recognition.map((r) => (
          <li key={r.title} className={s.trophy}>
            <div className={s.trophyTop}>
              <Medal />
              <span className={`mono ${s.kind}`}>
                {r.kind}
                {certYear(r.date) ? ` · ${certYear(r.date)}` : ""}
              </span>
            </div>
            <p className={s.big}>{r.big}</p>
            <p className={s.trophyTitle}>{r.title}</p>
            <p className={s.issuer}>{r.issuer}</p>
          </li>
        ))}
      </ul>

      <div className={s.galleryHead}>
        <p className={`mono ${s.count}`}>
          <span className={s.countNow}>{String(index + 1).padStart(2, "0")}</span> /{" "}
          {String(sorted.length).padStart(2, "0")} certificates
        </p>
        <div className={s.arrows}>
          <button type="button" className={s.arrow} onClick={() => step(-1)} aria-label="Previous certificates">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M10 3L5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
          <button type="button" className={s.arrow} onClick={() => step(1)} aria-label="Next certificates">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </div>
      </div>

      <ol role="list" ref={rail} className={s.rail} onScroll={onScroll} aria-label="Certificates">
        {sorted.map((c) => (
          <li key={c.title} className={s.print}>
            <button type="button" className={s.printBtn} onClick={() => show(c)} aria-haspopup="dialog">
              <span className={s.mat}>
                {c.image ? (
                  <Image
                    className={s.img}
                    src={c.image.src}
                    alt=""
                    width={c.image.width}
                    height={c.image.height}
                    sizes="(min-width: 760px) 380px, 80vw"
                  />
                ) : null}
                <span className={s.view} aria-hidden="true">
                  View
                </span>
              </span>
              <span className={s.caption}>
                <span className={`mono ${s.kind}`}>
                  {c.kind} · {certYear(c.date)}
                </span>
                <span className={s.title}>{c.title}</span>
                <span className={s.issuer}>
                  {c.issuer}
                  {c.detail ? ` · ${c.detail}` : ""}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>

      <dialog
        ref={dialog}
        className={s.dialog}
        aria-label={open ? `${open.title}, certificate` : "Certificate"}
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        {open ? (
          <div className={s.dialogInner}>
            <header className={s.dialogHead}>
              <div>
                <p className={`mono ${s.dialogKind}`}>
                  {open.kind} · {certYear(open.date)}
                </p>
                <h3 className={s.dialogTitle}>{open.title}</h3>
                <p className={s.dialogIssuer}>{open.issuer}</p>
              </div>
              <form method="dialog">
                <button className={s.close} aria-label="Close">
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
              </form>
            </header>
            {open.image ? (
              <Image
                className={s.dialogImg}
                src={open.image.src}
                alt={`${open.title} certificate issued by ${open.issuer}`}
                width={open.image.width}
                height={open.image.height}
                sizes="(min-width: 960px) 900px, 100vw"
              />
            ) : null}
            {open.verify ? (
              <a className="link" href={open.verify}>
                Verify this certificate
              </a>
            ) : null}
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
