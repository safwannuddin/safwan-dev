import Image from "next/image";
import { links, person } from "@/content/site";
import CopyEmail from "./CopyEmail";
import s from "./Contact.module.css";

const channels = [
  { label: "LinkedIn", value: "safwan-uddin-mohammed", href: links.linkedin },
  { label: "GitHub", value: "safwannuddin", href: links.github },
  { label: "X", value: links.x.replace(/^https?:\/\/(www\.)?x\.com\//, "@"), href: links.x },
  { label: "Contact card", value: "Save my details", href: links.card },
].filter((c) => c.href);

export default function Contact() {
  return (
    <div className={s.contact}>
      <div className={s.emailBlock}>
        <p className={`mono ${s.small}`}>Email, the fastest way to reach me</p>
        <div className={s.emailRow}>
          <a className={s.email} href={`mailto:${person.email}`}>
            {person.email}
          </a>
          <CopyEmail email={person.email} />
        </div>
      </div>

      <ul role="list" className={s.channels}>
        {channels.map((c) => (
          <li key={c.label}>
            <a className={s.channel} href={c.href} rel="me noopener">
              <span className="mono">{c.label}</span>
              <span className={s.handle}>{c.value}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M5 11l6-6M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
          </li>
        ))}
      </ul>

      <div className={s.sign}>
        <Image
          className={s.avatar}
          src={person.photo}
          alt={`Portrait of ${person.name}`}
          width={56}
          height={56}
          sizes="56px"
        />
        <p>
          <span className={s.signName}>{person.name}</span>
          <span className={s.signMeta}>{person.location}</span>
        </p>
      </div>
    </div>
  );
}
