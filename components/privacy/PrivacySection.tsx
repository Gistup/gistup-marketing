import React from "react";
import type { PrivacySection as PrivacySectionType } from "@/content/privacy";

/**
 * PrivacySection component props
 */
export interface PrivacySectionProps {
  /** The section data to display */
  section: PrivacySectionType;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * PrivacySection component
 *
 * Displays a single privacy policy section with a title and content.
 * Follows the GistUp design system with proper typography and spacing.
 * Implements accessible heading hierarchy and semantic HTML.
 *
 * @example
 * ```tsx
 * <PrivacySection
 *   section={{
 *     id: "introduction",
 *     title: "Introduction",
 *     content: "Welcome to GistUp..."
 *   }}
 * />
 * ```
 */
export const PrivacySection: React.FC<PrivacySectionProps> = ({
  section,
  className = "",
}) => {
  const baseClassName = [
    "bg-background-main",
    "border",
    "border-border",
    "rounded-lg",
    "p-4",
    "md:p-6",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      id={section.id}
      className={baseClassName}
      aria-labelledby={`${section.id}-heading`}
    >
      <h2
        id={`${section.id}-heading`}
        className="text-lg md:text-xl font-semibold text-text-primary mb-3 italic"
      >
        {section.title}
      </h2>
      <p className="text-body text-text-secondary leading-relaxed">
        {section.content}
      </p>
    </article>
  );
};

export default PrivacySection;
