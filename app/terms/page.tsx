import React from "react";
import { Metadata } from "next";
import { Section } from "@/components/ui";
import { TermsHero, TermsSectionList } from "@/components/terms";
import { termsContent } from "@/content/terms";

/**
 * Metadata for the Terms of Service page
 */
export const metadata: Metadata = {
  title: "Terms of Service - GistUp",
  description:
    "Read the GistUp Terms of Service. Learn about your rights and responsibilities when using our AI-powered content summarization and audio briefing service.",
};

/**
 * Terms of Service Page Component
 *
 * Displays the terms of service with all sections in a readable format.
 * Implements the approved wireframes with responsive design for desktop and mobile.
 * Content is managed through the git-based CMS (content/terms.ts).
 *
 * Features:
 * - Hero section with title and last updated date
 * - Multiple content sections in card format
 * - Responsive layout for all screen sizes
 * - Accessible heading hierarchy
 * - Semantic HTML structure
 */
export default function TermsPage() {
  const { hero, sections } = termsContent;

  return (
    <main>
      {/* Hero Section */}
      <Section spacing="lg" background="main" aria-label="Terms of service hero">
        <TermsHero content={hero} />
      </Section>

      {/* Terms of Service Sections */}
      <Section
        spacing="lg"
        background="main"
        aria-label="Terms of service content"
      >
        <div className="max-w-3xl mx-auto">
          <TermsSectionList sections={sections} />
        </div>
      </Section>
    </main>
  );
}
