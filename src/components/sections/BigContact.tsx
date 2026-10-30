import Image from "next/image";
import { links, person } from "@/content/site";
import CopyEmail from "../CopyEmail";
import s from "./BigContact.module.css";

export default function BigContact() {
  const socials = [
    { label: "LinkedIn", href: links.linkedin },
    { label: "GitHub", href: links.github },
    ...(links.x ? [{ label: "X", href: links.x }] : []),
    { label: "Contact card", href: links.card },
    { label: "CV (PDF)", href: person.cv },
  ];

  return (
    <section id="contact" data-section className={s.section} aria-labelledby="contact-title">
      <div className={s.inner}>
        <div className={s.top}>
          <Image className={s.avatar} src={person.photo} alt={`Portrait of ${person.name}`} width={88} height={88} sizes="88px" />
          <h2 id="contact-title" className={s.title}>
            Got an idea?
            <br />
            <span className={s.say}>Say hi.</span>
          </h2>
        </div>

        <div className={s.rule}>
          <a className={s.bubble} href={`mailto:${person.email}`} data-magnetic="0.45" data-cursor="Write">
            <span>Get in touch</span>
          </a>
        </div>

        <div className={s.grid}>
          <div className={s.block}>
            <p className="mono">Email</p>
            <div className={s.emailRow}>
              <a className={s.email} href={`mailto:${person.email}`}>
                {person.email}
              </a>
              <CopyEmail email={person.email} />
            </div>
            {person.email2 ? (
              <a className={s.email2} href={`mailto:${person.email2}`}>
                {person.email2}
              </a>
            ) : null}
          </div>
          <div className={s.block}>
            <p className="mono">Elsewhere</p>
            <ul role="list" className={s.socials}>
              {socials.map((l) => (
                <li key={l.label}>
                  <a href={l.href} rel="me noopener" data-magnetic="0.3">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.block}>
            <p className="mono">Right now</p>
            <p className={s.now}>
              {person.location}. Looking for {person.lookingFor}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
