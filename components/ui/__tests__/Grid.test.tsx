import React from "react";
import { render, screen } from "@testing-library/react";
import { Grid } from "../Grid";

describe("Grid", () => {
  describe("Rendering", () => {
    it("renders children correctly", () => {
      render(
        <Grid>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Grid>
      );
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
      expect(screen.getByText("Item 3")).toBeInTheDocument();
    });

    it("renders as a div element", () => {
      const { container } = render(
        <Grid>
          <div>Item</div>
        </Grid>
      );
      const grid = container.firstChild;
      expect(grid?.nodeName).toBe("DIV");
    });

    it("renders with custom className", () => {
      const { container } = render(
        <Grid className="custom-class">
          <div>Item</div>
        </Grid>
      );
      const grid = container.firstChild as HTMLElement;
      expect(grid.className).toContain("custom-class");
    });

    it("has grid display", () => {
      const { container } = render(
        <Grid>
          <div>Item</div>
        </Grid>
      );
      const grid = container.firstChild as HTMLElement;
      expect(grid.className).toContain("grid");
    });
  });

  describe("Columns", () => {
    it("renders 1 column grid", () => {
      const { container } = render(
        <Grid columns={1}>
          <div>Item</div>
        </Grid>
      );
      const grid = container.firstChild as HTMLElement;
      expect(grid.className).toContain("grid-cols-1");
    });

    it("renders 2 column grid with responsive breakpoints", () => {
      const { container } = render(
        <Grid columns={2}>
          <div>Item 1</div>
          <div>Item 2</div>
        </Grid>
      );
      const grid = container.firstChild as HTMLElement;
      expect(grid.className).toContain("grid-cols-1");
      expect(grid.className).toContain("md:grid-cols-2");
    });

    it("renders 3 column grid with responsive breakpoints (default)", () => {
      const { container } = render(
        <Grid>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Grid>
      );
      const grid = container.firstChild as HTMLElement;
      expect(grid.className).toContain("grid-cols-1");
      expect(grid.className).toContain("md:grid-cols-2");
      expect(grid.className).toContain("lg:grid-cols-3");
    });

    it("renders 4 column grid with responsive breakpoints", () => {
      const { container } = render(
        <Grid columns={4}>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
        </Grid>
      );
      const grid = container.firstChild as HTMLElement;
      expect(grid.className).toContain("grid-cols-1");
      expect(grid.className).toContain("md:grid-cols-2");
      expect(grid.className).toContain("lg:grid-cols-4");
    });
  });

  describe("Gap", () => {
    it("renders with no gap", () => {
      const { container } = render(
        <Grid gap="none">
          <div>Item</div>
        </Grid>
      );
      const grid = container.firstChild as HTMLElement;
      expect(grid.className).toContain("gap-0");
    });

    it("renders with small gap", () => {
      const { container } = render(
        <Grid gap="sm">
          <div>Item</div>
        </Grid>
      );
      const grid = container.firstChild as HTMLElement;
      expect(grid.className).toContain("gap-3");
      expect(grid.className).toContain("md:gap-4");
    });

    it("renders with medium gap (default)", () => {
      const { container } = render(
        <Grid>
          <div>Item</div>
        </Grid>
      );
      const grid = container.firstChild as HTMLElement;
      expect(grid.className).toContain("gap-4");
      expect(grid.className).toContain("md:gap-6");
    });

    it("renders with large gap", () => {
      const { container } = render(
        <Grid gap="lg">
          <div>Item</div>
        </Grid>
      );
      const grid = container.firstChild as HTMLElement;
      expect(grid.className).toContain("gap-6");
      expect(grid.className).toContain("md:gap-8");
    });
  });

  describe("Equal Height", () => {
    it("does not apply equal height by default", () => {
      const { container } = render(
        <Grid>
          <div>Item</div>
        </Grid>
      );
      const grid = container.firstChild as HTMLElement;
      expect(grid.className).not.toContain("items-stretch");
    });

    it("applies equal height when enabled", () => {
      const { container } = render(
        <Grid equalHeight>
          <div>Item 1</div>
          <div>Item 2 with more content</div>
        </Grid>
      );
      const grid = container.firstChild as HTMLElement;
      expect(grid.className).toContain("items-stretch");
    });
  });

  describe("Accessibility", () => {
    it("supports role attribute", () => {
      render(
        <Grid role="list">
          <div>Item</div>
        </Grid>
      );
      expect(screen.getByRole("list")).toBeInTheDocument();
    });

    it("supports aria-label", () => {
      render(
        <Grid role="list" aria-label="Feature list">
          <div>Item</div>
        </Grid>
      );
      expect(screen.getByRole("list", { name: "Feature list" })).toBeInTheDocument();
    });
  });

  describe("Responsive Design", () => {
    it("starts with single column on mobile", () => {
      const { container } = render(
        <Grid columns={4}>
          <div>Item</div>
        </Grid>
      );
      const grid = container.firstChild as HTMLElement;
      // All multi-column grids start with grid-cols-1 for mobile
      expect(grid.className).toContain("grid-cols-1");
    });

    it("has responsive gap classes", () => {
      const { container } = render(
        <Grid gap="md">
          <div>Item</div>
        </Grid>
      );
      const grid = container.firstChild as HTMLElement;
      // Should have both mobile and desktop gap
      expect(grid.className).toMatch(/gap-\d+/);
      expect(grid.className).toMatch(/md:gap-\d+/);
    });
  });

  describe("Combination of Props", () => {
    it("combines multiple props correctly", () => {
      const { container } = render(
        <Grid
          columns={4}
          gap="lg"
          equalHeight
          className="extra-class"
          role="list"
          aria-label="Items"
        >
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
        </Grid>
      );
      const grid = container.firstChild as HTMLElement;
      expect(grid.className).toContain("grid");
      expect(grid.className).toContain("lg:grid-cols-4");
      expect(grid.className).toContain("gap-6");
      expect(grid.className).toContain("items-stretch");
      expect(grid.className).toContain("extra-class");
      expect(grid).toHaveAttribute("role", "list");
      expect(grid).toHaveAttribute("aria-label", "Items");
    });
  });

  describe("Multiple Children", () => {
    it("renders multiple children correctly", () => {
      render(
        <Grid columns={3}>
          <div data-testid="item-1">Item 1</div>
          <div data-testid="item-2">Item 2</div>
          <div data-testid="item-3">Item 3</div>
          <div data-testid="item-4">Item 4</div>
          <div data-testid="item-5">Item 5</div>
          <div data-testid="item-6">Item 6</div>
        </Grid>
      );
      expect(screen.getByTestId("item-1")).toBeInTheDocument();
      expect(screen.getByTestId("item-2")).toBeInTheDocument();
      expect(screen.getByTestId("item-3")).toBeInTheDocument();
      expect(screen.getByTestId("item-4")).toBeInTheDocument();
      expect(screen.getByTestId("item-5")).toBeInTheDocument();
      expect(screen.getByTestId("item-6")).toBeInTheDocument();
    });

    it("handles single child", () => {
      render(
        <Grid columns={3}>
          <div data-testid="single-item">Only Item</div>
        </Grid>
      );
      expect(screen.getByTestId("single-item")).toBeInTheDocument();
    });
  });
});
