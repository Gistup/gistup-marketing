import React from "react";
import { render, screen } from "@testing-library/react";
import { FeaturesSection } from "../FeaturesSection";
import { FeaturesContent } from "@/content/landing";

const mockContent: FeaturesContent = {
  sectionTitle: "KEY FEATURES",
  features: [
    {
      id: "feature-1",
      title: "Feature One",
      description: "Description for feature one",
    },
    {
      id: "feature-2",
      title: "Feature Two",
      description: "Description for feature two",
    },
    {
      id: "feature-3",
      title: "Feature Three",
      description: "Description for feature three",
    },
  ],
};

describe("FeaturesSection", () => {
  describe("Rendering", () => {
    it("renders the section title correctly", () => {
      render(<FeaturesSection content={mockContent} />);
      expect(
        screen.getByRole("heading", { name: "KEY FEATURES", level: 2 })
      ).toBeInTheDocument();
    });

    it("renders all feature titles", () => {
      render(<FeaturesSection content={mockContent} />);
      expect(screen.getByText("Feature One")).toBeInTheDocument();
      expect(screen.getByText("Feature Two")).toBeInTheDocument();
      expect(screen.getByText("Feature Three")).toBeInTheDocument();
    });

    it("renders all feature descriptions", () => {
      render(<FeaturesSection content={mockContent} />);
      expect(
        screen.getByText("Description for feature one")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Description for feature two")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Description for feature three")
      ).toBeInTheDocument();
    });

    it("renders correct number of feature cards", () => {
      render(<FeaturesSection content={mockContent} />);
      const featureHeadings = screen.getAllByRole("heading", { level: 3 });
      expect(featureHeadings).toHaveLength(3);
    });
  });

  describe("Accessibility", () => {
    it("has proper section aria-labelledby", () => {
      render(<FeaturesSection content={mockContent} />);
      const section = screen.getByRole("region", {
        name: "KEY FEATURES",
      });
      expect(section).toBeInTheDocument();
    });

    it("has grid with aria-label", () => {
      const { container } = render(<FeaturesSection content={mockContent} />);
      const grid = container.querySelector('[aria-label="Key features"]');
      expect(grid).toBeInTheDocument();
    });
  });

  describe("Custom Styling", () => {
    it("applies custom className", () => {
      const { container } = render(
        <FeaturesSection content={mockContent} className="custom-class" />
      );
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });

  describe("Grid Layout", () => {
    it("uses 3-column grid", () => {
      const { container } = render(
        <FeaturesSection content={mockContent} />
      );
      const grid = container.querySelector("[class*='lg:grid-cols-3']");
      expect(grid).toBeInTheDocument();
    });
  });

  describe("Empty State", () => {
    it("handles empty features array", () => {
      const emptyContent: FeaturesContent = {
        sectionTitle: "KEY FEATURES",
        features: [],
      };
      render(<FeaturesSection content={emptyContent} />);
      expect(
        screen.getByRole("heading", { name: "KEY FEATURES" })
      ).toBeInTheDocument();
    });
  });
});
