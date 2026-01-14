/**
 * Pricing Page Content Configuration
 *
 * This file serves as a git-based Content Management System (CMS) for the pricing page.
 * All text content, pricing tiers, features, and CTAs are managed here.
 * Changes to this file will be tracked in version control.
 */

/**
 * Billing period options
 */
export type BillingPeriod = "monthly" | "yearly";

/**
 * CTA button configuration
 */
export interface CTAConfig {
  label: string;
  href: string;
}

/**
 * Individual pricing tier feature
 */
export interface PricingFeature {
  id: string;
  text: string;
}

/**
 * Pricing tier configuration
 */
export interface PricingTier {
  id: string;
  name: string;
  description?: string;
  monthlyPrice: number | null; // null for custom pricing
  yearlyPrice: number | null; // null for custom pricing
  priceLabel?: string; // For custom pricing display (e.g., "Custom")
  features: PricingFeature[];
  cta: CTAConfig;
  highlighted?: boolean; // Whether to highlight this tier
}

/**
 * Feature comparison row
 */
export interface ComparisonFeature {
  id: string;
  name: string;
  free: boolean;
  pro: boolean;
  business: boolean;
}

/**
 * Feature comparison table content
 */
export interface FeatureComparisonContent {
  sectionTitle: string;
  features: ComparisonFeature[];
}

/**
 * Bottom CTA section content
 */
export interface PricingBottomCTAContent {
  headline: string;
  cta: CTAConfig;
}

/**
 * Pricing page hero content
 */
export interface PricingHeroContent {
  title: string;
  subtitle: string;
  yearlySavingsPercent: number;
}

/**
 * Complete pricing page content
 */
export interface PricingPageContent {
  hero: PricingHeroContent;
  tiers: PricingTier[];
  featureComparison: FeatureComparisonContent;
  bottomCTA: PricingBottomCTAContent;
}

/**
 * Pricing page content - Edit this object to update page content
 */
export const pricingContent: PricingPageContent = {
  hero: {
    title: "Pricing",
    subtitle: "Simple plans. Clear value.",
    yearlySavingsPercent: 20,
  },

  tiers: [
    {
      id: "free",
      name: "Free",
      description: "Get started with the basics",
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        { id: "free-1", text: "Up to 10 bookmarks" },
        { id: "free-2", text: "Basic AI summaries" },
        { id: "free-3", text: "1 audio briefing per day" },
        { id: "free-4", text: "Web access only" },
      ],
      cta: {
        label: "Get Started",
        href: "/get-started",
      },
    },
    {
      id: "pro",
      name: "Pro",
      description: "For power users",
      monthlyPrice: 8,
      yearlyPrice: 6.4, // 20% off
      features: [
        { id: "pro-1", text: "Unlimited bookmarks" },
        { id: "pro-2", text: "Advanced AI summaries" },
        { id: "pro-3", text: "Unlimited audio briefings" },
        { id: "pro-4", text: "Cross-platform sync" },
      ],
      cta: {
        label: "Start Free Trial",
        href: "/get-started?plan=pro",
      },
      highlighted: true,
    },
    {
      id: "business",
      name: "Business",
      description: "For teams and enterprises",
      monthlyPrice: null,
      yearlyPrice: null,
      priceLabel: "Custom",
      features: [
        { id: "biz-1", text: "Everything in Pro" },
        { id: "biz-2", text: "Team collaboration" },
        { id: "biz-3", text: "Admin dashboard" },
        { id: "biz-4", text: "Priority support" },
      ],
      cta: {
        label: "Contact Sales",
        href: "/contact",
      },
    },
  ],

  featureComparison: {
    sectionTitle: "Compare Features",
    features: [
      {
        id: "compare-1",
        name: "AI Summaries",
        free: true,
        pro: true,
        business: true,
      },
      {
        id: "compare-2",
        name: "Audio Briefings",
        free: true,
        pro: true,
        business: true,
      },
      {
        id: "compare-3",
        name: "Knowledge Chat",
        free: true,
        pro: true,
        business: true,
      },
      {
        id: "compare-4",
        name: "Unlimited Storage",
        free: true,
        pro: true,
        business: true,
      },
    ],
  },

  bottomCTA: {
    headline: "Ready to get started?",
    cta: {
      label: "Get Started",
      href: "/get-started",
    },
  },
};

export default pricingContent;
