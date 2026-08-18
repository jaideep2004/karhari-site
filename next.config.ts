import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* React StrictMode double-invokes effects in dev. The legacy GSAP/script
     segments append DOM and start infinite tweens, which made double-runs
     duplicate page content, so StrictMode stays off (matching the original
     static page's single-run behavior). */
  reactStrictMode: false,
  /* Server build (Vercel). NOT static export: the contact form POSTs to
     app/api/contact, which sends email via Gmail SMTP (nodemailer) using
     SMTP_USER / SMTP_PASS env vars. Deploy on any Node-capable host;
     `next start` serves the production build locally. */
  /* The about/contact pages use next/image (including remote Unsplash
     sources via AppImage). Serve images as-is instead of optimizing them. */
  images: {
    unoptimized: true,
    qualities: [75, 85],
  },
};

export default nextConfig;
