import HeroSection from "./components/rocket/HeroSection";
import SectionKm10Music from "./components/SectionKm10Music";
import AllPlatformsSection from "./components/distribution/AllPlatformsSection";
import SectionKm4 from "./components/SectionKm4";
import RoyaltyReportingSection from "./components/royalty/RoyaltyReportingSection";
import SectionKm10Ent from "./components/SectionKm10Ent";
import SectionKm9 from "./components/SectionKm9";
import SectionKm7 from "./components/SectionKm7";
import ScrollTriggerInit from "./components/ScrollTriggerInit";

export default function Home() {
  return (
    <>
      <ScrollTriggerInit />
      <HeroSection />
      <SectionKm10Music />
      <AllPlatformsSection />
      <SectionKm4 />
      <RoyaltyReportingSection />
      <SectionKm10Ent />
      <SectionKm9 />
      <SectionKm7 />
    </>
  );
}
