import type { DiagramNode } from "@/content/projects";
import s from "./Diagram.module.css";

/**
 * A simple left-to-right system diagram (top-to-bottom on phones).
 * Inline SVG coloured only by CSS variables, so it follows the theme.
 * The last node carries the accent: it is where the system delivers.
 */

type Props = { nodes: DiagramNode[]; caption: string; id: string };

const H = { w: 150, h: 68, gap: 40, r: 10 };
const V = { w: 280, h: 58, gap: 30, r: 10 };

function Box({
  x,
  y,
  w,
  h,
  r,
  node,
  last,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
  node: DiagramNode;
  last: boolean;
}) {
  const cx = x + w / 2;
  return (
    <g className={last ? s.last : undefined}>
      <rect className={s.box} x={x + 0.5} y={y + 0.5} width={w - 1} height={h - 1} rx={r} />
      <text className={s.label} x={cx} y={node.sub ? y + h / 2 - 3 : y + h / 2 + 5} textAnchor="middle">
        {node.label}
      </text>
      {node.sub ? (
        <text className={s.sub} x={cx} y={y + h / 2 + 15} textAnchor="middle">
          {node.sub}
        </text>
      ) : null}
    </g>
  );
}

export default function Diagram({ nodes, caption, id }: Props) {
  const n = nodes.length;
  const hw = n * H.w + (n - 1) * H.gap;
  const vh = n * V.h + (n - 1) * V.gap;
  const desc = nodes.map((nd, i) => `${i + 1}. ${nd.label}${nd.sub ? ` (${nd.sub})` : ""}`).join(" → ");

  return (
    <figure className={s.figure}>
      {/* Wide layout */}
      <svg
        className={s.wide}
        viewBox={`0 0 ${hw} ${H.h + 2}`}
        role="img"
        aria-labelledby={`${id}-t ${id}-d`}
      >
        <title id={`${id}-t`}>{caption}</title>
        <desc id={`${id}-d`}>{desc}</desc>
        {nodes.map((nd, i) => {
          const x = i * (H.w + H.gap);
          return (
            <g key={nd.label}>
              <Box x={x} y={1} w={H.w} h={H.h} r={H.r} node={nd} last={i === n - 1} />
              {i < n - 1 ? (
                <g className={s.edge}>
                  <line x1={x + H.w + 6} y1={H.h / 2 + 1} x2={x + H.w + H.gap - 8} y2={H.h / 2 + 1} />
                  <path
                    d={`M${x + H.w + H.gap - 13} ${H.h / 2 - 3} l5 4 -5 4`}
                    fill="none"
                  />
                </g>
              ) : null}
            </g>
          );
        })}
      </svg>

      {/* Narrow layout */}
      <svg className={s.narrow} viewBox={`0 0 ${V.w + 2} ${vh}`} aria-hidden="true">
        {nodes.map((nd, i) => {
          const y = i * (V.h + V.gap);
          return (
            <g key={nd.label}>
              <Box x={1} y={y} w={V.w} h={V.h} r={V.r} node={nd} last={i === n - 1} />
              {i < n - 1 ? (
                <g className={s.edge}>
                  <line x1={V.w / 2 + 1} y1={y + V.h + 5} x2={V.w / 2 + 1} y2={y + V.h + V.gap - 6} />
                  <path d={`M${V.w / 2 - 3} ${y + V.h + V.gap - 11} l4 5 4 -5`} fill="none" />
                </g>
              ) : null}
            </g>
          );
        })}
      </svg>
      <figcaption className={`mono ${s.caption}`}>{caption}</figcaption>
    </figure>
  );
}
