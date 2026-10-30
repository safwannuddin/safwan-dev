import type { NextConfig } from "next";

// Static export: every page is plain HTML in /out, served by Netlify's CDN.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
