import React from "react";
import Link from "next/link";
import { PricingBottomCTAContent } from "@/content/pricing";
import { Button, Section } from "@/components/ui";

/**
 * PricingBottomCTA component props
 */
export interface PricingBottomCTAProps {
  /** Bottom CTA content */
  content: PricingBottomCTAContent;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * PricingBottomCTA component for the pricing page bottom call-to-action
 *
 * A section component that displays a final call-to-action at the bottom
 * of the pricing page, encouraging users to get started.
 *
 * @example
 * ```tsx
 * <PricingBottomCTA
 *   content={bottomCTAContent}
 * />
 * ```
 */
export const PricingBottomCTA: React.FC<PricingBottomCTAProps> = ({
  content,
  className = "",
}) => {
  return (
    <Section
      spacing="lg"
      background="secondary"
      className={className}
      aria-label="Call to action"
    >
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-h2 font-semibold text-text-primary mb-6">
          {content.headline}
        </h2>
        <Link href={content.cta.href}>
          <Button variant="secondary" size="lg" aria-label={content.cta.label}>
            {content.cta.label}
          </Button>
        </Link>
      </div>
    </Section>
  );
};

export default PricingBottomCTA;
