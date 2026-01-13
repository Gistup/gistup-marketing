import React from "react";
import { render, screen } from "@testing-library/react";
import { HowItWorksSection } from "../HowItWorksSection";
import { HowItWorksContent } from "@/content/landing";

const mockContent: HowItWorksContent = {
  sectionTitle: "HOW IT WORKS",
  steps: [
    {
      id: "step-1",
      stepNumber: 1,
      title: "First Step",
      description: "Description for first step",
    },
    {
      id: "step-2",
      stepNumber: 2,
      title: "Second Step",
      description: "Description for second step",
    },
    {
      id: "step-3",
      stepNumber: 3,
      title: "Third Step",
      description: "Description for third step",
    },
  ],
};

describe("HowItWorksSection", () => {
  describe("Rendering", () => {
    it("renders the section title correctly", () => {
      render(<HowItWorksSection content={mockContent} />);
      expect(
        screen.getByRole("heading", { name: "HOW IT WORKS", level: 2 })
      ).toBeInTheDocument();
    });

    it("renders all step titles", () => {
      render(<HowItWorksSection content={mockContent} />);
      expect(screen.getByText("First Step")).toBeInTheDocument();
      expect(screen.getByText("Second Step")).toBeInTheDocument();
      expect(screen.getByText("Third Step")).toBeInTheDocument();
    });

    it("renders step numbers", () => {
      render(<HowItWorksSection content={mockContent} />);
      expect(screen.getByText("1.")).toBeInTheDocument();
      expect(screen.getByText("2.")).toBeInTheDocument();
      expect(screen.getByText("3.")).toBeInTheDocument();
    });

    it("renders step descriptions", () => {
      render(<HowItWorksSection content={mockContent} />);
      // Descriptions appear in both desktop and mobile views
      const firstDescriptions = screen.getAllByText("Description for first step");
      const secondDescriptions = screen.getAllByText("Description for second step");
      const thirdDescriptions = screen.getAllByText("Description for third step");
      
      expect(firstDescriptions.length).toBeGreaterThan(0);
      expect(secondDescriptions.length).toBeGreaterThan(0);
      expect(thirdDescriptions.length).toBeGreaterThan(0);
    });
  });

  describe("Step Connectors", () => {
    it("renders connector arrows between steps", () => {
      const { container } = render(
        <HowItWorksSection content={mockContent} />
      );
      // Should have 2 connectors for 3 steps
      const svgArrows = container.querySelectorAll("svg[aria-hidden='true']");
      expect(svgArrows.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("Accessibility", () => {
    it("has proper section aria-labelledby", () => {
      render(<HowItWorksSection content={mockContent} />);
      const section = screen.getByRole("region", {
        name: "HOW IT WORKS",
      });
      expect(section).toBeInTheDocument();
    });
  });

  describe("Custom Styling", () => {
    it("applies custom className", () => {
      const { container } = render(
        <HowItWorksSection content={mockContent} className="custom-class" />
      );
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });

  describe("Mobile Layout", () => {
    it("renders mobile description cards", () => {
      const { container } = render(<HowItWorksSection content={mockContent} />);
      // Check for mobile step cards container
      const mobileContainer = container.querySelector(".lg\\:hidden");
      expect(mobileContainer).toBeInTheDocument();
    });

    it("renders step cards with titles", () => {
      render(<HowItWorksSection content={mockContent} />);
      // Check for h4 elements in mobile cards
      const stepHeadings = screen.getAllByRole("heading", { level: 4 });
      expect(stepHeadings).toHaveLength(3);
    });
  });
});
