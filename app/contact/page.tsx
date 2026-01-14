"use client";

import React from "react";
import { Section } from "@/components/ui";
import { ContactForm } from "@/components/contact";
import { contactContent } from "@/content/contact";

/**
 * Contact Page Component
 *
 * Displays the contact form with name, email, and message fields.
 * Implements the approved wireframes with responsive design for
 * desktop and mobile. This component handles UI layout only -
 * form submission logic is explicitly handled in Epic 3.
 *
 * Content is managed through the git-based CMS (content/contact.ts).
 */
export default function ContactPage() {
  const { hero, form } = contactContent;

  return (
    <main>
      {/* Hero Section */}
      <Section spacing="lg" background="main" aria-label="Contact hero">
        <div className="text-center">
          <h1 className="text-h1 font-bold text-text-primary mb-2">
            {hero.title}
          </h1>
          <p className="text-body text-text-secondary">{hero.subtitle}</p>
        </div>
      </Section>

      {/* Contact Form Section */}
      <Section spacing="lg" background="main" aria-label="Contact form section">
        <div className="max-w-2xl mx-auto">
          <ContactForm content={form} />
        </div>
      </Section>
    </main>
  );
}
