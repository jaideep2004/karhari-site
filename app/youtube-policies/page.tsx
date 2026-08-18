import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import YouTubePoliciesPage from "./components/YouTubePoliciesPage";

import "../components/styles/youtube-policies-page.css";

export const metadata: Metadata = {
  title: "YouTube Policies - Karhari Media",
  description:
    "Complete YouTube policy reference for Content ID, MCN, CMS, monetization and channel management — enforced by Karhari Media, with direct links to official YouTube documentation.",
};

export default function YouTubePolicies() {
  return (
    <main className="min-h-screen bg-[#060610]">
      <Navbar />
      <YouTubePoliciesPage />
    </main>
  );
}
