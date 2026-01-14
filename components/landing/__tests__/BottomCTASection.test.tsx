import React from "react";
import { render, screen } from "@testing-library/react";
import { BottomCTASection } from "../BottomCTASection";
import { BottomCTAContent } from "@/content/landing";

// Mock next/link
jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

const mockContent: BottomCTAContent = {
  headline: "Ready to Get Started?",
  subtext: "Join thousands of users today.",
  primaryCTA: {
    label: "Sign Up Now",
    href: "/signup",
  },
};

describe("BottomCTASection", () => {
  describe("Rendering", () => {
    it("renders the headline correctly", () => {
      render(<BottomCTASection content={mockContent} />);
      expect(
        screen.getByRole("heading", { name: "Ready to Get Started?", level: 2 })
      ).toBeInTheDocument();
    });

    it("renders the subtext correctly", () => {
      render(<BottomCTASection content={mockContent} />);
      expect(
        screen.getByText("Join thousands of users today.")
      ).toBeInTheDocument();
    });

    it("renders the CTA button", () => {
      render(<BottomCTASection content={mockContent} />);
      expect(
        screen.getByRole("button", { name: "Sign Up Now" })
      ).toBeInTheDocument();
    });
  });

  describe("Links", () => {
    it("CTA links to correct href", () => {
      render(<BottomCTASection content={mockContent} />);
      const link = screen.getByRole("link", { name: /Sign Up Now/i });
      expect(link).toHaveAttribute("href", "/signup");
    });
  });

  describe("Accessibility", () => {
    it("has proper section aria-label", () => {
      render(<BottomCTASection content={mockContent} />);
      expect(
        screen.getByRole("region", { name: "Call to action" })
      ).toBeInTheDocument();
    });

    it("uses semantic heading structure", () => {
      render(<BottomCTASection content={mockContent} />);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
    });
  });

  describe("Custom Styling", () => {
    it("applies custom className", () => {
      const { container } = render(
        <BottomCTASection content={mockContent} className="custom-class" />
      );
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });

  describe("Background", () => {
    it("uses secondary background", () => {
      const { container } = render(
        <BottomCTASection content={mockContent} />
      );
      const section = container.querySelector("section");
      expect(section?.className).toContain("bg-background-secondary");
    });
  });

  describe("Layout", () => {
    it("centers content", () => {
      const { container } = render(
        <BottomCTASection content={mockContent} />
      );
      const contentWrapper = container.querySelector(".text-center");
      expect(contentWrapper).toBeInTheDocument();
    });

    it("constrains content width", () => {
      const { container } = render(
        <BottomCTASection content={mockContent} />
      );
      const contentWrapper = container.querySelector(".max-w-2xl");
      expect(contentWrapper).toBeInTheDocument();
    });
  });
});
