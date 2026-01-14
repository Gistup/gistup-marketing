import React from "react";
import { render, screen } from "@testing-library/react";
import { FeatureComparisonTable } from "../FeatureComparisonTable";
import { FeatureComparisonContent } from "@/content/pricing";

const mockContent: FeatureComparisonContent = {
  sectionTitle: "Compare Features",
  features: [
    {
      id: "feature-1",
      name: "AI Summaries",
      free: true,
      pro: true,
      business: true,
    },
    {
      id: "feature-2",
      name: "Audio Briefings",
      free: true,
      pro: true,
      business: true,
    },
    {
      id: "feature-3",
      name: "Unlimited Storage",
      free: false,
      pro: true,
      business: true,
    },
    {
      id: "feature-4",
      name: "Priority Support",
      free: false,
      pro: false,
      business: true,
    },
  ],
};

describe("FeatureComparisonTable", () => {
  describe("Rendering", () => {
    it("renders section title", () => {
      render(<FeatureComparisonTable content={mockContent} />);
      expect(
        screen.getByRole("heading", { name: "Compare Features", level: 2 })
      ).toBeInTheDocument();
    });

    it("renders all feature names", () => {
      render(<FeatureComparisonTable content={mockContent} />);
      // Multiple elements due to desktop table + mobile cards
      expect(screen.getAllByText("AI Summaries").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Audio Briefings").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Unlimited Storage").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Priority Support").length).toBeGreaterThan(0);
    });

    it("renders with custom className", () => {
      const { container } = render(
        <FeatureComparisonTable content={mockContent} className="custom-class" />
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });
  });

  describe("Desktop Table", () => {
    it("renders table element on desktop", () => {
      render(<FeatureComparisonTable content={mockContent} />);
      expect(
        screen.getByRole("table", { name: /feature comparison/i })
      ).toBeInTheDocument();
    });

    it("renders column headers for all plans", () => {
      render(<FeatureComparisonTable content={mockContent} />);
      expect(screen.getByRole("columnheader", { name: "Feature" })).toBeInTheDocument();
      expect(screen.getByRole("columnheader", { name: "Free" })).toBeInTheDocument();
      expect(screen.getByRole("columnheader", { name: "Pro" })).toBeInTheDocument();
      expect(screen.getByRole("columnheader", { name: "Business" })).toBeInTheDocument();
    });

    it("renders correct number of rows", () => {
      render(<FeatureComparisonTable content={mockContent} />);
      const rows = screen.getAllByRole("row");
      // 1 header row + 4 feature rows
      expect(rows).toHaveLength(5);
    });
  });

  describe("Feature Availability Icons", () => {
    it("renders check icon for available features", () => {
      const { container } = render(
        <FeatureComparisonTable content={mockContent} />
      );
      // AI Summaries is available in all plans
      const checkIcons = container.querySelectorAll("svg.text-status-success");
      expect(checkIcons.length).toBeGreaterThan(0);
    });

    it("renders cross icon for unavailable features", () => {
      const { container } = render(
        <FeatureComparisonTable content={mockContent} />
      );
      // Unlimited Storage is not available in Free
      const crossIcons = container.querySelectorAll("svg.text-text-muted");
      expect(crossIcons.length).toBeGreaterThan(0);
    });

    it("correctly shows feature availability for Free plan", () => {
      render(<FeatureComparisonTable content={mockContent} />);
      // AI Summaries should be available in Free (multiple elements due to desktop + mobile)
      const aiSummariesFree = screen.getAllByLabelText("AI Summaries is included in Free");
      expect(aiSummariesFree.length).toBeGreaterThan(0);
      // Unlimited Storage should not be available in Free
      const unlimitedStorageFree = screen.getAllByLabelText("Unlimited Storage is not included in Free");
      expect(unlimitedStorageFree.length).toBeGreaterThan(0);
    });

    it("correctly shows feature availability for Pro plan", () => {
      render(<FeatureComparisonTable content={mockContent} />);
      // Unlimited Storage should be available in Pro
      const unlimitedStoragePro = screen.getAllByLabelText("Unlimited Storage is included in Pro");
      expect(unlimitedStoragePro.length).toBeGreaterThan(0);
      // Priority Support should not be available in Pro
      const prioritySupportPro = screen.getAllByLabelText("Priority Support is not included in Pro");
      expect(prioritySupportPro.length).toBeGreaterThan(0);
    });

    it("correctly shows feature availability for Business plan", () => {
      render(<FeatureComparisonTable content={mockContent} />);
      // Priority Support should be available in Business
      const prioritySupportBusiness = screen.getAllByLabelText("Priority Support is included in Business");
      expect(prioritySupportBusiness.length).toBeGreaterThan(0);
    });
  });

  describe("Mobile Cards", () => {
    it("renders mobile cards with feature names", () => {
      render(<FeatureComparisonTable content={mockContent} />);
      // Mobile cards render h3 elements
      const featureHeadings = screen.getAllByRole("heading", { level: 3 });
      expect(featureHeadings.length).toBe(mockContent.features.length);
    });

    it("mobile cards show plan labels", () => {
      render(<FeatureComparisonTable content={mockContent} />);
      // Each mobile card should have Free, Pro, Business labels
      const freeLabels = screen.getAllByText("Free");
      const proLabels = screen.getAllByText("Pro");
      const businessLabels = screen.getAllByText("Business");
      // 1 header + 4 mobile cards = 5 Free labels
      expect(freeLabels.length).toBeGreaterThan(1);
      expect(proLabels.length).toBeGreaterThan(1);
      expect(businessLabels.length).toBeGreaterThan(1);
    });
  });

  describe("Accessibility", () => {
    it("table has proper aria-label", () => {
      render(<FeatureComparisonTable content={mockContent} />);
      expect(
        screen.getByRole("table", { name: /feature comparison across pricing plans/i })
      ).toBeInTheDocument();
    });

    it("column headers have proper scope", () => {
      render(<FeatureComparisonTable content={mockContent} />);
      const headers = screen.getAllByRole("columnheader");
      headers.forEach((header) => {
        expect(header).toHaveAttribute("scope", "col");
      });
    });

    it("icons are hidden from screen readers", () => {
      const { container } = render(
        <FeatureComparisonTable content={mockContent} />
      );
      const svgs = container.querySelectorAll("svg");
      svgs.forEach((svg) => {
        expect(svg).toHaveAttribute("aria-hidden", "true");
      });
    });

    it("availability indicators have descriptive aria-labels", () => {
      render(<FeatureComparisonTable content={mockContent} />);
      // Check that aria-labels describe the feature availability (multiple due to desktop + mobile)
      const aiSummariesLabels = screen.getAllByLabelText("AI Summaries is included in Free");
      expect(aiSummariesLabels.length).toBeGreaterThan(0);
    });
  });

  describe("Styling", () => {
    it("applies alternating row backgrounds", () => {
      const { container } = render(
        <FeatureComparisonTable content={mockContent} />
      );
      const rows = container.querySelectorAll("tbody tr");
      expect(rows[0]).toHaveClass("bg-background-main");
      expect(rows[1]).toHaveClass("bg-background-secondary");
    });

    it("applies border to rows", () => {
      const { container } = render(
        <FeatureComparisonTable content={mockContent} />
      );
      const rows = container.querySelectorAll("tbody tr");
      rows.forEach((row) => {
        expect(row).toHaveClass("border-b");
        expect(row).toHaveClass("border-border");
      });
    });
  });
});
