import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Card } from "../Card";

describe("Card", () => {
  describe("Rendering", () => {
    it("renders children correctly", () => {
      render(
        <Card>
          <p>Card content</p>
        </Card>
      );
      expect(screen.getByText("Card content")).toBeInTheDocument();
    });

    it("renders as a div by default", () => {
      const { container } = render(
        <Card>
          <p>Content</p>
        </Card>
      );
      const card = container.firstChild;
      expect(card?.nodeName).toBe("DIV");
    });

    it("renders with custom className", () => {
      const { container } = render(
        <Card className="custom-class">
          <p>Content</p>
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("custom-class");
    });
  });

  describe("Header and Footer", () => {
    it("renders header when provided", () => {
      render(
        <Card header={<h3>Card Header</h3>}>
          <p>Content</p>
        </Card>
      );
      expect(screen.getByText("Card Header")).toBeInTheDocument();
      expect(screen.getByTestId("card-header")).toBeInTheDocument();
    });

    it("renders footer when provided", () => {
      render(
        <Card footer={<button>Action</button>}>
          <p>Content</p>
        </Card>
      );
      expect(screen.getByText("Action")).toBeInTheDocument();
      expect(screen.getByTestId("card-footer")).toBeInTheDocument();
    });

    it("renders both header and footer", () => {
      render(
        <Card
          header={<h3>Header</h3>}
          footer={<button>Footer Action</button>}
        >
          <p>Body content</p>
        </Card>
      );
      expect(screen.getByTestId("card-header")).toBeInTheDocument();
      expect(screen.getByTestId("card-body")).toBeInTheDocument();
      expect(screen.getByTestId("card-footer")).toBeInTheDocument();
    });

    it("does not render header when not provided", () => {
      render(
        <Card>
          <p>Content</p>
        </Card>
      );
      expect(screen.queryByTestId("card-header")).not.toBeInTheDocument();
    });

    it("does not render footer when not provided", () => {
      render(
        <Card>
          <p>Content</p>
        </Card>
      );
      expect(screen.queryByTestId("card-footer")).not.toBeInTheDocument();
    });

    it("header has border bottom", () => {
      render(
        <Card header={<h3>Header</h3>}>
          <p>Content</p>
        </Card>
      );
      const header = screen.getByTestId("card-header");
      expect(header.className).toContain("border-b");
    });

    it("footer has border top", () => {
      render(
        <Card footer={<button>Action</button>}>
          <p>Content</p>
        </Card>
      );
      const footer = screen.getByTestId("card-footer");
      expect(footer.className).toContain("border-t");
    });
  });

  describe("Padding", () => {
    it("renders with no padding", () => {
      render(
        <Card padding="none">
          <p>Content</p>
        </Card>
      );
      const body = screen.getByTestId("card-body");
      expect(body.className).toContain("p-0");
    });

    it("renders with small padding", () => {
      render(
        <Card padding="sm">
          <p>Content</p>
        </Card>
      );
      const body = screen.getByTestId("card-body");
      expect(body.className).toContain("p-3");
      expect(body.className).toContain("md:p-4");
    });

    it("renders with medium padding (default)", () => {
      render(
        <Card>
          <p>Content</p>
        </Card>
      );
      const body = screen.getByTestId("card-body");
      expect(body.className).toContain("p-4");
      expect(body.className).toContain("md:p-6");
    });

    it("renders with large padding", () => {
      render(
        <Card padding="lg">
          <p>Content</p>
        </Card>
      );
      const body = screen.getByTestId("card-body");
      expect(body.className).toContain("p-6");
      expect(body.className).toContain("md:p-8");
    });

    it("applies padding to header and footer", () => {
      render(
        <Card
          padding="lg"
          header={<h3>Header</h3>}
          footer={<button>Action</button>}
        >
          <p>Content</p>
        </Card>
      );
      const header = screen.getByTestId("card-header");
      const footer = screen.getByTestId("card-footer");
      expect(header.className).toContain("p-6");
      expect(footer.className).toContain("p-6");
    });
  });

  describe("Border", () => {
    it("renders with border by default", () => {
      const { container } = render(
        <Card>
          <p>Content</p>
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("border");
      expect(card.className).toContain("border-border");
    });

    it("renders without border when bordered is false", () => {
      const { container } = render(
        <Card bordered={false}>
          <p>Content</p>
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card.className).not.toContain("border-border");
    });
  });

  describe("Shadow", () => {
    it("renders without shadow by default", () => {
      const { container } = render(
        <Card>
          <p>Content</p>
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card.className).not.toContain("shadow-sm");
    });

    it("renders with shadow when shadow is true", () => {
      const { container } = render(
        <Card shadow>
          <p>Content</p>
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("shadow-sm");
    });
  });

  describe("Interactive Card", () => {
    it("renders as button when interactive", () => {
      const { container } = render(
        <Card interactive onClick={() => {}}>
          <p>Content</p>
        </Card>
      );
      const card = container.firstChild;
      expect(card?.nodeName).toBe("BUTTON");
    });

    it("has button type when interactive", () => {
      render(
        <Card interactive onClick={() => {}}>
          <p>Content</p>
        </Card>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "button");
    });

    it("calls onClick when clicked", () => {
      const handleClick = jest.fn();
      render(
        <Card interactive onClick={handleClick}>
          <p>Content</p>
        </Card>
      );
      const button = screen.getByRole("button");
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("has interactive styles", () => {
      const { container } = render(
        <Card interactive onClick={() => {}}>
          <p>Content</p>
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("cursor-pointer");
      expect(card.className).toContain("hover:shadow-md");
    });

    it("has focus styles for keyboard accessibility", () => {
      const { container } = render(
        <Card interactive onClick={() => {}}>
          <p>Content</p>
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("focus:ring-2");
      expect(card.className).toContain("focus:ring-primary");
    });
  });

  describe("Accessibility", () => {
    it("supports aria-label", () => {
      render(
        <Card aria-label="Feature card">
          <p>Content</p>
        </Card>
      );
      const card = screen.getByLabelText("Feature card");
      expect(card).toBeInTheDocument();
    });

    it("supports aria-label on interactive cards", () => {
      render(
        <Card interactive onClick={() => {}} aria-label="Click for details">
          <p>Content</p>
        </Card>
      );
      const button = screen.getByRole("button", { name: "Click for details" });
      expect(button).toBeInTheDocument();
    });
  });

  describe("Base Styles", () => {
    it("has background color", () => {
      const { container } = render(
        <Card>
          <p>Content</p>
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("bg-background-main");
    });

    it("has rounded corners", () => {
      const { container } = render(
        <Card>
          <p>Content</p>
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("rounded-lg");
    });

    it("has overflow hidden", () => {
      const { container } = render(
        <Card>
          <p>Content</p>
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("overflow-hidden");
    });
  });

  describe("Combination of Props", () => {
    it("combines multiple props correctly", () => {
      const handleClick = jest.fn();
      const { container } = render(
        <Card
          header={<h3>Header</h3>}
          footer={<button>Action</button>}
          padding="lg"
          bordered={true}
          shadow={true}
          interactive
          onClick={handleClick}
          className="extra-class"
        >
          <p>Content</p>
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("border");
      expect(card.className).toContain("shadow-sm");
      expect(card.className).toContain("cursor-pointer");
      expect(card.className).toContain("extra-class");
      expect(screen.getByTestId("card-header")).toBeInTheDocument();
      expect(screen.getByTestId("card-footer")).toBeInTheDocument();
    });
  });
});
