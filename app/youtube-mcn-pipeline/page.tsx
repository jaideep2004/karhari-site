import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import YouTubeMCNPipelinePage from "./components/YouTubeMCNPipelinePage";

export const metadata: Metadata = {
  title: "YouTube MCN Pipeline - Karhari Media",
  description:
    "Karhari Media's YouTube Multi-Channel Network pipeline — creators and labels submit channels, Content ID fingerprinting, live revenue tracking and transparent payouts in real time.",
};

export default function YouTubeMCNPipeline() {
  return (
    <main className="min-h-screen bg-[#020208]">
      <Navbar />
      <YouTubeMCNPipelinePage />
    </main>
  );
}