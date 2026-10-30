/**
 * A two-basin loss surface for the gradient-descent explorer.
 * Global minimum near (1.2, 0.6); a shallower local minimum near (-1.6, -0.8),
 * so some starting points get stuck, which is the lesson.
 */

export const DOMAIN = { x0: -3, x1: 3, y0: -2, y1: 2 };
export const VIEW = { w: 600, h: 400 };

export function loss(x: number, y: number) {
  return (
    1.4 -
    1.2 * Math.exp(-((x - 1.2) ** 2 / 1.6 + (y - 0.6) ** 2 / 0.9)) -
    0.75 * Math.exp(-((x + 1.6) ** 2 / 0.8 + (y + 0.8) ** 2 / 0.7)) +
    0.045 * (x * x + 1.5 * y * y)
  );
}

export function grad(x: number, y: number): [number, number] {
  const h = 1e-4;
  return [
    (loss(x + h, y) - loss(x - h, y)) / (2 * h),
    (loss(x, y + h) - loss(x, y - h)) / (2 * h),
  ];
}

export const GLOBAL_MIN: [number, number] = [1.2, 0.6];
export const LOCAL_MIN: [number, number] = [-1.6, -0.8];

/** domain -> view coordinates (y up in maths, down on screen) */
export function toView(x: number, y: number): [number, number] {
  return [
    ((x - DOMAIN.x0) / (DOMAIN.x1 - DOMAIN.x0)) * VIEW.w,
    ((DOMAIN.y1 - y) / (DOMAIN.y1 - DOMAIN.y0)) * VIEW.h,
  ];
}

export function toDomain(vx: number, vy: number): [number, number] {
  return [
    DOMAIN.x0 + (vx / VIEW.w) * (DOMAIN.x1 - DOMAIN.x0),
    DOMAIN.y1 - (vy / VIEW.h) * (DOMAIN.y1 - DOMAIN.y0),
  ];
}

/**
 * Contour lines by marching squares. Runs at build time; the result is a
 * small SVG path per level, so the plot is in the HTML from the first byte.
 */
export function contours(levels: number[], nx = 72, ny = 48): string[] {
  const xs = (i: number) => DOMAIN.x0 + (i / nx) * (DOMAIN.x1 - DOMAIN.x0);
  const ys = (j: number) => DOMAIN.y1 - (j / ny) * (DOMAIN.y1 - DOMAIN.y0);
  const v: number[][] = [];
  for (let j = 0; j <= ny; j++) {
    v[j] = [];
    for (let i = 0; i <= nx; i++) v[j][i] = loss(xs(i), ys(j));
  }
  const sx = VIEW.w / nx;
  const sy = VIEW.h / ny;
  const r = (n: number) => Math.round(n * 10) / 10;

  return levels.map((L) => {
    let d = "";
    for (let j = 0; j < ny; j++) {
      for (let i = 0; i < nx; i++) {
        const a = v[j][i], b = v[j][i + 1], c = v[j + 1][i + 1], e = v[j + 1][i];
        const idx = (a > L ? 8 : 0) | (b > L ? 4 : 0) | (c > L ? 2 : 0) | (e > L ? 1 : 0);
        if (idx === 0 || idx === 15) continue;
        const t = (p: number, q: number) => (L - p) / (q - p);
        const top: [number, number] = [(i + t(a, b)) * sx, j * sy];
        const right: [number, number] = [(i + 1) * sx, (j + t(b, c)) * sy];
        const bottom: [number, number] = [(i + t(e, c)) * sx, (j + 1) * sy];
        const left: [number, number] = [i * sx, (j + t(a, e)) * sy];
        const seg = (p: [number, number], q: [number, number]) =>
          (d += `M${r(p[0])} ${r(p[1])}L${r(q[0])} ${r(q[1])}`);
        switch (idx) {
          case 1: case 14: seg(left, bottom); break;
          case 2: case 13: seg(bottom, right); break;
          case 3: case 12: seg(left, right); break;
          case 4: case 11: seg(top, right); break;
          case 5: seg(left, top); seg(bottom, right); break;
          case 6: case 9: seg(top, bottom); break;
          case 7: case 8: seg(left, top); break;
          case 10: seg(left, bottom); seg(top, right); break;
        }
      }
    }
    return d;
  });
}
