import React from "react";
import { TermsSection } from "./TermsSection";
import type { TermsSection as TermsSectionType } from "@/content/terms";

/**
 * TermsSectionList component props
 */
export interface TermsSectionListProps {
  /** Array of terms sections to display */
  sections: TermsSectionType[];
  /** Optional className for additional styling */
  className?: string;
}

/**
 * TermsSectionList component
 *
 * Renders a list of terms of service sections in a vertical layout.
 * Each section is displayed as a card with proper spacing.
 * Implements accessible list semantics for screen readers.
 *
 * @example
 * ```tsx
 * <TermsSectionList sections={termsContent.sections} />
 * ```
 */
export const TermsSectionList: React.FC<TermsSectionListProps> = ({
  sections,
  className = "",
}) => {
  const listClassName = ["flex", "flex-col", "gap-4", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={listClassName}
      role="list"
      aria-label="Terms of service sections"
    >
      {sections.map((section) => (
        <div key={section.id} role="listitem">
          <TermsSection section={section} />
        </div>
      ))}
    </div>
  );
};

export default TermsSectionList;
