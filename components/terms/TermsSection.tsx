import React from "react";
import type { TermsSection as TermsSectionType } from "@/content/terms";

/**
 * TermsSection component props
 */
export interface TermsSectionProps {
  /** The section data to display */
  section: TermsSectionType;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * TermsSection component
 *
 * Displays a single terms of service section with a title and content.
 * Follows the GistUp design system with proper typography and spacing.
 * Implements accessible heading hierarchy and semantic HTML.
 *
 * @example
 * ```tsx
 * <TermsSection
 *   section={{
 *     id: "acceptance-of-terms",
 *     title: "Acceptance of Terms",
 *     content: "By accessing or using GistUp..."
 *   }}
 * />
 * ```
 */
export const TermsSection: React.FC<TermsSectionProps> = ({
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

export default TermsSection;
