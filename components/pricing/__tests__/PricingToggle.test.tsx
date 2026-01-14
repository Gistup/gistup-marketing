import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { PricingToggle } from "../PricingToggle";
import { BillingPeriod } from "@/content/pricing";

describe("PricingToggle", () => {
  const defaultProps = {
    billingPeriod: "monthly" as BillingPeriod,
    onBillingPeriodChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders monthly and yearly buttons", () => {
      render(<PricingToggle {...defaultProps} />);
      expect(screen.getByRole("radio", { name: /monthly/i })).toBeInTheDocument();
      expect(screen.getByRole("radio", { name: /yearly/i })).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      const { container } = render(
        <PricingToggle {...defaultProps} className="custom-class" />
      );
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("custom-class");
    });

    it("displays savings percentage when provided", () => {
      render(<PricingToggle {...defaultProps} yearlySavingsPercent={20} />);
      expect(screen.getByText(/save 20%/i)).toBeInTheDocument();
    });

    it("does not display savings when percentage is 0", () => {
      render(<PricingToggle {...defaultProps} yearlySavingsPercent={0} />);
      expect(screen.queryByText(/save/i)).not.toBeInTheDocument();
    });

    it("does not display savings when percentage is not provided", () => {
      render(<PricingToggle {...defaultProps} />);
      expect(screen.queryByText(/save/i)).not.toBeInTheDocument();
    });
  });

  describe("Selection State", () => {
    it("shows monthly as selected when billingPeriod is monthly", () => {
      render(<PricingToggle {...defaultProps} billingPeriod="monthly" />);
      const monthlyButton = screen.getByRole("radio", { name: /monthly/i });
      const yearlyButton = screen.getByRole("radio", { name: /yearly/i });
      expect(monthlyButton).toHaveAttribute("aria-checked", "true");
      expect(yearlyButton).toHaveAttribute("aria-checked", "false");
    });

    it("shows yearly as selected when billingPeriod is yearly", () => {
      render(<PricingToggle {...defaultProps} billingPeriod="yearly" />);
      const monthlyButton = screen.getByRole("radio", { name: /monthly/i });
      const yearlyButton = screen.getByRole("radio", { name: /yearly/i });
      expect(monthlyButton).toHaveAttribute("aria-checked", "false");
      expect(yearlyButton).toHaveAttribute("aria-checked", "true");
    });

    it("applies active styles to selected button", () => {
      render(<PricingToggle {...defaultProps} billingPeriod="monthly" />);
      const monthlyButton = screen.getByRole("radio", { name: /monthly/i });
      expect(monthlyButton.className).toContain("bg-primary");
      expect(monthlyButton.className).toContain("text-text-inverse");
    });

    it("applies inactive styles to unselected button", () => {
      render(<PricingToggle {...defaultProps} billingPeriod="monthly" />);
      const yearlyButton = screen.getByRole("radio", { name: /yearly/i });
      expect(yearlyButton.className).toContain("bg-transparent");
    });
  });

  describe("Click Behavior", () => {
    it("calls onBillingPeriodChange with 'monthly' when monthly is clicked", () => {
      const handleChange = jest.fn();
      render(
        <PricingToggle
          billingPeriod="yearly"
          onBillingPeriodChange={handleChange}
        />
      );
      fireEvent.click(screen.getByRole("radio", { name: /monthly/i }));
      expect(handleChange).toHaveBeenCalledWith("monthly");
    });

    it("calls onBillingPeriodChange with 'yearly' when yearly is clicked", () => {
      const handleChange = jest.fn();
      render(
        <PricingToggle
          billingPeriod="monthly"
          onBillingPeriodChange={handleChange}
        />
      );
      fireEvent.click(screen.getByRole("radio", { name: /yearly/i }));
      expect(handleChange).toHaveBeenCalledWith("yearly");
    });

    it("calls onBillingPeriodChange even when clicking already selected option", () => {
      const handleChange = jest.fn();
      render(
        <PricingToggle
          billingPeriod="monthly"
          onBillingPeriodChange={handleChange}
        />
      );
      fireEvent.click(screen.getByRole("radio", { name: /monthly/i }));
      expect(handleChange).toHaveBeenCalledWith("monthly");
    });
  });

  describe("Accessibility", () => {
    it("has radiogroup role on container", () => {
      render(<PricingToggle {...defaultProps} />);
      expect(
        screen.getByRole("radiogroup", { name: /billing period selection/i })
      ).toBeInTheDocument();
    });

    it("buttons have radio role", () => {
      render(<PricingToggle {...defaultProps} />);
      const radios = screen.getAllByRole("radio");
      expect(radios).toHaveLength(2);
    });

    it("buttons have correct aria-checked attribute", () => {
      render(<PricingToggle {...defaultProps} billingPeriod="monthly" />);
      const monthlyButton = screen.getByRole("radio", { name: /monthly/i });
      expect(monthlyButton).toHaveAttribute("aria-checked", "true");
    });

    it("buttons are keyboard accessible", () => {
      render(<PricingToggle {...defaultProps} />);
      const monthlyButton = screen.getByRole("radio", { name: /monthly/i });
      monthlyButton.focus();
      expect(document.activeElement).toBe(monthlyButton);
    });

    it("has focus ring styles", () => {
      render(<PricingToggle {...defaultProps} />);
      const monthlyButton = screen.getByRole("radio", { name: /monthly/i });
      expect(monthlyButton.className).toContain("focus:ring-2");
      expect(monthlyButton.className).toContain("focus:ring-primary");
    });
  });
});
