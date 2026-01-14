import React from "react";
import type { TermsHeroContent } from "@/content/terms";

/**
 * TermsHero component props
 */
export interface TermsHeroProps {
  /** The hero content to display */
  content: TermsHeroContent;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * TermsHero component
 *
 * Displays the Terms of Service page header with title and last updated date.
 * Follows the wireframe design with centered text layout.
 * Implements proper heading hierarchy for accessibility.
 *
 * @example
 * ```tsx
 * <TermsHero
 *   content={{
 *     title: "Terms of Service",
 *     lastUpdated: "January 14, 2026"
 *   }}
 * />
 * ```
 */
export const TermsHero: React.FC<TermsHeroProps> = ({
  content,
  className = "",
}) => {
  const containerClassName = ["text-center", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClassName}>
      <h1 className="text-h1 font-bold text-text-primary mb-2">
        {content.title}
      </h1>
      <p className="text-body text-text-secondary">
        Last updated: {content.lastUpdated}
      </p>
    </div>
  );
};

export default TermsHero;
