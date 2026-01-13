import React from "react";
import { Section, Card, Grid } from "@/components/ui";
import { FeaturesContent } from "@/content/landing";
import { SectionTitle } from "./ProblemSection";

/**
 * FeaturesSection component props
 */
export interface FeaturesSectionProps {
  /** Content for the features section */
  content: FeaturesContent;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * FeaturesSection component for the landing page
 *
 * Displays the key features of the product in a grid layout.
 * Uses a 3-column grid on desktop, stacked on mobile.
 */
export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  content,
  className = "",
}) => {
  const { sectionTitle, features } = content;

  return (
    <Section
      spacing="lg"
      background="main"
      className={className}
      aria-labelledby="features-section-title"
    >
      <SectionTitle title={sectionTitle} id="features-section-title" />

      <Grid columns={3} gap="md" equalHeight aria-label="Key features">
        {features.map((feature) => (
          <Card
            key={feature.id}
            padding="md"
            bordered
            className="text-center"
            aria-label={feature.title}
          >
            <h3 className="text-body font-medium text-text-primary mb-2">
              {feature.title}
            </h3>
            <p className="text-small text-text-secondary">
              {feature.description}
            </p>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default FeaturesSection;
