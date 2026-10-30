import type { NextConfig } from "next";

// Static export: every page is plain HTML in /out, served by Netlify's CDN.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  // Inline the (small) stylesheet into each page so first paint does not
  // wait for a separate CSS request. Helps mobile LCP.
  experimental: { inlineCss: true },
};

export default nextConfig;
