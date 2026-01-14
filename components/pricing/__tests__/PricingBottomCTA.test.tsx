import React from "react";
import { render, screen } from "@testing-library/react";
import { PricingBottomCTA } from "../PricingBottomCTA";
import { PricingBottomCTAContent } from "@/content/pricing";

// Mock next/link
jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  MockLink.displayName = "MockLink";
  return MockLink;
});

const mockContent: PricingBottomCTAContent = {
  headline: "Ready to get started?",
  cta: {
    label: "Get Started",
    href: "/get-started",
  },
};

describe("PricingBottomCTA", () => {
  describe("Rendering", () => {
    it("renders the headline correctly", () => {
      render(<PricingBottomCTA content={mockContent} />);
      expect(
        screen.getByRole("heading", { name: "Ready to get started?", level: 2 })
      ).toBeInTheDocument();
    });

    it("renders the CTA button", () => {
      render(<PricingBottomCTA content={mockContent} />);
      expect(
        screen.getByRole("button", { name: "Get Started" })
      ).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      const { container } = render(
        <PricingBottomCTA content={mockContent} className="custom-class" />
      );
      const section = container.querySelector("section");
      expect(section).toHaveClass("custom-class");
    });
  });

  describe("Links", () => {
    it("CTA links to correct href", () => {
      render(<PricingBottomCTA content={mockContent} />);
      const link = screen.getByRole("link", { name: /get started/i });
      expect(link).toHaveAttribute("href", "/get-started");
    });
  });

  describe("Accessibility", () => {
    it("has proper section aria-label", () => {
      render(<PricingBottomCTA content={mockContent} />);
      expect(
        screen.getByRole("region", { name: "Call to action" })
      ).toBeInTheDocument();
    });

    it("uses semantic heading structure", () => {
      render(<PricingBottomCTA content={mockContent} />);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
    });

    it("CTA button has proper aria-label", () => {
      render(<PricingBottomCTA content={mockContent} />);
      expect(
        screen.getByRole("button", { name: "Get Started" })
      ).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("uses secondary background", () => {
      const { container } = render(<PricingBottomCTA content={mockContent} />);
      const section = container.querySelector("section");
      expect(section).toHaveClass("bg-background-secondary");
    });

    it("centers content", () => {
      const { container } = render(<PricingBottomCTA content={mockContent} />);
      const contentWrapper = container.querySelector(".text-center");
      expect(contentWrapper).toBeInTheDocument();
    });

    it("constrains content width", () => {
      const { container } = render(<PricingBottomCTA content={mockContent} />);
      const contentWrapper = container.querySelector(".max-w-2xl");
      expect(contentWrapper).toBeInTheDocument();
    });

    it("renders secondary button variant", () => {
      render(<PricingBottomCTA content={mockContent} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-transparent");
    });

    it("renders large button size", () => {
      render(<PricingBottomCTA content={mockContent} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("px-6");
      expect(button).toHaveClass("py-3");
    });
  });

  describe("Content Variations", () => {
    it("renders with different headline", () => {
      const customContent: PricingBottomCTAContent = {
        headline: "Start your journey today",
        cta: {
          label: "Sign Up",
          href: "/signup",
        },
      };
      render(<PricingBottomCTA content={customContent} />);
      expect(
        screen.getByRole("heading", { name: "Start your journey today" })
      ).toBeInTheDocument();
    });

    it("renders with different CTA label", () => {
      const customContent: PricingBottomCTAContent = {
        headline: "Ready?",
        cta: {
          label: "Try Free",
          href: "/free-trial",
        },
      };
      render(<PricingBottomCTA content={customContent} />);
      expect(
        screen.getByRole("button", { name: "Try Free" })
      ).toBeInTheDocument();
    });

    it("renders with different CTA href", () => {
      const customContent: PricingBottomCTAContent = {
        headline: "Ready?",
        cta: {
          label: "Contact Us",
          href: "/contact",
        },
      };
      render(<PricingBottomCTA content={customContent} />);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/contact");
    });
  });
});
