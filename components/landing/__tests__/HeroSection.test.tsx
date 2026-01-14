import React from "react";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "../HeroSection";
import { HeroContent } from "@/content/landing";

// Mock next/link
jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

const mockContent: HeroContent = {
  headline: "Test Headline",
  subtext: "Test subtext description",
  primaryCTA: {
    label: "Primary Action",
    href: "/primary",
  },
  secondaryCTA: {
    label: "Secondary Action",
    href: "/secondary",
  },
  mediaAlt: "Test media description",
};

describe("HeroSection", () => {
  describe("Rendering", () => {
    it("renders the headline correctly", () => {
      render(<HeroSection content={mockContent} />);
      expect(
        screen.getByRole("heading", { name: "Test Headline", level: 1 })
      ).toBeInTheDocument();
    });

    it("renders the subtext correctly", () => {
      render(<HeroSection content={mockContent} />);
      expect(screen.getByText("Test subtext description")).toBeInTheDocument();
    });

    it("renders primary CTA button", () => {
      render(<HeroSection content={mockContent} />);
      expect(
        screen.getByRole("button", { name: "Primary Action" })
      ).toBeInTheDocument();
    });

    it("renders secondary CTA button", () => {
      render(<HeroSection content={mockContent} />);
      expect(
        screen.getByRole("button", { name: "Secondary Action" })
      ).toBeInTheDocument();
    });

    it("renders media placeholder with correct aria-label", () => {
      render(<HeroSection content={mockContent} />);
      expect(
        screen.getByRole("img", { name: "Test media description" })
      ).toBeInTheDocument();
    });

    it("renders animated example text", () => {
      render(<HeroSection content={mockContent} />);
      expect(screen.getByText("→ Animated Example")).toBeInTheDocument();
    });
  });

  describe("Links", () => {
    it("primary CTA links to correct href", () => {
      render(<HeroSection content={mockContent} />);
      const primaryLink = screen.getByRole("link", { name: /Primary Action/i });
      expect(primaryLink).toHaveAttribute("href", "/primary");
    });

    it("secondary CTA links to correct href", () => {
      render(<HeroSection content={mockContent} />);
      const secondaryLink = screen.getByRole("link", {
        name: /Secondary Action/i,
      });
      expect(secondaryLink).toHaveAttribute("href", "/secondary");
    });
  });

  describe("Accessibility", () => {
    it("has proper section aria-label", () => {
      render(<HeroSection content={mockContent} />);
      expect(
        screen.getByRole("region", { name: "Hero section" })
      ).toBeInTheDocument();
    });

    it("uses semantic heading structure", () => {
      render(<HeroSection content={mockContent} />);
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
    });
  });

  describe("Custom Styling", () => {
    it("applies custom className", () => {
      const { container } = render(
        <HeroSection content={mockContent} className="custom-class" />
      );
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });
});
