import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTs,
  { ignores: [".next/**", "out/**", "scripts/**", "next-env.d.ts"] },
  {
    // Static site: plain <a> links do full navigations on purpose so the
    // browser runs cross-document view transitions between pages.
    rules: { "@next/next/no-html-link-for-pages": "off" },
  },
];

export default config;
