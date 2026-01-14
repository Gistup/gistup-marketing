import React from "react";
import { render, screen } from "@testing-library/react";
import { TermsSection } from "../TermsSection";
import type { TermsSection as TermsSectionType } from "@/content/terms";

describe("TermsSection", () => {
  const mockSection: TermsSectionType = {
    id: "test-section",
    title: "Test Section Title",
    content: "This is the test section content with detailed information.",
  };

  describe("Rendering", () => {
    it("renders the section title", () => {
      render(<TermsSection section={mockSection} />);
      expect(
        screen.getByRole("heading", { name: /Test Section Title/i })
      ).toBeInTheDocument();
    });

    it("renders the section content", () => {
      render(<TermsSection section={mockSection} />);
      expect(
        screen.getByText(/This is the test section content/i)
      ).toBeInTheDocument();
    });

    it("renders title as h2 heading", () => {
      render(<TermsSection section={mockSection} />);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveTextContent("Test Section Title");
    });

    it("renders as an article element", () => {
      render(<TermsSection section={mockSection} />);
      const article = screen.getByRole("article");
      expect(article).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("has border styling", () => {
      render(<TermsSection section={mockSection} />);
      const article = screen.getByRole("article");
      expect(article.className).toContain("border");
      expect(article.className).toContain("border-border");
    });

    it("has rounded corners", () => {
      render(<TermsSection section={mockSection} />);
      const article = screen.getByRole("article");
      expect(article.className).toContain("rounded-lg");
    });

    it("has proper padding", () => {
      render(<TermsSection section={mockSection} />);
      const article = screen.getByRole("article");
      expect(article.className).toContain("p-4");
    });

    it("applies custom className", () => {
      render(<TermsSection section={mockSection} className="custom-class" />);
      const article = screen.getByRole("article");
      expect(article.className).toContain("custom-class");
    });

    it("title has italic styling", () => {
      render(<TermsSection section={mockSection} />);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading.className).toContain("italic");
    });

    it("title has semibold font weight", () => {
      render(<TermsSection section={mockSection} />);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading.className).toContain("font-semibold");
    });

    it("content has secondary text color", () => {
      render(<TermsSection section={mockSection} />);
      const content = screen.getByText(/This is the test section content/i);
      expect(content.className).toContain("text-text-secondary");
    });
  });

  describe("Accessibility", () => {
    it("has proper id attribute", () => {
      render(<TermsSection section={mockSection} />);
      const article = screen.getByRole("article");
      expect(article).toHaveAttribute("id", "test-section");
    });

    it("has aria-labelledby linking to heading", () => {
      render(<TermsSection section={mockSection} />);
      const article = screen.getByRole("article");
      expect(article).toHaveAttribute(
        "aria-labelledby",
        "test-section-heading"
      );
    });

    it("heading has correct id for aria-labelledby", () => {
      render(<TermsSection section={mockSection} />);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveAttribute("id", "test-section-heading");
    });

    it("content is accessible to screen readers", () => {
      render(<TermsSection section={mockSection} />);
      const content = screen.getByText(/This is the test section content/i);
      expect(content).toBeVisible();
    });
  });

  describe("Content Variations", () => {
    it("handles long content", () => {
      const longSection: TermsSectionType = {
        id: "long-section",
        title: "Long Content Section",
        content:
          "This is a very long content section that contains multiple sentences. " +
          "It should render properly without any issues. The content can span " +
          "multiple lines and should maintain proper formatting and readability.",
      };
      render(<TermsSection section={longSection} />);
      expect(
        screen.getByText(/This is a very long content section/i)
      ).toBeInTheDocument();
    });

    it("handles special characters in title", () => {
      const specialSection: TermsSectionType = {
        id: "special-section",
        title: "Limitation of Liability",
        content: "Content about liability limitations.",
      };
      render(<TermsSection section={specialSection} />);
      expect(
        screen.getByRole("heading", { name: /Limitation of Liability/i })
      ).toBeInTheDocument();
    });
  });
});
