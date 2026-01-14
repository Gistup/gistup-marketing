import React from "react";
import Link from "next/link";
import { PricingTier, BillingPeriod } from "@/content/pricing";
import { Button, Card } from "@/components/ui";

/**
 * PricingCard component props
 */
export interface PricingCardProps {
  /** Pricing tier data */
  tier: PricingTier;
  /** Current billing period */
  billingPeriod: BillingPeriod;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * Format price for display
 */
const formatPrice = (price: number | null, priceLabel?: string): string => {
  if (price === null) {
    return priceLabel || "Custom";
  }
  if (price === 0) {
    return "$0";
  }
  return `$${price}`;
};

/**
 * Get price suffix based on billing period
 */
const getPriceSuffix = (
  price: number | null,
  billingPeriod: BillingPeriod
): string => {
  if (price === null || price === 0) {
    return "";
  }
  return billingPeriod === "monthly" ? " / mo" : " / mo";
};

/**
 * CheckIcon component for feature list items
 */
const CheckIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    className={`w-5 h-5 text-status-success flex-shrink-0 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

/**
 * PricingCard component for displaying a single pricing tier
 *
 * A card component that displays pricing tier information including
 * name, price, features, and CTA button. Supports highlighted state
 * for featured tiers.
 *
 * @example
 * ```tsx
 * <PricingCard
 *   tier={proTier}
 *   billingPeriod="monthly"
 * />
 * ```
 */
export const PricingCard: React.FC<PricingCardProps> = ({
  tier,
  billingPeriod,
  className = "",
}) => {
  const price =
    billingPeriod === "monthly" ? tier.monthlyPrice : tier.yearlyPrice;
  const displayPrice = formatPrice(price, tier.priceLabel);
  const priceSuffix = getPriceSuffix(price, billingPeriod);

  const highlightedStyles = tier.highlighted
    ? "border-primary ring-2 ring-primary/20"
    : "";

  return (
    <Card
      className={`flex flex-col h-full ${highlightedStyles} ${className}`}
      padding="lg"
      bordered
      aria-label={`${tier.name} pricing plan`}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-h3 font-semibold text-text-primary mb-2">
          {tier.name}
        </h3>
        {tier.description && (
          <p className="text-small text-text-muted">{tier.description}</p>
        )}
      </div>

      {/* Price */}
      <div className="text-center mb-6">
        <span className="text-h1 font-bold text-text-primary">
          {displayPrice}
        </span>
        {priceSuffix && (
          <span className="text-body text-text-secondary">{priceSuffix}</span>
        )}
      </div>

      {/* CTA Button */}
      <div className="mb-6">
        <Link href={tier.cta.href} className="block">
          <Button
            variant={tier.highlighted ? "primary" : "secondary"}
            className="w-full"
            aria-label={`${tier.cta.label} for ${tier.name} plan`}
          >
            {tier.cta.label}
          </Button>
        </Link>
      </div>

      {/* Features */}
      <ul className="space-y-3 flex-grow" role="list" aria-label={`${tier.name} features`}>
        {tier.features.map((feature) => (
          <li key={feature.id} className="flex items-start gap-3">
            <CheckIcon />
            <span className="text-body text-text-secondary">{feature.text}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default PricingCard;
