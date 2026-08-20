import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import HeroSection from "./components/HeroSection";
import PartnershipSection from "./components/PartnershipSection";
import PipelineSection from "./components/PipelineSection";
import HowItWorksSection from "./components/HowItWorksSection";
import PlatformsSection from "./components/PlatformsSection";
import MetricsSection from "./components/MetricsSection";
import RoyaltyFlowSection from "./components/RoyaltyFlowSection";
import PolicySection from "./components/PolicySection";
import FAQSection from "./components/FAQSection";
import CTASection from "./components/CTASection";

import "../components/styles/facebook-page.css";

export const metadata: Metadata = {
  title: "Facebook Rights Manager - Karhari Media",
  description:
    "Protect and monetize your music on Facebook & Instagram with Karhari Media's Facebook Rights Manager — fingerprint matching, revenue collection and transparent payouts.",
};

export default function FacebookRightsManager() {
  return (
    <main className="min-h-screen" style={{ background: "#0d0d0d" }}>
      <Navbar />
      <HeroSection />
      <PipelineSection />
      <PartnershipSection />
      <HowItWorksSection />
      <PlatformsSection />
      <MetricsSection />
      <RoyaltyFlowSection />
      <PolicySection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
