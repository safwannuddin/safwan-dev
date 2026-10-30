import type { ReactNode } from "react";

/**
 * Placeholders for facts only Safwan can supply are written as
 * "TODO(safwan): ...". In development they render as a visible marker so
 * they are easy to find; in production the placeholder part is dropped so
 * the live site never shows unfinished text.
 */

const MARK = "TODO(safwan)";
const SHOW = process.env.NODE_ENV !== "production";

export const isTodo = (s: string) => s.trim().startsWith(MARK);

/** The real text before any placeholder. */
export const clean = (s: string) => s.split(MARK)[0].trim();

/** True when there is something to show in the current build. */
export const hasText = (s: string | undefined | null): s is string =>
  !!s && (SHOW || clean(s).length > 0);

export function Txt({ value }: { value: string }): ReactNode {
  const i = value.indexOf(MARK);
  if (i === -1) return value;
  const before = value.slice(0, i).trim();
  if (!SHOW) return before || null;
  return (
    <>
      {before ? `${before} ` : null}
      <mark className="todo">{value.slice(i)}</mark>
    </>
  );
}

export const visible = (items: string[]) => items.filter((s) => SHOW || !isTodo(s));
