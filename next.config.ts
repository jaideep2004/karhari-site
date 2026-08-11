import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* React StrictMode double-invokes effects in dev. The legacy GSAP/script
     segments append DOM and start infinite tweens, which made double-runs
     duplicate page content, so StrictMode stays off (matching the original
     static page's single-run behavior). */
  reactStrictMode: false,
  /* Pure static export (the original site was a single static HTML page):
     `next build` writes self-contained output to ./out — deployable on any
     static host (no Node server required). `next start` is unavailable. */
  output: "export",
};

export default nextConfig;
