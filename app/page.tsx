import {
  HeroSection,
  ProblemSection,
  HowItWorksSection,
  VideoDemoSection,
  FeaturesSection,
  BottomCTASection,
} from "@/components/landing";
import { landingContent } from "@/content/landing";

/**
 * Home / Landing Page
 *
 * The main marketing landing page for GistUp.
 * Content is managed through the git-based CMS (content/landing.ts).
 * All sections are responsive and follow the approved wireframes.
 */
export default function Home() {
  return (
    <>
      <HeroSection content={landingContent.hero} />
      <ProblemSection content={landingContent.problem} />
      <HowItWorksSection content={landingContent.howItWorks} />
      <VideoDemoSection content={landingContent.videoDemo} />
      <FeaturesSection content={landingContent.features} />
      <BottomCTASection content={landingContent.bottomCTA} />
    </>
  );
}
