import React from "react";
import Link from "next/link";
import { Section, Button } from "@/components/ui";
import { BottomCTAContent } from "@/content/landing";

/**
 * BottomCTASection component props
 */
export interface BottomCTASectionProps {
  /** Content for the bottom CTA section */
  content: BottomCTAContent;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * BottomCTASection component for the landing page
 *
 * Displays a final call-to-action section with headline and button.
 * Centered layout with prominent styling to drive conversions.
 */
export const BottomCTASection: React.FC<BottomCTASectionProps> = ({
  content,
  className = "",
}) => {
  const { headline, subtext, primaryCTA } = content;

  return (
    <Section
      spacing="xl"
      background="secondary"
      className={className}
      aria-label="Call to action"
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-h2 font-bold text-text-primary mb-4">{headline}</h2>
        <p className="text-body text-text-secondary mb-8">{subtext}</p>

        <Link href={primaryCTA.href}>
          <Button variant="primary" size="lg" aria-label={primaryCTA.label}>
            {primaryCTA.label}
          </Button>
        </Link>
      </div>
    </Section>
  );
};

export default BottomCTASection;
