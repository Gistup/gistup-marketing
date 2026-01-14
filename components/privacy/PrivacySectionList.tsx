import React from "react";
import { PrivacySection } from "./PrivacySection";
import type { PrivacySection as PrivacySectionType } from "@/content/privacy";

/**
 * PrivacySectionList component props
 */
export interface PrivacySectionListProps {
  /** Array of privacy sections to display */
  sections: PrivacySectionType[];
  /** Optional className for additional styling */
  className?: string;
}

/**
 * PrivacySectionList component
 *
 * Renders a list of privacy policy sections in a vertical layout.
 * Each section is displayed as a card with proper spacing.
 * Implements accessible list semantics for screen readers.
 *
 * @example
 * ```tsx
 * <PrivacySectionList sections={privacyContent.sections} />
 * ```
 */
export const PrivacySectionList: React.FC<PrivacySectionListProps> = ({
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
      aria-label="Privacy policy sections"
    >
      {sections.map((section) => (
        <div key={section.id} role="listitem">
          <PrivacySection section={section} />
        </div>
      ))}
    </div>
  );
};

export default PrivacySectionList;
