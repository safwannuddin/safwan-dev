import s from "./Label.module.css";

const state: Record<string, "done" | "progress" | "planned"> = {
  "IN PROGRESS": "progress",
  PLANNED: "planned",
  "COMING SOON": "planned",
  INTERACTIVE: "done",
};

/**
 * Honest status label. The small square reads at a glance:
 * solid = shipped or published, half = in progress, hollow = planned.
 */
export default function Label({ value }: { value: string }) {
  return (
    <span className={`mono ${s.label}`} data-state={state[value] ?? "done"}>
      {value}
    </span>
  );
}
