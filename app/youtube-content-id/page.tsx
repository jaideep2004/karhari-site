import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import YouTubeContentIDPage from "./components/YouTubeContentIDPage";

import "../components/styles/youtube-page.css";

export const metadata: Metadata = {
  title: "YouTube Content ID - Karhari Media",
  description:
    "Protect, manage and monetize your YouTube content with Karhari Media's Content ID system — fingerprinting, ownership verification, claim matching and revenue tracking in real time.",
};

export default function YouTubeContentID() {
  return (
    <main className="min-h-screen bg-[#060610]">
      <Navbar />
      <YouTubeContentIDPage />
    </main>
  );
}
