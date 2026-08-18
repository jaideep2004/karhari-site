import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import AboutHero from "./components/AboutHero";
import OurJourneySection from "./components/OurJourneySection";
import JourneyTimeline from "./components/JourneyTimeline";
import BuildingFoundation from "./components/BuildingFoundation";
import EstablishingBrand from "./components/EstablishingBrand";
import CompanyRegistration from "./components/CompanyRegistration";
import ContinuedGrowth from "./components/ContinuedGrowth";
import BuildingTechnology from "./components/BuildingTechnology";
import TodaySection from "./components/TodaySection";
import OurCommitment from "./components/OurCommitment";
import FounderSection from "./components/FounderSection";

import "../components/styles/about-page.css";

export const metadata: Metadata = {
  title: "About Us - Karhari Media",
  description:
    "The story, journey, and vision of Karhari Media - built on passion, dedication, and years of hard work in global music distribution and rights management.",
};

export default function AboutPage() {
  return (
    <main className="km-about-page bg-background text-foreground min-h-screen overflow-x-hidden">
      <Navbar />
      <AboutHero />
      <OurJourneySection />
      <JourneyTimeline />
      <BuildingFoundation />
      <EstablishingBrand />
      <CompanyRegistration />
      <ContinuedGrowth />
      <BuildingTechnology />
      <TodaySection />
      <OurCommitment />
      <FounderSection />
    </main>
  );
}
