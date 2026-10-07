import { Hero } from "@/components/Hero";
import { Metrics } from "@/components/Metrics";
import { About } from "@/components/About";
import { FeaturedWork } from "@/components/FeaturedWork";
import { HowIBuildSystems } from "@/components/HowIBuildSystems";
import { Skills } from "@/components/Skills";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Achievements } from "@/components/Achievements";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Metrics />
      <FeaturedWork />
      <HowIBuildSystems />
      <ExperienceTimeline />
      <Skills />
      <Achievements />
      <About />
      <Contact />
    </>
  );
}
