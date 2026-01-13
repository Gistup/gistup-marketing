"use client";

import React from "react";
import { Button, Section, Card, Grid } from "@/components";

/**
 * Components Demo Page
 *
 * This page demonstrates all reusable UI components implemented for GMS-9.
 * It serves as a visual reference and testing ground for the component library.
 */
export default function ComponentsDemoPage() {
  const handleButtonClick = () => {
    console.log("Button clicked");
  };

  return (
    <div className="py-8">
      <h1 className="text-h1 text-text-primary mb-8">
        UI Components Demo
      </h1>
      <p className="text-body text-text-secondary mb-12">
        This page demonstrates all reusable UI components created for the GistUp
        marketing website (GMS-9).
      </p>

      {/* Buttons Section */}
      <Section spacing="lg" background="secondary" aria-labelledby="buttons-heading">
        <h2 id="buttons-heading" className="text-h2 text-text-primary mb-6">
          Buttons
        </h2>
        <p className="text-body text-text-secondary mb-8">
          Button components support primary and secondary variants, multiple sizes,
          and disabled states.
        </p>

        <div className="space-y-8">
          {/* Primary Buttons */}
          <div>
            <h3 className="text-h3 text-text-primary mb-4">Primary Buttons</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary" size="sm" onClick={handleButtonClick}>
                Small Primary
              </Button>
              <Button variant="primary" size="md" onClick={handleButtonClick}>
                Medium Primary
              </Button>
              <Button variant="primary" size="lg" onClick={handleButtonClick}>
                Large Primary
              </Button>
              <Button variant="primary" disabled>
                Disabled Primary
              </Button>
            </div>
          </div>

          {/* Secondary Buttons */}
          <div>
            <h3 className="text-h3 text-text-primary mb-4">Secondary Buttons</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="secondary" size="sm" onClick={handleButtonClick}>
                Small Secondary
              </Button>
              <Button variant="secondary" size="md" onClick={handleButtonClick}>
                Medium Secondary
              </Button>
              <Button variant="secondary" size="lg" onClick={handleButtonClick}>
                Large Secondary
              </Button>
              <Button variant="secondary" disabled>
                Disabled Secondary
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Section Component Demo */}
      <Section spacing="lg" background="main" aria-labelledby="sections-heading">
        <h2 id="sections-heading" className="text-h2 text-text-primary mb-6">
          Section Component
        </h2>
        <p className="text-body text-text-secondary mb-8">
          Section components provide consistent spacing and background options for
          page content areas.
        </p>
      </Section>

      <Section spacing="sm" background="secondary">
        <p className="text-body text-text-secondary">
          This is a section with <strong>small spacing</strong> and secondary background.
        </p>
      </Section>

      <Section spacing="md" background="main">
        <p className="text-body text-text-secondary">
          This is a section with <strong>medium spacing</strong> and main background.
        </p>
      </Section>

      <Section spacing="lg" background="secondary">
        <p className="text-body text-text-secondary">
          This is a section with <strong>large spacing</strong> and secondary background.
        </p>
      </Section>

      <Section spacing="xl" background="main">
        <p className="text-body text-text-secondary">
          This is a section with <strong>extra large spacing</strong> and main background.
        </p>
      </Section>

      {/* Cards Section */}
      <Section spacing="lg" background="secondary" aria-labelledby="cards-heading">
        <h2 id="cards-heading" className="text-h2 text-text-primary mb-6">
          Cards
        </h2>
        <p className="text-body text-text-secondary mb-8">
          Card components support optional header and footer areas, various padding
          sizes, and can be made interactive.
        </p>

        <Grid columns={3} gap="md">
          {/* Basic Card */}
          <Card>
            <h3 className="text-h3 text-text-primary mb-2">Basic Card</h3>
            <p className="text-body text-text-secondary">
              A simple card with default padding and border.
            </p>
          </Card>

          {/* Card with Shadow */}
          <Card shadow>
            <h3 className="text-h3 text-text-primary mb-2">Card with Shadow</h3>
            <p className="text-body text-text-secondary">
              A card with subtle shadow for elevation.
            </p>
          </Card>

          {/* Card without Border */}
          <Card bordered={false} shadow>
            <h3 className="text-h3 text-text-primary mb-2">No Border</h3>
            <p className="text-body text-text-secondary">
              A card without border, using shadow instead.
            </p>
          </Card>
        </Grid>

        <div className="mt-8">
          <h3 className="text-h3 text-text-primary mb-4">Cards with Header and Footer</h3>
          <Grid columns={2} gap="lg">
            <Card
              header={
                <h4 className="text-h3 text-text-primary">Feature Card</h4>
              }
              footer={
                <Button variant="primary" size="sm">
                  Learn More
                </Button>
              }
              padding="lg"
            >
              <p className="text-body text-text-secondary">
                This card has a header, body, and footer section. Perfect for
                feature blocks or pricing items.
              </p>
            </Card>

            <Card
              header={
                <h4 className="text-h3 text-text-primary">Pricing Card</h4>
              }
              footer={
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm">
                    Compare
                  </Button>
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </div>
              }
              padding="lg"
              shadow
            >
              <div className="text-center">
                <p className="text-h2 text-primary mb-2">$29/mo</p>
                <p className="text-body text-text-secondary">
                  Everything you need to get started
                </p>
              </div>
            </Card>
          </Grid>
        </div>

        <div className="mt-8">
          <h3 className="text-h3 text-text-primary mb-4">Interactive Cards</h3>
          <Grid columns={3} gap="md">
            <Card
              interactive
              onClick={() => console.log("Card 1 clicked")}
              aria-label="Click to view Feature 1 details"
            >
              <h4 className="text-h3 text-text-primary mb-2">Feature 1</h4>
              <p className="text-body text-text-secondary">
                Click this card to interact with it.
              </p>
            </Card>

            <Card
              interactive
              onClick={() => console.log("Card 2 clicked")}
              aria-label="Click to view Feature 2 details"
            >
              <h4 className="text-h3 text-text-primary mb-2">Feature 2</h4>
              <p className="text-body text-text-secondary">
                Hover to see the interaction effect.
              </p>
            </Card>

            <Card
              interactive
              onClick={() => console.log("Card 3 clicked")}
              aria-label="Click to view Feature 3 details"
            >
              <h4 className="text-h3 text-text-primary mb-2">Feature 3</h4>
              <p className="text-body text-text-secondary">
                Fully keyboard accessible.
              </p>
            </Card>
          </Grid>
        </div>
      </Section>

      {/* Grid Section */}
      <Section spacing="lg" background="main" aria-labelledby="grid-heading">
        <h2 id="grid-heading" className="text-h2 text-text-primary mb-6">
          Grid Layouts
        </h2>
        <p className="text-body text-text-secondary mb-8">
          Grid components support 1-4 column layouts with automatic responsive
          breakpoints.
        </p>

        {/* 1 Column Grid */}
        <div className="mb-8">
          <h3 className="text-h3 text-text-primary mb-4">1 Column Grid</h3>
          <Grid columns={1} gap="md">
            <Card padding="sm">
              <p className="text-body text-text-secondary">Full width item</p>
            </Card>
          </Grid>
        </div>

        {/* 2 Column Grid */}
        <div className="mb-8">
          <h3 className="text-h3 text-text-primary mb-4">2 Column Grid</h3>
          <Grid columns={2} gap="md">
            <Card padding="sm">
              <p className="text-body text-text-secondary">Column 1</p>
            </Card>
            <Card padding="sm">
              <p className="text-body text-text-secondary">Column 2</p>
            </Card>
          </Grid>
        </div>

        {/* 3 Column Grid */}
        <div className="mb-8">
          <h3 className="text-h3 text-text-primary mb-4">3 Column Grid</h3>
          <Grid columns={3} gap="md">
            <Card padding="sm">
              <p className="text-body text-text-secondary">Column 1</p>
            </Card>
            <Card padding="sm">
              <p className="text-body text-text-secondary">Column 2</p>
            </Card>
            <Card padding="sm">
              <p className="text-body text-text-secondary">Column 3</p>
            </Card>
          </Grid>
        </div>

        {/* 4 Column Grid */}
        <div className="mb-8">
          <h3 className="text-h3 text-text-primary mb-4">4 Column Grid</h3>
          <Grid columns={4} gap="md">
            <Card padding="sm">
              <p className="text-body text-text-secondary">Col 1</p>
            </Card>
            <Card padding="sm">
              <p className="text-body text-text-secondary">Col 2</p>
            </Card>
            <Card padding="sm">
              <p className="text-body text-text-secondary">Col 3</p>
            </Card>
            <Card padding="sm">
              <p className="text-body text-text-secondary">Col 4</p>
            </Card>
          </Grid>
        </div>

        {/* Equal Height Grid */}
        <div className="mb-8">
          <h3 className="text-h3 text-text-primary mb-4">Equal Height Grid</h3>
          <Grid columns={3} gap="md" equalHeight>
            <Card padding="md">
              <h4 className="text-h3 text-text-primary mb-2">Short Content</h4>
              <p className="text-body text-text-secondary">Brief text.</p>
            </Card>
            <Card padding="md">
              <h4 className="text-h3 text-text-primary mb-2">Medium Content</h4>
              <p className="text-body text-text-secondary">
                This card has more content than the first one, demonstrating
                equal height behavior.
              </p>
            </Card>
            <Card padding="md">
              <h4 className="text-h3 text-text-primary mb-2">Long Content</h4>
              <p className="text-body text-text-secondary">
                This card has the most content of all three cards. The equal
                height grid ensures all cards stretch to match the tallest one,
                creating a clean and aligned layout.
              </p>
            </Card>
          </Grid>
        </div>
      </Section>

      {/* Accessibility Section */}
      <Section spacing="lg" background="secondary" aria-labelledby="a11y-heading">
        <h2 id="a11y-heading" className="text-h2 text-text-primary mb-6">
          Accessibility Features
        </h2>
        <Grid columns={2} gap="lg">
          <Card>
            <h3 className="text-h3 text-text-primary mb-4">Keyboard Navigation</h3>
            <p className="text-body text-text-secondary mb-4">
              All interactive components are fully keyboard accessible. Try using
              Tab to navigate and Enter/Space to activate.
            </p>
            <div className="flex gap-2">
              <Button variant="primary">Tab to me</Button>
              <Button variant="secondary">Then to me</Button>
            </div>
          </Card>
          <Card>
            <h3 className="text-h3 text-text-primary mb-4">Focus States</h3>
            <p className="text-body text-text-secondary mb-4">
              All focusable elements have visible focus indicators that meet WCAG
              AA requirements.
            </p>
            <Button variant="primary">Focus visible on keyboard</Button>
          </Card>
        </Grid>
      </Section>
    </div>
  );
}
