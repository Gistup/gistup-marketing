import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import type { FAQContactCTAContent } from "@/content/faq";

/**
 * FAQContactCTA component props
 */
export interface FAQContactCTAProps {
  /** Content for the contact CTA section */
  content: FAQContactCTAContent;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * FAQContactCTA component
 *
 * A call-to-action section displayed below the FAQ accordion,
 * encouraging users to contact support for additional questions.
 *
 * @example
 * ```tsx
 * <FAQContactCTA
 *   content={{
 *     headline: "Still have questions?",
 *     cta: { label: "Contact Us", href: "/contact" }
 *   }}
 * />
 * ```
 */
export const FAQContactCTA: React.FC<FAQContactCTAProps> = ({
  content,
  className = "",
}) => {
  const { headline, cta } = content;

  return (
    <div
      className={`flex flex-col items-center justify-center text-center border border-border rounded-button px-6 py-8 md:px-8 md:py-10 bg-background-main ${className}`}
      role="complementary"
      aria-label="Contact support"
    >
      <p className="text-body font-semibold text-text-primary mb-4">
        {headline}
      </p>
      <Link href={cta.href} passHref legacyBehavior>
        <Button
          variant="secondary"
          size="md"
          aria-label={cta.label}
        >
          {cta.label}
        </Button>
      </Link>
    </div>
  );
};

export default FAQContactCTA;
