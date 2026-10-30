"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { certificates, recognition, byNewest, certYear, type Certificate } from "@/content/certificates";
import s from "./Certificates.module.css";

/**
 * Recognition first (what I achieved), then certificates as an index.
 * Desktop: hovering or focusing a row shows the certificate in a frame
 * beside the list. Any row opens it full size in a native <dialog>.
 * The first certificate is server-rendered in the frame, so nothing waits
 * for JavaScript. Mobile thumbnails come from /public/certificates/thumbs
 * (192x144, same file name).
 */
export default function Certificates() {
  const sorted = [...certificates].sort(byNewest);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<Certificate | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const current = sorted[active];

  const show = (c: Certificate) => {
    setOpen(c);
    dialog.current?.showModal();
  };

  return (
    <div className={s.wrap}>
      <ul role="list" className={s.recognition} aria-label="Recognition">
        {recognition.map((r) => (
          <li key={r.title} className={s.award}>
            <p className={`mono ${s.awardKind}`}>
              <span>{r.kind}</span>
              {certYear(r.date) ? <span>{certYear(r.date)}</span> : null}
            </p>
            <p className={s.awardTitle}>{r.title}</p>
            <p className={s.awardIssuer}>{r.issuer}</p>
          </li>
        ))}
      </ul>

      <div className={s.index}>
        <ol role="list" className={s.list} aria-label="Certificates">
          {sorted.map((c, i) => (
            <li key={c.title}>
              <button
                type="button"
                className={s.row}
                data-active={i === active || undefined}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => show(c)}
                aria-haspopup="dialog"
              >
                <span className={`mono ${s.year}`}>{certYear(c.date)}</span>
                <span className={s.text}>
                  <span className={s.title}>{c.title}</span>
                  <span className={s.issuer}>
                    {c.issuer}
                    {c.detail ? ` · ${c.detail}` : ""}
                  </span>
                </span>
                <span className={`mono ${s.kind}`}>{c.kind}</span>
                {c.image ? (
                  <span className={s.thumb} aria-hidden="true">
                    <Image src={c.image.src.replace("/certificates/", "/certificates/thumbs/")} alt="" width={96} height={72} sizes="96px" />
                  </span>
                ) : null}
              </button>
            </li>
          ))}
        </ol>

        <figure className={s.preview} aria-hidden="true">
          <div className={s.mat}>
            {current.image ? (
              <Image
                key={current.image.src}
                className={s.previewImg}
                src={current.image.src}
                alt=""
                width={current.image.width}
                height={current.image.height}
                sizes="420px"
              />
            ) : null}
          </div>
          <figcaption className={s.previewCap}>
            <span className="mono">{current.issuer}</span>
            <span className={s.hint}>Select to view full size</span>
          </figcaption>
        </figure>
      </div>

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
                <p className={s.issuer}>{open.issuer}</p>
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
