import React from "react";
import { render, screen } from "@testing-library/react";
import { ProblemSection, SectionTitle } from "../ProblemSection";
import { ProblemContent } from "@/content/landing";

const mockContent: ProblemContent = {
  sectionTitle: "THE PROBLEM",
  statements: [
    {
      id: "problem-1",
      title: "Problem One",
      description: "Description for problem one",
    },
    {
      id: "problem-2",
      title: "Problem Two",
      description: "Description for problem two",
    },
    {
      id: "problem-3",
      title: "Problem Three",
      description: "Description for problem three",
    },
  ],
};

describe("ProblemSection", () => {
  describe("Rendering", () => {
    it("renders the section title correctly", () => {
      render(<ProblemSection content={mockContent} />);
      expect(
        screen.getByRole("heading", { name: "THE PROBLEM", level: 2 })
      ).toBeInTheDocument();
    });

    it("renders all problem statements", () => {
      render(<ProblemSection content={mockContent} />);
      expect(screen.getByText("Problem One")).toBeInTheDocument();
      expect(screen.getByText("Problem Two")).toBeInTheDocument();
      expect(screen.getByText("Problem Three")).toBeInTheDocument();
    });

    it("renders all problem descriptions", () => {
      render(<ProblemSection content={mockContent} />);
      expect(
        screen.getByText("Description for problem one")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Description for problem two")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Description for problem three")
      ).toBeInTheDocument();
    });

    it("renders correct number of cards", () => {
      render(<ProblemSection content={mockContent} />);
      const cards = screen.getAllByRole("heading", { level: 3 });
      expect(cards).toHaveLength(3);
    });
  });

  describe("Accessibility", () => {
    it("has proper section aria-labelledby", () => {
      render(<ProblemSection content={mockContent} />);
      const section = screen.getByRole("region", {
        name: "THE PROBLEM",
      });
      expect(section).toBeInTheDocument();
    });

    it("has grid with aria-label", () => {
      const { container } = render(<ProblemSection content={mockContent} />);
      const grid = container.querySelector('[aria-label="Problem statements"]');
      expect(grid).toBeInTheDocument();
    });
  });

  describe("Custom Styling", () => {
    it("applies custom className", () => {
      const { container } = render(
        <ProblemSection content={mockContent} className="custom-class" />
      );
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });
});

describe("SectionTitle", () => {
  it("renders the title text", () => {
    render(<SectionTitle title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders with custom id", () => {
    render(<SectionTitle title="Test Title" id="custom-id" />);
    const heading = screen.getByRole("heading", { name: "Test Title" });
    expect(heading).toHaveAttribute("id", "custom-id");
  });

  it("renders decorative lines", () => {
    const { container } = render(<SectionTitle title="Test Title" />);
    const lines = container.querySelectorAll(".h-px.bg-border");
    expect(lines).toHaveLength(2);
  });
});
