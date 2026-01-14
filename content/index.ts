/**
 * Content exports for the GistUp marketing website
 *
 * This module provides centralized access to all content managed
 * through the git-based CMS approach.
 */

export { landingContent } from "./landing";
export type {
  LandingPageContent,
  HeroContent,
  ProblemContent,
  ProblemStatement,
  HowItWorksContent,
  HowItWorksStep,
  VideoDemoContent,
  FeaturesContent,
  Feature,
  BottomCTAContent,
} from "./landing";

export { pricingContent } from "./pricing";
export type {
  PricingPageContent,
  PricingHeroContent,
  PricingTier,
  PricingFeature,
  FeatureComparisonContent,
  ComparisonFeature,
  PricingBottomCTAContent,
  BillingPeriod,
  CTAConfig,
} from "./pricing";

export { faqContent } from "./faq";
export type {
  FAQPageContent,
  FAQHeroContent,
  FAQItem,
  FAQCategory,
  FAQContactCTAContent,
} from "./faq";
