// Regenerates public/og.png and the app icons. Run: node scripts/make-assets.cjs
const { chromium } = require("playwright");
const path = require("path");
(async () => {
  const root = path.resolve(__dirname, "..");
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.goto("file://" + path.join(root, "scripts/og.html"));
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  await p.screenshot({ path: path.join(root, "public/og.png") });
  const icon = (size, file, radius) =>
    p.setViewportSize({ width: size, height: size }).then(() =>
      p.setContent(`<style>@font-face{font-family:S;src:url("file://${root}/src/fonts/SchibstedGrotesk-Variable.woff2")}html,body{margin:0}div{width:${size}px;height:${size}px;border-radius:${radius}px;background:#142042;color:#fff;display:grid;place-items:center;font:700 ${Math.round(size * 0.42)}px S;letter-spacing:.01em}</style><div>SU</div>`)
    ).then(() => p.evaluate(() => document.fonts.ready)).then(() => p.waitForTimeout(150))
     .then(() => p.screenshot({ path: path.join(root, file), omitBackground: true }));
  await icon(180, "public/apple-touch-icon.png", 0);
  await icon(512, "public/icon-512.png", 112);
  await icon(192, "public/icon-192.png", 42);
  await icon(64, "scripts/favicon-64.png", 14);
  await b.close();
})();
