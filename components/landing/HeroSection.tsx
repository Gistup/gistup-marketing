import React from "react";
import Link from "next/link";
import { Section, Button } from "@/components/ui";
import { HeroContent } from "@/content/landing";

/**
 * HeroSection component props
 */
export interface HeroSectionProps {
  /** Content for the hero section */
  content: HeroContent;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * HeroSection component for the landing page
 *
 * Displays the main headline, subtext, primary and secondary CTAs,
 * and a media placeholder for animation/image content.
 * Responsive layout: stacked on mobile, side-by-side on desktop.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  content,
  className = "",
}) => {
  const { headline, subtext, primaryCTA, secondaryCTA, mediaAlt } = content;

  return (
    <Section
      spacing="xl"
      background="main"
      className={className}
      aria-label="Hero section"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
        {/* Text Content */}
        <div className="flex flex-col gap-6 lg:max-w-[50%]">
          <h1 className="text-h1 text-text-primary font-bold leading-tight">
            {headline}
          </h1>
          <p className="text-body text-text-secondary">{subtext}</p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={primaryCTA.href}>
              <Button variant="primary" size="lg" aria-label={primaryCTA.label}>
                {primaryCTA.label}
              </Button>
            </Link>
            <Link href={secondaryCTA.href}>
              <Button
                variant="secondary"
                size="lg"
                aria-label={secondaryCTA.label}
              >
                {secondaryCTA.label}
              </Button>
            </Link>
          </div>
        </div>

        {/* Media Placeholder */}
        <div className="lg:max-w-[45%] w-full">
          <div
            className="relative aspect-[4/3] bg-background-secondary border border-border rounded-lg overflow-hidden"
            role="img"
            aria-label={mediaAlt}
          >
            {/* Placeholder with diagonal lines pattern */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-full h-full text-border"
                viewBox="0 0 400 300"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="400"
                  y2="300"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <line
                  x1="400"
                  y1="0"
                  x2="0"
                  y2="300"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </div>
            {/* Browser-like header dots */}
            <div className="absolute top-3 left-3 flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-text-muted" />
              <div className="w-2.5 h-2.5 rounded-full bg-text-muted" />
              <div className="w-2.5 h-2.5 rounded-full bg-text-muted" />
            </div>
          </div>
          <p className="text-small text-text-muted mt-2 text-right">
            → Animated Example
          </p>
        </div>
      </div>
    </Section>
  );
};

export default HeroSection;
