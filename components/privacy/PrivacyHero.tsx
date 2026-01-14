import React from "react";
import type { PrivacyHeroContent } from "@/content/privacy";

/**
 * PrivacyHero component props
 */
export interface PrivacyHeroProps {
  /** The hero content to display */
  content: PrivacyHeroContent;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * PrivacyHero component
 *
 * Displays the Privacy Policy page header with title and last updated date.
 * Follows the wireframe design with centered text layout.
 * Implements proper heading hierarchy for accessibility.
 *
 * @example
 * ```tsx
 * <PrivacyHero
 *   content={{
 *     title: "Privacy Policy",
 *     lastUpdated: "January 14, 2026"
 *   }}
 * />
 * ```
 */
export const PrivacyHero: React.FC<PrivacyHeroProps> = ({
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

export default PrivacyHero;
