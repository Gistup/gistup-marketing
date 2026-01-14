"use client";

import React from "react";
import { Section } from "@/components/ui";
import { FAQAccordion, FAQContactCTA } from "@/components/faq";
import { faqContent } from "@/content/faq";

/**
 * FAQ Page Component
 *
 * Displays frequently asked questions in an accordion format with
 * expandable/collapsible sections. Implements the approved wireframes
 * with responsive design for desktop and mobile.
 * Content is managed through the git-based CMS (content/faq.ts).
 */
export default function FAQPage() {
  const { hero, items, contactCTA } = faqContent;

  return (
    <main>
      {/* Hero Section */}
      <Section spacing="lg" background="main" aria-label="FAQ hero">
        <div className="text-center">
          <h1 className="text-h1 font-bold text-text-primary mb-2">
            {hero.title}
          </h1>
          <p className="text-body text-text-secondary">{hero.subtitle}</p>
        </div>
      </Section>

      {/* FAQ Accordion Section */}
      <Section spacing="lg" background="main" aria-label="FAQ questions">
        <div className="max-w-3xl mx-auto">
          <FAQAccordion items={items} allowMultiple={false} />
        </div>
      </Section>

      {/* Contact CTA Section */}
      <Section spacing="lg" background="main" aria-label="Contact support">
        <div className="max-w-md mx-auto">
          <FAQContactCTA content={contactCTA} />
        </div>
      </Section>
    </main>
  );
}
