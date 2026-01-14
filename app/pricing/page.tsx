"use client";

import React, { useState } from "react";
import { Section, Grid } from "@/components/ui";
import {
  PricingToggle,
  PricingCard,
  FeatureComparisonTable,
  PricingBottomCTA,
} from "@/components/pricing";
import { pricingContent, BillingPeriod } from "@/content/pricing";

/**
 * Pricing Page Component
 *
 * Displays pricing tiers, feature comparison, and call-to-action sections.
 * Implements the approved wireframes with responsive design for desktop and mobile.
 * Content is managed through the git-based CMS (content/pricing.ts).
 */
export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");

  const { hero, tiers, featureComparison, bottomCTA } = pricingContent;

  return (
    <main>
      {/* Hero Section */}
      <Section spacing="lg" background="main" aria-label="Pricing hero">
        <div className="text-center">
          <h1 className="text-h1 font-bold text-text-primary mb-4">
            {hero.title}
          </h1>
          <p className="text-body text-text-secondary mb-8">{hero.subtitle}</p>

          {/* Billing Toggle */}
          <PricingToggle
            billingPeriod={billingPeriod}
            onBillingPeriodChange={setBillingPeriod}
            yearlySavingsPercent={hero.yearlySavingsPercent}
          />
        </div>
      </Section>

      {/* Pricing Cards Section */}
      <Section spacing="lg" background="main" aria-label="Pricing plans">
        <Grid columns={3} gap="lg" equalHeight>
          {tiers.map((tier) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              billingPeriod={billingPeriod}
            />
          ))}
        </Grid>
      </Section>

      {/* Feature Comparison Section */}
      <Section
        spacing="lg"
        background="main"
        aria-label="Feature comparison"
      >
        <FeatureComparisonTable content={featureComparison} />
      </Section>

      {/* Bottom CTA Section */}
      <PricingBottomCTA content={bottomCTA} />
    </main>
  );
}
