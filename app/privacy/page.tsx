import React from "react";
import { Metadata } from "next";
import { Section } from "@/components/ui";
import { PrivacyHero, PrivacySectionList } from "@/components/privacy";
import { privacyContent } from "@/content/privacy";

/**
 * Metadata for the Privacy Policy page
 */
export const metadata: Metadata = {
  title: "Privacy Policy - GistUp",
  description:
    "Learn how GistUp collects, uses, and protects your personal information. Read our privacy policy for details on data handling and your rights.",
};

/**
 * Privacy Policy Page Component
 *
 * Displays the privacy policy with all sections in a readable format.
 * Implements the approved wireframes with responsive design for desktop and mobile.
 * Content is managed through the git-based CMS (content/privacy.ts).
 *
 * Features:
 * - Hero section with title and last updated date
 * - Multiple content sections in card format
 * - Responsive layout for all screen sizes
 * - Accessible heading hierarchy
 * - Semantic HTML structure
 */
export default function PrivacyPage() {
  const { hero, sections } = privacyContent;

  return (
    <main>
      {/* Hero Section */}
      <Section spacing="lg" background="main" aria-label="Privacy policy hero">
        <PrivacyHero content={hero} />
      </Section>

      {/* Privacy Policy Sections */}
      <Section
        spacing="lg"
        background="main"
        aria-label="Privacy policy content"
      >
        <div className="max-w-3xl mx-auto">
          <PrivacySectionList sections={sections} />
        </div>
      </Section>
    </main>
  );
}
