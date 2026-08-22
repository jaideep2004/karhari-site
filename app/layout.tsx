import type { Metadata } from "next";
import "./globals.css";
import "./components/styles/base.css";
import "./components/styles/rocket.compiled.css";
import CopyrightFooter from "./components/rocket/CopyrightFooter";

const SITE_URL = "https://karharimedia.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Karhari Media - Global Music Distribution, Rights Management & YouTube MCN",
    template: "%s | Karhari Media",
  },
  description:
    "Karhari Media distributes your music to 150+ platforms worldwide. Music CMS, entertainment MCN, YouTube Content ID, rights protection, royalty reporting & transparent payouts for artists and record labels.",
  keywords: [
    "Karhari Media",
    "music distribution",
    "YouTube MCN",
    "multi channel network",
    "YouTube Content ID",
    "music CMS",
    "royalty reporting",
    "music rights management",
    "music promotion",
    "record label services",
  ],
  authors: [{ name: "Karhari Media" }],
  creator: "Karhari Media",
  publisher: "Karhari Media",
  applicationName: "Karhari Media",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Karhari Media",
    title: "Karhari Media - Global Music Distribution, Rights Management & YouTube MCN",
    description:
      "Distribute your music to 150+ platforms. Protect copyrights with Content ID, track royalties in real time and get transparent payouts with Karhari Media.",
    images: [
      {
        url: `${SITE_URL}/favicon-s3.png`,
        width: 570,
        height: 446,
        alt: "Karhari Media logo",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karhari Media - Global Music Distribution, Rights Management & YouTube MCN",
    description:
      "Distribute your music to 150+ platforms. Protect copyrights, track royalties and get transparent payouts with Karhari Media.",
    images: [`${SITE_URL}/favicon-s3.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon-s3.png",
    apple: "/favicon-s3.png",
  },
  category: "Music",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#060612" />
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