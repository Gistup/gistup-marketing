import React from "react";
import { render, screen } from "@testing-library/react";
import { Section } from "../Section";

describe("Section", () => {
  describe("Rendering", () => {
    it("renders children correctly", () => {
      render(
        <Section>
          <p>Section content</p>
        </Section>
      );
      expect(screen.getByText("Section content")).toBeInTheDocument();
    });

    it("renders as a semantic section element", () => {
      render(
        <Section aria-label="Test section">
          <p>Content</p>
        </Section>
      );
      expect(screen.getByRole("region", { name: "Test section" })).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      const { container } = render(
        <Section className="custom-class">
          <p>Content</p>
        </Section>
      );
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });

    it("renders with id for anchor linking", () => {
      const { container } = render(
        <Section id="my-section">
          <p>Content</p>
        </Section>
      );
      const section = container.querySelector("section");
      expect(section).toHaveAttribute("id", "my-section");
    });
  });

  describe("Spacing", () => {
    it("renders with no spacing", () => {
      const { container } = render(
        <Section spacing="none">
          <p>Content</p>
        </Section>
      );
      const section = container.querySelector("section");
      expect(section?.className).toContain("py-0");
    });

    it("renders with small spacing", () => {
      const { container } = render(
        <Section spacing="sm">
          <p>Content</p>
        </Section>
      );
      const section = container.querySelector("section");
      expect(section?.className).toContain("py-4");
      expect(section?.className).toContain("md:py-6");
    });

    it("renders with medium spacing (default)", () => {
      const { container } = render(
        <Section>
          <p>Content</p>
        </Section>
      );
      const section = container.querySelector("section");
      expect(section?.className).toContain("py-8");
      expect(section?.className).toContain("md:py-12");
    });

    it("renders with large spacing", () => {
      const { container } = render(
        <Section spacing="lg">
          <p>Content</p>
        </Section>
      );
      const section = container.querySelector("section");
      expect(section?.className).toContain("py-12");
      expect(section?.className).toContain("md:py-16");
    });

    it("renders with extra large spacing", () => {
      const { container } = render(
        <Section spacing="xl">
          <p>Content</p>
        </Section>
      );
      const section = container.querySelector("section");
      expect(section?.className).toContain("py-16");
      expect(section?.className).toContain("md:py-24");
    });
  });

  describe("Background", () => {
    it("renders with main background (default)", () => {
      const { container } = render(
        <Section>
          <p>Content</p>
        </Section>
      );
      const section = container.querySelector("section");
      expect(section?.className).toContain("bg-background-main");
    });

    it("renders with secondary background", () => {
      const { container } = render(
        <Section background="secondary">
          <p>Content</p>
        </Section>
      );
      const section = container.querySelector("section");
      expect(section?.className).toContain("bg-background-secondary");
    });
  });

  describe("Content Width Constraint", () => {
    it("constrains content width by default", () => {
      const { container } = render(
        <Section>
          <p>Content</p>
        </Section>
      );
      const innerDiv = container.querySelector("section > div");
      expect(innerDiv?.className).toContain("max-w-content");
      expect(innerDiv?.className).toContain("container");
      expect(innerDiv?.className).toContain("mx-auto");
    });

    it("allows full width when constrained is false", () => {
      const { container } = render(
        <Section constrained={false}>
          <p>Content</p>
        </Section>
      );
      const innerDiv = container.querySelector("section > div");
      expect(innerDiv?.className).toContain("w-full");
      expect(innerDiv?.className).not.toContain("max-w-content");
    });

    it("always includes horizontal padding", () => {
      const { container } = render(
        <Section>
          <p>Content</p>
        </Section>
      );
      const innerDiv = container.querySelector("section > div");
      expect(innerDiv?.className).toContain("px-4");
    });
  });

  describe("Accessibility", () => {
    it("supports aria-label", () => {
      render(
        <Section aria-label="Features section">
          <p>Content</p>
        </Section>
      );
      expect(screen.getByRole("region", { name: "Features section" })).toBeInTheDocument();
    });

    it("supports aria-labelledby", () => {
      const { container } = render(
        <Section aria-labelledby="section-heading">
          <h2 id="section-heading">Section Title</h2>
          <p>Content</p>
        </Section>
      );
      const section = container.querySelector("section");
      expect(section).toHaveAttribute("aria-labelledby", "section-heading");
    });
  });

  describe("Responsive Design", () => {
    it("has responsive padding classes", () => {
      const { container } = render(
        <Section spacing="lg">
          <p>Content</p>
        </Section>
      );
      const section = container.querySelector("section");
      // Should have both mobile and desktop padding
      expect(section?.className).toMatch(/py-\d+/);
      expect(section?.className).toMatch(/md:py-\d+/);
    });
  });

  describe("Combination of Props", () => {
    it("combines multiple props correctly", () => {
      const { container } = render(
        <Section
          spacing="lg"
          background="secondary"
          constrained={true}
          className="extra-class"
          id="combined-section"
        >
          <p>Content</p>
        </Section>
      );
      const section = container.querySelector("section");
      expect(section?.className).toContain("py-12");
      expect(section?.className).toContain("bg-background-secondary");
      expect(section?.className).toContain("extra-class");
      expect(section).toHaveAttribute("id", "combined-section");
    });
  });
});
