// Regenerates the favicon set from public/icon.svg and the OG image from the
// live hero. Run with the site served on :4173: node scripts/make-assets.cjs
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");
(async () => {
  const root = path.resolve(__dirname, "..");
  const svg = fs.readFileSync(path.join(root, "public/icon.svg"), "utf8");
  const b = await chromium.launch({ args: ["--use-gl=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"] });
  const p = await b.newPage();
  const icon = async (size, file, bleed = false) => {
    await p.setViewportSize({ width: size, height: size });
    const s = bleed ? svg.replace('rx="16"', 'rx="0"') : svg;
    await p.setContent(`<style>html,body{margin:0;background:transparent}svg{width:${size}px;height:${size}px;display:block}</style>${s}`);
    await p.screenshot({ path: path.join(root, file), omitBackground: true });
  };
  await icon(180, "public/apple-touch-icon.png", true);
  await icon(192, "public/icon-192.png");
  await icon(512, "public/icon-512.png");
  await icon(64, "scripts/favicon-64.png");

  const og = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await og.goto("http://localhost:4173/", { waitUntil: "networkidle" });
  await og.addStyleTag({
    content:
      "header,.cursor,[class*=hint],[class*=bottom],[class*=build]{display:none!important}" +
      "main section:first-child{min-height:630px!important;height:630px;margin-top:0!important;padding-top:0!important}" +
      ".og-cap{font:600 30px/1.2 var(--font-display);letter-spacing:-.02em;color:#a9b1c6;margin-top:18px}" +
      ".og-cap b{color:#7f98ff;font-weight:600}",
  });
  await og.evaluate(() => {
    const h = document.querySelector("h1");
    const d = document.createElement("p");
    d.className = "og-cap";
    d.innerHTML = "AI engineer · <b>2 arXiv papers</b> · London · safwan.dev";
    h.after(d);
  });
  await og.mouse.move(5, 600);
  await og.waitForTimeout(6000);
  await og.screenshot({ path: path.join(root, "public/og.png") });
  await b.close();
})();
