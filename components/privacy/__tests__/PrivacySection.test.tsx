import React from "react";
import { render, screen } from "@testing-library/react";
import { PrivacySection } from "../PrivacySection";
import type { PrivacySection as PrivacySectionType } from "@/content/privacy";

describe("PrivacySection", () => {
  const mockSection: PrivacySectionType = {
    id: "test-section",
    title: "Test Section Title",
    content: "This is the test section content with detailed information.",
  };

  describe("Rendering", () => {
    it("renders the section title", () => {
      render(<PrivacySection section={mockSection} />);
      expect(
        screen.getByRole("heading", { name: /Test Section Title/i })
      ).toBeInTheDocument();
    });

    it("renders the section content", () => {
      render(<PrivacySection section={mockSection} />);
      expect(
        screen.getByText(/This is the test section content/i)
      ).toBeInTheDocument();
    });

    it("renders title as h2 heading", () => {
      render(<PrivacySection section={mockSection} />);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveTextContent("Test Section Title");
    });

    it("renders as an article element", () => {
      render(<PrivacySection section={mockSection} />);
      const article = screen.getByRole("article");
      expect(article).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("has border styling", () => {
      render(<PrivacySection section={mockSection} />);
      const article = screen.getByRole("article");
      expect(article.className).toContain("border");
      expect(article.className).toContain("border-border");
    });

    it("has rounded corners", () => {
      render(<PrivacySection section={mockSection} />);
      const article = screen.getByRole("article");
      expect(article.className).toContain("rounded-lg");
    });

    it("has proper padding", () => {
      render(<PrivacySection section={mockSection} />);
      const article = screen.getByRole("article");
      expect(article.className).toContain("p-4");
    });

    it("applies custom className", () => {
      render(<PrivacySection section={mockSection} className="custom-class" />);
      const article = screen.getByRole("article");
      expect(article.className).toContain("custom-class");
    });

    it("title has italic styling", () => {
      render(<PrivacySection section={mockSection} />);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading.className).toContain("italic");
    });

    it("title has semibold font weight", () => {
      render(<PrivacySection section={mockSection} />);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading.className).toContain("font-semibold");
    });

    it("content has secondary text color", () => {
      render(<PrivacySection section={mockSection} />);
      const content = screen.getByText(/This is the test section content/i);
      expect(content.className).toContain("text-text-secondary");
    });
  });

  describe("Accessibility", () => {
    it("has proper id attribute", () => {
      render(<PrivacySection section={mockSection} />);
      const article = screen.getByRole("article");
      expect(article).toHaveAttribute("id", "test-section");
    });

    it("has aria-labelledby linking to heading", () => {
      render(<PrivacySection section={mockSection} />);
      const article = screen.getByRole("article");
      expect(article).toHaveAttribute(
        "aria-labelledby",
        "test-section-heading"
      );
    });

    it("heading has correct id for aria-labelledby", () => {
      render(<PrivacySection section={mockSection} />);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveAttribute("id", "test-section-heading");
    });

    it("content is accessible to screen readers", () => {
      render(<PrivacySection section={mockSection} />);
      const content = screen.getByText(/This is the test section content/i);
      expect(content).toBeVisible();
    });
  });

  describe("Content Variations", () => {
    it("handles long content", () => {
      const longSection: PrivacySectionType = {
        id: "long-section",
        title: "Long Content Section",
        content:
          "This is a very long content section that contains multiple sentences. " +
          "It should render properly without any issues. The content can span " +
          "multiple lines and should maintain proper formatting and readability.",
      };
      render(<PrivacySection section={longSection} />);
      expect(
        screen.getByText(/This is a very long content section/i)
      ).toBeInTheDocument();
    });

    it("handles special characters in title", () => {
      const specialSection: PrivacySectionType = {
        id: "special-section",
        title: "Cookies & Tracking",
        content: "Content about cookies.",
      };
      render(<PrivacySection section={specialSection} />);
      expect(
        screen.getByRole("heading", { name: /Cookies & Tracking/i })
      ).toBeInTheDocument();
    });
  });
});
