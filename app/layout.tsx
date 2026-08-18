import type { Metadata } from "next";
import "./globals.css";
import "./components/styles/base.css";
import "./components/styles/rocket.compiled.css";
import CopyrightFooter from "./components/rocket/CopyrightFooter";

export const metadata: Metadata = {
  title: "Karhari Media - Global Music Distribution",
  description:
    "Distribute. Protect. Monetize. Your music across 150+ platforms worldwide with Karhari Media.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600&family=Poppins:wght@400;500;600;700;800;900&family=Manrope:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:wght@300;400;600;700;900&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <CopyrightFooter />
      </body>
    </html>
  );
}
