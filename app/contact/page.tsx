import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import TitleBanner from "./components/TitleBanner";
import StatsSection from "./components/StatsSection";
import ServicesSection from "./components/ServicesSection";
import PlatformsSection from "./components/PlatformsSection";
import RevenueSection from "./components/RevenueSection";
import ContactSection from "./components/ContactSection";

import "../components/styles/contact-page.css";

export const metadata: Metadata = {
  title: "Contact Us - Karhari Media",
  description:
    "Get in touch with Karhari Media - India's premier music distribution partner, connecting artists and record labels to the world's biggest platforms.",
};

export default function ContactPage() {
  return (
    <main className="km-contact-page bg-background text-foreground min-h-screen overflow-x-hidden relative">
      {/* ── Global colorful animated background orbs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] orb-lime" />
        <div className="absolute top-[20%] right-[-8%] w-[500px] h-[500px] orb-blue" />
        <div className="absolute top-[50%] left-[30%] w-[400px] h-[400px] orb-pink" />
        <div className="absolute bottom-[10%] left-[-5%] w-[450px] h-[450px] orb-teal" />
        <div className="absolute bottom-[30%] right-[10%] w-[380px] h-[380px] orb-orange" />
        <div className="absolute top-[70%] right-[35%] w-[300px] h-[300px] orb-lime" style={{ animationDelay: '7s' }} />
      </div>

      <div className="relative z-10">
        <Navbar />
        <TitleBanner />
        <StatsSection />
        <ServicesSection />
        <PlatformsSection />
        <RevenueSection />
        <ContactSection />
      </div>
    </main>
  );
}
