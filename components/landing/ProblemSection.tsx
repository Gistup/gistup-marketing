import React from "react";
import { Section, Card, Grid } from "@/components/ui";
import { ProblemContent } from "@/content/landing";

/**
 * ProblemSection component props
 */
export interface ProblemSectionProps {
  /** Content for the problem section */
  content: ProblemContent;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * SectionTitle component for consistent section headers
 */
const SectionTitle: React.FC<{ title: string; id?: string }> = ({
  title,
  id,
}) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="flex-1 h-px bg-border" />
    <h2 id={id} className="text-h3 font-semibold text-text-primary uppercase tracking-wide">
      {title}
    </h2>
    <div className="flex-1 h-px bg-border" />
  </div>
);

/**
 * ProblemSection component for the landing page
 *
 * Displays the problem statements that the product solves.
 * Uses a 3-column grid on desktop, stacked on mobile.
 */
export const ProblemSection: React.FC<ProblemSectionProps> = ({
  content,
  className = "",
}) => {
  const { sectionTitle, statements } = content;

  return (
    <Section
      spacing="lg"
      background="main"
      className={className}
      aria-labelledby="problem-section-title"
    >
      <SectionTitle title={sectionTitle} id="problem-section-title" />

      <Grid columns={3} gap="md" equalHeight aria-label="Problem statements">
        {statements.map((statement) => (
          <Card
            key={statement.id}
            padding="md"
            bordered
            className="text-center"
            aria-label={statement.title}
          >
            <h3 className="text-body font-medium text-text-primary mb-2">
              {statement.title}
            </h3>
            <p className="text-small text-text-secondary">
              {statement.description}
            </p>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export { SectionTitle };
export default ProblemSection;
