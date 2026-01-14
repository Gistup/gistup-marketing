import React from "react";
import { Section } from "@/components/ui";
import { HowItWorksContent } from "@/content/landing";
import { SectionTitle } from "./ProblemSection";

/**
 * HowItWorksSection component props
 */
export interface HowItWorksSectionProps {
  /** Content for the how it works section */
  content: HowItWorksContent;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * StepConnector component for the arrow between steps
 */
const StepConnector: React.FC = () => (
  <div className="hidden lg:flex items-center justify-center px-4">
    <svg
      className="w-8 h-8 text-text-muted"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  </div>
);

/**
 * HowItWorksSection component for the landing page
 *
 * Displays the step-by-step process of how the product works.
 * Horizontal layout with arrows on desktop, stacked on mobile.
 */
export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  content,
  className = "",
}) => {
  const { sectionTitle, steps } = content;

  return (
    <Section
      spacing="lg"
      background="main"
      className={className}
      aria-labelledby="how-it-works-title"
    >
      <SectionTitle title={sectionTitle} id="how-it-works-title" />

      {/* Steps Container */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center gap-6 lg:gap-0">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Item */}
            <div className="flex flex-col items-center text-center lg:flex-1 lg:max-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-h3 font-bold text-primary">
                  {step.stepNumber}.
                </span>
                <span className="text-body font-medium text-text-primary">
                  {step.title}
                </span>
              </div>
              <p className="text-small text-text-secondary hidden lg:block">
                {step.description}
              </p>
            </div>

            {/* Connector Arrow (not after last step) */}
            {index < steps.length - 1 && <StepConnector />}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile: Show descriptions below */}
      <div className="lg:hidden mt-6 space-y-4">
        {steps.map((step) => (
          <div
            key={`${step.id}-desc`}
            className="border border-border rounded-lg p-4"
          >
            <h4 className="font-medium text-text-primary mb-1">
              Step {step.stepNumber}: {step.title}
            </h4>
            <p className="text-small text-text-secondary">{step.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default HowItWorksSection;
