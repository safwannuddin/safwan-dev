import s from "./not-found.module.css";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className={s.page}>
      <p className="mono">404</p>
      <h1 className={s.title}>This page does not exist.</h1>
      <p className={s.text}>
        It may have moved when I rebuilt the site. <a className="link" href="/">Go to the home page</a>.
      </p>
    </div>
  );
}
