import React from "react";
import type { WaitlistHeroContent } from "@/content/waitlist";

/**
 * WaitlistHero component props
 */
export interface WaitlistHeroProps {
  /** Hero content configuration */
  content: WaitlistHeroContent;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * WaitlistHero component for displaying the waitlist page hero section
 *
 * A hero component that displays the page title, subtitle, and description
 * for the waitlist/early access page.
 *
 * @example
 * ```tsx
 * <WaitlistHero content={waitlistContent.hero} />
 * ```
 */
export const WaitlistHero: React.FC<WaitlistHeroProps> = ({
  content,
  className = "",
}) => {
  const { title, subtitle, description } = content;

  const containerClassName = ["text-center", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClassName}>
      <h1 className="text-h1 font-bold text-text-primary mb-4">{title}</h1>
      <p className="text-h3 font-medium text-text-secondary mb-4">{subtitle}</p>
      <p className="text-body text-text-muted max-w-2xl mx-auto">{description}</p>
    </div>
  );
};

export default WaitlistHero;
