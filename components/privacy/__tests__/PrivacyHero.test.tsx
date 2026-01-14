import React from "react";
import { render, screen } from "@testing-library/react";
import { PrivacyHero } from "../PrivacyHero";
import type { PrivacyHeroContent } from "@/content/privacy";

describe("PrivacyHero", () => {
  const mockContent: PrivacyHeroContent = {
    title: "Privacy Policy",
    lastUpdated: "January 14, 2026",
  };

  describe("Rendering", () => {
    it("renders the title", () => {
      render(<PrivacyHero content={mockContent} />);
      expect(
        screen.getByRole("heading", { name: /Privacy Policy/i })
      ).toBeInTheDocument();
    });

    it("renders the last updated date", () => {
      render(<PrivacyHero content={mockContent} />);
      expect(
        screen.getByText(/Last updated: January 14, 2026/i)
      ).toBeInTheDocument();
    });

    it("renders title as h1 heading", () => {
      render(<PrivacyHero content={mockContent} />);
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveTextContent("Privacy Policy");
    });
  });

  describe("Styling", () => {
    it("has centered text alignment", () => {
      const { container } = render(<PrivacyHero content={mockContent} />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain("text-center");
    });

    it("applies custom className", () => {
      const { container } = render(
        <PrivacyHero content={mockContent} className="custom-class" />
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain("custom-class");
    });

    it("title has correct typography classes", () => {
      render(<PrivacyHero content={mockContent} />);
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading.className).toContain("text-h1");
      expect(heading.className).toContain("font-bold");
    });

    it("last updated has secondary text color", () => {
      render(<PrivacyHero content={mockContent} />);
      const lastUpdated = screen.getByText(/Last updated:/i);
      expect(lastUpdated.className).toContain("text-text-secondary");
    });
  });

  describe("Content Variations", () => {
    it("handles different title values", () => {
      const customContent: PrivacyHeroContent = {
        title: "Custom Privacy Title",
        lastUpdated: "December 1, 2025",
      };
      render(<PrivacyHero content={customContent} />);
      expect(
        screen.getByRole("heading", { name: /Custom Privacy Title/i })
      ).toBeInTheDocument();
    });

    it("handles different date formats", () => {
      const customContent: PrivacyHeroContent = {
        title: "Privacy Policy",
        lastUpdated: "2026-01-14",
      };
      render(<PrivacyHero content={customContent} />);
      expect(
        screen.getByText(/Last updated: 2026-01-14/i)
      ).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper heading hierarchy", () => {
      render(<PrivacyHero content={mockContent} />);
      const h1 = screen.getByRole("heading", { level: 1 });
      expect(h1).toBeInTheDocument();
    });

    it("title is accessible to screen readers", () => {
      render(<PrivacyHero content={mockContent} />);
      const heading = screen.getByRole("heading", { name: /Privacy Policy/i });
      expect(heading).toBeVisible();
    });
  });
});
