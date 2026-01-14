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

export { contactContent } from "./contact";
export type {
  ContactPageContent,
  ContactHeroContent,
  ContactFormContent,
  ContactFormField,
} from "./contact";

export { privacyContent } from "./privacy";
export type {
  PrivacyPageContent,
  PrivacyHeroContent,
  PrivacySection,
} from "./privacy";

export { termsContent } from "./terms";
export type {
  TermsPageContent,
  TermsHeroContent,
  TermsSection,
} from "./terms";

export { waitlistContent } from "./waitlist";
export type {
  WaitlistPageContent,
  WaitlistHeroContent,
  WaitlistFormContent,
  WaitlistFormField,
  WaitlistFormFeedback,
} from "./waitlist";
