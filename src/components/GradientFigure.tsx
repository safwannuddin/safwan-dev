import { contours, toView, GLOBAL_MIN, LOCAL_MIN, VIEW } from "@/lib/loss";
import GradientRunner from "./GradientRunner";
import s from "./GradientFigure.module.css";

const LEVELS = [0.32, 0.4, 0.5, 0.6, 0.7, 0.8, 0.86, 0.95, 1.05, 1.15, 1.25, 1.35, 1.45];

/**
 * Fig. 1: gradient descent on a two-basin loss surface.
 * The contour plot is computed at build time (static SVG in the HTML);
 * the descending point is a small client layer on top.
 */
export default function GradientFigure({ compact = false, lab = false }: { compact?: boolean; lab?: boolean }) {
  const paths = contours(LEVELS);
  const [gx, gy] = toView(...GLOBAL_MIN);
  const [lx, ly] = toView(...LOCAL_MIN);

  return (
    <figure className={s.figure} data-compact={compact || undefined}>
      <div className={s.bar}>
        <span className="mono">Fig. 1</span>
        <span className={`mono ${s.barTitle}`}>Gradient descent · two-basin loss</span>
      </div>
      <div className={s.plot}>
        <svg
          className={s.surface}
          viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {paths.map((d, i) => (
            <path
              key={LEVELS[i]}
              d={d}
              className={s.contour}
              style={{ opacity: 0.95 - (i / LEVELS.length) * 0.7 }}
            />
          ))}
          <g className={s.minMark} transform={`translate(${gx} ${gy})`}>
            <path d="M-6 0H6M0 -6V6" />
          </g>
          <g className={s.minMarkSoft} transform={`translate(${lx} ${ly})`}>
            <path d="M-5 0H5M0 -5V5" />
          </g>
          <text x={gx + 18} y={gy - 22} className={s.minLabel}>
            global min
          </text>
          <text x={lx + 10} y={ly + 20} className={s.minLabelSoft}>
            local min
          </text>
        </svg>
        <GradientRunner lab={lab} />
      </div>
    </figure>
  );
}
