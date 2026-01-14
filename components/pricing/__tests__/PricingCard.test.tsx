import React from "react";
import { render, screen } from "@testing-library/react";
import { PricingCard } from "../PricingCard";
import { PricingTier } from "@/content/pricing";

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

const mockFreeTier: PricingTier = {
  id: "free",
  name: "Free",
  description: "Get started with the basics",
  monthlyPrice: 0,
  yearlyPrice: 0,
  features: [
    { id: "free-1", text: "Feature 1" },
    { id: "free-2", text: "Feature 2" },
  ],
  cta: {
    label: "Get Started",
    href: "/get-started",
  },
};

const mockProTier: PricingTier = {
  id: "pro",
  name: "Pro",
  description: "For power users",
  monthlyPrice: 8,
  yearlyPrice: 6.4,
  features: [
    { id: "pro-1", text: "Pro Feature 1" },
    { id: "pro-2", text: "Pro Feature 2" },
  ],
  cta: {
    label: "Start Free Trial",
    href: "/get-started?plan=pro",
  },
  highlighted: true,
};

const mockBusinessTier: PricingTier = {
  id: "business",
  name: "Business",
  description: "For teams and enterprises",
  monthlyPrice: null,
  yearlyPrice: null,
  priceLabel: "Custom",
  features: [
    { id: "biz-1", text: "Business Feature 1" },
    { id: "biz-2", text: "Business Feature 2" },
  ],
  cta: {
    label: "Contact Sales",
    href: "/contact",
  },
};

describe("PricingCard", () => {
  describe("Rendering", () => {
    it("renders tier name correctly", () => {
      render(<PricingCard tier={mockFreeTier} billingPeriod="monthly" />);
      expect(
        screen.getByRole("heading", { name: "Free", level: 3 })
      ).toBeInTheDocument();
    });

    it("renders tier description when provided", () => {
      render(<PricingCard tier={mockFreeTier} billingPeriod="monthly" />);
      expect(screen.getByText("Get started with the basics")).toBeInTheDocument();
    });

    it("renders CTA button with correct label", () => {
      render(<PricingCard tier={mockFreeTier} billingPeriod="monthly" />);
      expect(
        screen.getByRole("button", { name: /get started for free plan/i })
      ).toBeInTheDocument();
    });

    it("renders all features", () => {
      render(<PricingCard tier={mockFreeTier} billingPeriod="monthly" />);
      expect(screen.getByText("Feature 1")).toBeInTheDocument();
      expect(screen.getByText("Feature 2")).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      const { container } = render(
        <PricingCard
          tier={mockFreeTier}
          billingPeriod="monthly"
          className="custom-class"
        />
      );
      const card = container.firstChild;
      expect(card).toHaveClass("custom-class");
    });
  });

  describe("Price Display", () => {
    it("displays $0 for free tier", () => {
      render(<PricingCard tier={mockFreeTier} billingPeriod="monthly" />);
      expect(screen.getByText("$0")).toBeInTheDocument();
    });

    it("displays monthly price when billing period is monthly", () => {
      render(<PricingCard tier={mockProTier} billingPeriod="monthly" />);
      expect(screen.getByText("$8")).toBeInTheDocument();
    });

    it("displays yearly price when billing period is yearly", () => {
      render(<PricingCard tier={mockProTier} billingPeriod="yearly" />);
      expect(screen.getByText("$6.4")).toBeInTheDocument();
    });

    it("displays custom price label for business tier", () => {
      render(<PricingCard tier={mockBusinessTier} billingPeriod="monthly" />);
      expect(screen.getByText("Custom")).toBeInTheDocument();
    });

    it("displays price suffix for paid tiers", () => {
      render(<PricingCard tier={mockProTier} billingPeriod="monthly" />);
      expect(screen.getByText("/ mo")).toBeInTheDocument();
    });

    it("does not display price suffix for free tier", () => {
      render(<PricingCard tier={mockFreeTier} billingPeriod="monthly" />);
      expect(screen.queryByText("/ mo")).not.toBeInTheDocument();
    });

    it("does not display price suffix for custom pricing", () => {
      render(<PricingCard tier={mockBusinessTier} billingPeriod="monthly" />);
      expect(screen.queryByText("/ mo")).not.toBeInTheDocument();
    });
  });

  describe("Highlighted State", () => {
    it("applies highlight styles when tier is highlighted", () => {
      const { container } = render(
        <PricingCard tier={mockProTier} billingPeriod="monthly" />
      );
      const card = container.firstChild;
      expect(card).toHaveClass("border-primary");
      expect(card).toHaveClass("ring-2");
    });

    it("does not apply highlight styles when tier is not highlighted", () => {
      const { container } = render(
        <PricingCard tier={mockFreeTier} billingPeriod="monthly" />
      );
      const card = container.firstChild;
      expect(card).not.toHaveClass("border-primary");
      expect(card).not.toHaveClass("ring-2");
    });

    it("renders primary button for highlighted tier", () => {
      render(<PricingCard tier={mockProTier} billingPeriod="monthly" />);
      const button = screen.getByRole("button");
      expect(button.className).toContain("bg-primary");
    });

    it("renders secondary button for non-highlighted tier", () => {
      render(<PricingCard tier={mockFreeTier} billingPeriod="monthly" />);
      const button = screen.getByRole("button");
      expect(button.className).toContain("bg-transparent");
    });
  });

  describe("Links", () => {
    it("CTA links to correct href", () => {
      render(<PricingCard tier={mockFreeTier} billingPeriod="monthly" />);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/get-started");
    });

    it("Pro tier CTA links to correct href with plan parameter", () => {
      render(<PricingCard tier={mockProTier} billingPeriod="monthly" />);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/get-started?plan=pro");
    });

    it("Business tier CTA links to contact page", () => {
      render(<PricingCard tier={mockBusinessTier} billingPeriod="monthly" />);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/contact");
    });
  });

  describe("Accessibility", () => {
    it("has proper aria-label on card", () => {
      render(<PricingCard tier={mockFreeTier} billingPeriod="monthly" />);
      expect(
        screen.getByLabelText("Free pricing plan")
      ).toBeInTheDocument();
    });

    it("has proper aria-label on CTA button", () => {
      render(<PricingCard tier={mockFreeTier} billingPeriod="monthly" />);
      expect(
        screen.getByRole("button", { name: /get started for free plan/i })
      ).toBeInTheDocument();
    });

    it("features list has proper aria-label", () => {
      render(<PricingCard tier={mockFreeTier} billingPeriod="monthly" />);
      expect(screen.getByRole("list", { name: /free features/i })).toBeInTheDocument();
    });

    it("uses semantic heading for tier name", () => {
      render(<PricingCard tier={mockFreeTier} billingPeriod="monthly" />);
      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toHaveTextContent("Free");
    });

    it("check icons are hidden from screen readers", () => {
      const { container } = render(
        <PricingCard tier={mockFreeTier} billingPeriod="monthly" />
      );
      const svgs = container.querySelectorAll("svg");
      svgs.forEach((svg) => {
        expect(svg).toHaveAttribute("aria-hidden", "true");
      });
    });
  });
});
