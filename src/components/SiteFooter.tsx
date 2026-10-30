import { person } from "@/content/site";
import s from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <p>
          © 2026 {person.name} · {person.location}
        </p>
        <p className={s.meta}>
          <a className={s.link} href="https://github.com/safwannuddin/safwan-dev">
            Source on GitHub
          </a>
          <span aria-hidden="true">·</span>
          <span>Updated October 2026</span>
        </p>
      </div>
    </footer>
  );
}
