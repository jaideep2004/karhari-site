import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import MusicDistributionPage from "./components/MusicDistributionPage";

import "../components/styles/music-distribution-page.css";

export const metadata: Metadata = {
  title: "Music Distribution - Karhari Media",
  description:
    "Karhari Media's global music distribution pipeline — from artist & record label uploads to digital stores, revenue reporting and transparent payouts, all in real time.",
};

export default function MusicDistribution() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <MusicDistributionPage />
    </main>
  );
}
