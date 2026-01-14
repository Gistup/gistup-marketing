import React from "react";
import { render, screen } from "@testing-library/react";
import { TermsHero } from "../TermsHero";
import type { TermsHeroContent } from "@/content/terms";

describe("TermsHero", () => {
  const mockContent: TermsHeroContent = {
    title: "Terms of Service",
    lastUpdated: "January 14, 2026",
  };

  describe("Rendering", () => {
    it("renders the title", () => {
      render(<TermsHero content={mockContent} />);
      expect(
        screen.getByRole("heading", { name: /Terms of Service/i })
      ).toBeInTheDocument();
    });

    it("renders the last updated date", () => {
      render(<TermsHero content={mockContent} />);
      expect(
        screen.getByText(/Last updated: January 14, 2026/i)
      ).toBeInTheDocument();
    });

    it("renders title as h1 heading", () => {
      render(<TermsHero content={mockContent} />);
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveTextContent("Terms of Service");
    });
  });

  describe("Styling", () => {
    it("has centered text alignment", () => {
      const { container } = render(<TermsHero content={mockContent} />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain("text-center");
    });

    it("applies custom className", () => {
      const { container } = render(
        <TermsHero content={mockContent} className="custom-class" />
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain("custom-class");
    });

    it("title has correct typography classes", () => {
      render(<TermsHero content={mockContent} />);
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading.className).toContain("text-h1");
      expect(heading.className).toContain("font-bold");
    });

    it("last updated has secondary text color", () => {
      render(<TermsHero content={mockContent} />);
      const lastUpdated = screen.getByText(/Last updated:/i);
      expect(lastUpdated.className).toContain("text-text-secondary");
    });
  });

  describe("Content Variations", () => {
    it("handles different title values", () => {
      const customContent: TermsHeroContent = {
        title: "Custom Terms Title",
        lastUpdated: "December 1, 2025",
      };
      render(<TermsHero content={customContent} />);
      expect(
        screen.getByRole("heading", { name: /Custom Terms Title/i })
      ).toBeInTheDocument();
    });

    it("handles different date formats", () => {
      const customContent: TermsHeroContent = {
        title: "Terms of Service",
        lastUpdated: "2026-01-14",
      };
      render(<TermsHero content={customContent} />);
      expect(
        screen.getByText(/Last updated: 2026-01-14/i)
      ).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper heading hierarchy", () => {
      render(<TermsHero content={mockContent} />);
      const h1 = screen.getByRole("heading", { level: 1 });
      expect(h1).toBeInTheDocument();
    });

    it("title is accessible to screen readers", () => {
      render(<TermsHero content={mockContent} />);
      const heading = screen.getByRole("heading", { name: /Terms of Service/i });
      expect(heading).toBeVisible();
    });
  });
});
