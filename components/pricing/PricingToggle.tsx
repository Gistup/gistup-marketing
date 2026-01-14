import React from "react";
import { BillingPeriod } from "@/content/pricing";

/**
 * PricingToggle component props
 */
export interface PricingToggleProps {
  /** Currently selected billing period */
  billingPeriod: BillingPeriod;
  /** Callback when billing period changes */
  onBillingPeriodChange: (period: BillingPeriod) => void;
  /** Yearly savings percentage to display */
  yearlySavingsPercent?: number;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * PricingToggle component for switching between monthly and yearly billing
 *
 * A toggle component that allows users to switch between monthly and yearly
 * billing periods. Displays savings percentage for yearly billing.
 *
 * @example
 * ```tsx
 * <PricingToggle
 *   billingPeriod="monthly"
 *   onBillingPeriodChange={setBillingPeriod}
 *   yearlySavingsPercent={20}
 * />
 * ```
 */
export const PricingToggle: React.FC<PricingToggleProps> = ({
  billingPeriod,
  onBillingPeriodChange,
  yearlySavingsPercent,
  className = "",
}) => {
  const baseButtonStyles =
    "px-4 py-2 text-body font-medium rounded-button transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2";

  const activeStyles = "bg-primary text-text-inverse";
  const inactiveStyles =
    "bg-transparent text-text-secondary hover:text-text-primary hover:bg-background-secondary";

  return (
    <div
      className={`inline-flex items-center gap-2 p-1 bg-background-secondary rounded-lg ${className}`}
      role="radiogroup"
      aria-label="Billing period selection"
    >
      <button
        type="button"
        role="radio"
        aria-checked={billingPeriod === "monthly"}
        className={`${baseButtonStyles} ${
          billingPeriod === "monthly" ? activeStyles : inactiveStyles
        }`}
        onClick={() => onBillingPeriodChange("monthly")}
      >
        Monthly
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={billingPeriod === "yearly"}
        className={`${baseButtonStyles} ${
          billingPeriod === "yearly" ? activeStyles : inactiveStyles
        }`}
        onClick={() => onBillingPeriodChange("yearly")}
      >
        Yearly
        {yearlySavingsPercent && yearlySavingsPercent > 0 && (
          <span className="ml-1 text-small">
            (Save {yearlySavingsPercent}%)
          </span>
        )}
      </button>
    </div>
  );
};

export default PricingToggle;
