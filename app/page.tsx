import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AllPlatforms from "./components/AllPlatforms";
import SectionKm2 from "./components/SectionKm2";
import SectionKm3 from "./components/SectionKm3";
import SectionKm4 from "./components/SectionKm4";
import SectionKm6 from "./components/SectionKm6";
import SectionKm5 from "./components/SectionKm5";
import SectionKm7 from "./components/SectionKm7";
import SectionKm8 from "./components/SectionKm8";
import SectionKm9 from "./components/SectionKm9";
import SectionKm10 from "./components/SectionKm10";
import ScrollTriggerInit from "./components/ScrollTriggerInit";

export default function Home() {
  return (
    <>
      <ScrollTriggerInit />
      <Navbar />
      <Hero />
      <AllPlatforms />
      <SectionKm2 />
      <SectionKm3 />
      <SectionKm4 />
      <SectionKm6 />
      <SectionKm5 />
      <SectionKm7 />
      <SectionKm8 />
      <SectionKm9 />
      <SectionKm10 />
    </>
  );
}
