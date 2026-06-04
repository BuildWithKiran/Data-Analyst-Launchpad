import React from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturesGrid from "@/components/home/FeaturesGrid";
import RoadmapPreviewStepper from "@/components/home/RoadmapPreviewStepper";
import InterviewPreview from "@/components/home/InterviewPreview";
import ToolsCoverage from "@/components/home/ToolsCoverage";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesGrid />
      <RoadmapPreviewStepper />
      <InterviewPreview />
      <ToolsCoverage />
      <FinalCTA />
    </>
  );
}
