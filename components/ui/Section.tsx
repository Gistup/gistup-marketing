import React from "react";

/**
 * Section spacing options
 */
export type SectionSpacing = "none" | "sm" | "md" | "lg" | "xl";

/**
 * Section background options
 */
export type SectionBackground = "main" | "secondary";

/**
 * Section component props
 */
export interface SectionProps {
  /** The content of the section */
  children: React.ReactNode;
  /** Vertical padding size */
  spacing?: SectionSpacing;
  /** Background color variant */
  background?: SectionBackground;
  /** Whether to constrain content width to max-content */
  constrained?: boolean;
  /** Optional className for additional styling */
  className?: string;
  /** Optional id for anchor linking */
  id?: string;
  /** Accessible label for the section */
  "aria-label"?: string;
  /** Accessible labelledby reference */
  "aria-labelledby"?: string;
}

/**
 * Spacing styles for vertical padding
 */
const spacingStyles: Record<SectionSpacing, string> = {
  none: "py-0",
  sm: "py-4 md:py-6",
  md: "py-8 md:py-12",
  lg: "py-12 md:py-16",
  xl: "py-16 md:py-24",
};

/**
 * Background styles
 */
const backgroundStyles: Record<SectionBackground, string> = {
  main: "bg-background-main",
  secondary: "bg-background-secondary",
};

/**
 * Section component for wrapping page content
 *
 * A reusable section container that provides consistent spacing,
 * background colors, and optional content width constraints.
 * Supports semantic HTML with proper accessibility attributes.
 *
 * @example
 * ```tsx
 * <Section spacing="lg" background="secondary">
 *   <h2>Section Title</h2>
 *   <p>Section content goes here</p>
 * </Section>
 *
 * <Section spacing="md" constrained={false}>
 *   <div>Full-width content</div>
 * </Section>
 * ```
 */
export const Section: React.FC<SectionProps> = ({
  children,
  spacing = "md",
  background = "main",
  constrained = true,
  className = "",
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}) => {
  const sectionClassName = [
    spacingStyles[spacing],
    backgroundStyles[background],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const innerClassName = constrained
    ? "container mx-auto px-4 max-w-content"
    : "w-full px-4";

  return (
    <section
      id={id}
      className={sectionClassName}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
    >
      <div className={innerClassName}>{children}</div>
    </section>
  );
};

export default Section;
