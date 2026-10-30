import type { Metadata } from "next";
import GradientFigure from "@/components/GradientFigure";
import s from "../entry.module.css";

export const metadata: Metadata = {
  title: "Gradient descent, one step at a time",
  description:
    "An interactive explainer by Safwan Uddin Mohammed: drop a point on a loss surface, change the learning rate and momentum, and watch gradient descent find (or miss) the minimum.",
  alternates: { canonical: "/notebook/gradient-descent/" },
};

export default function GradientDescentPage() {
  return (
    <article className={s.page}>
      <a href="/notebook/" className={s.back}>
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M13 8H3M7 4L3 8l4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        Notebook
      </a>

      <header className={s.header}>
        <p className="mono">Notebook · 01 · October 2026</p>
        <h1 className={s.title}>
          Gradient descent, <em>one step at a time</em>
        </h1>
        <p className={s.lead}>
          A model cannot see its whole loss surface. It can only feel the slope where it stands, take a step downhill,
          and repeat. Click the plot to drop a point and watch it do exactly that.
        </p>
      </header>

      <div className={s.lab}>
        <GradientFigure lab />
      </div>

      <div className={s.prose}>
        <h2>The rule</h2>
        <p>At every step the point moves against the gradient, scaled by the learning rate η:</p>
        <pre className={s.math}>
          <code>θ ← θ − η · ∇L(θ)</code>
        </pre>
        <p>With momentum, it also keeps a fraction β of its previous velocity, like a ball that has started to roll:</p>
        <pre className={s.math}>
          <code>{"v ← β · v − η · ∇L(θ)\nθ ← θ + v"}</code>
        </pre>

        <h2>Things to try</h2>
        <ol className={s.tries}>
          <li>
            <strong>Set momentum to 0 and the learning rate low.</strong> The point crawls. On this surface it takes
            about 300 steps instead of 60.
          </li>
          <li>
            <strong>Start in the lower left.</strong> The point settles in the local minimum, even though a deeper one
            exists. Plain gradient descent only knows the slope under its feet.
          </li>
          <li>
            <strong>Now raise momentum to 0.95 and the learning rate to 0.5.</strong> From the same start, the point
            can roll through the shallow basin and reach the global minimum. It overshoots and spirals on the way.
          </li>
        </ol>

        <h2>Why it matters</h2>
        <p>
          Training a neural network is this, in millions of dimensions instead of two. The learning rate and momentum
          you pick decide whether training is slow, unstable, or stuck. Seeing it in two dimensions makes the
          trade-off easy to feel.
        </p>
        <p className={s.note}>
          The surface here is a sum of two Gaussian wells and a gentle bowl. Gradients are computed numerically with
          central differences. Everything runs in your browser.
        </p>
      </div>
    </article>
  );
}
