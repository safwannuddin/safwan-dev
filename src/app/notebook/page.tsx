import type { Metadata } from "next";
import NotebookList from "@/components/NotebookList";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: "Notebook",
  description:
    "Small interactive explainers of what Safwan Uddin Mohammed learns from first principles: gradient descent, train versus test error, and how Python runs a program.",
  alternates: { canonical: "/notebook/" },
};

export default function NotebookPage() {
  return (
    <div className={s.page}>
      <a href="/" className={s.back}>
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M13 8H3M7 4L3 8l4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        Home
      </a>
      <header className={s.header}>
        <p className="mono">Notebook</p>
        <h1 className={s.title}>Learning in public, from first principles</h1>
        <p className={s.lead}>
          Small interactive explainers of things I am learning on the MSc. Each one should let you change a number and
          see what happens. The first entries are being written now.
        </p>
      </header>
      <NotebookList />
    </div>
  );
}
