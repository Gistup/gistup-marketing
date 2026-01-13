import React from "react";
import { Section, Button } from "@/components/ui";
import { VideoDemoContent } from "@/content/landing";

/**
 * VideoDemoSection component props
 */
export interface VideoDemoSectionProps {
  /** Content for the video demo section */
  content: VideoDemoContent;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * VideoDemoSection component for the landing page
 *
 * Displays a video placeholder with play button for product demonstration.
 * Centered layout with responsive sizing.
 */
export const VideoDemoSection: React.FC<VideoDemoSectionProps> = ({
  content,
  className = "",
}) => {
  const { buttonLabel, posterAlt } = content;

  return (
    <Section
      spacing="lg"
      background="secondary"
      className={className}
      id="video-demo"
      aria-label="Video demonstration"
    >
      {/* Video Container */}
      <div className="max-w-3xl mx-auto">
        <div
          className="relative aspect-video bg-background-main border border-border rounded-lg overflow-hidden"
          role="img"
          aria-label={posterAlt}
        >
          {/* Placeholder with diagonal lines pattern */}
          <div className="absolute inset-0">
            <svg
              className="w-full h-full text-border"
              viewBox="0 0 640 360"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line
                x1="0"
                y1="0"
                x2="640"
                y2="360"
                stroke="currentColor"
                strokeWidth="1"
              />
              <line
                x1="640"
                y1="0"
                x2="0"
                y2="360"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="secondary"
              size="lg"
              aria-label={`Play ${buttonLabel}`}
              className="bg-background-main shadow-sm"
            >
              {buttonLabel}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default VideoDemoSection;
