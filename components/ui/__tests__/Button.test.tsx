import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../Button";

describe("Button", () => {
  describe("Rendering", () => {
    it("renders children correctly", () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
    });

    it("renders with default props", () => {
      render(<Button>Default Button</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "button");
      expect(button).not.toBeDisabled();
    });

    it("renders with custom className", () => {
      render(<Button className="custom-class">Button</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toContain("custom-class");
    });
  });

  describe("Variants", () => {
    it("renders primary variant with correct styles", () => {
      render(<Button variant="primary">Primary</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toContain("bg-primary");
      expect(button.className).toContain("text-text-inverse");
    });

    it("renders secondary variant with correct styles", () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toContain("bg-transparent");
      expect(button.className).toContain("border");
      expect(button.className).toContain("text-text-primary");
    });
  });

  describe("Sizes", () => {
    it("renders small size with correct styles", () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toContain("px-3");
      expect(button.className).toContain("py-1.5");
      expect(button.className).toContain("text-small");
    });

    it("renders medium size with correct styles", () => {
      render(<Button size="md">Medium</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toContain("px-4");
      expect(button.className).toContain("py-2");
      expect(button.className).toContain("text-body");
    });

    it("renders large size with correct styles", () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toContain("px-6");
      expect(button.className).toContain("py-3");
    });
  });

  describe("Disabled State", () => {
    it("renders disabled button correctly", () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute("aria-disabled", "true");
    });

    it("applies disabled styles for primary variant", () => {
      render(<Button variant="primary" disabled>Disabled Primary</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toContain("disabled:bg-primary/50");
      expect(button.className).toContain("disabled:cursor-not-allowed");
    });

    it("applies disabled styles for secondary variant", () => {
      render(<Button variant="secondary" disabled>Disabled Secondary</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toContain("disabled:opacity-50");
      expect(button.className).toContain("disabled:cursor-not-allowed");
    });

    it("does not trigger onClick when disabled", () => {
      const handleClick = jest.fn();
      render(<Button disabled onClick={handleClick}>Disabled</Button>);
      const button = screen.getByRole("button");
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Click Behavior", () => {
    it("calls onClick handler when clicked", () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      const button = screen.getByRole("button");
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("passes event object to onClick handler", () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      const button = screen.getByRole("button");
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  describe("Button Types", () => {
    it("renders with type button by default", () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("renders with type submit when specified", () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("renders with type reset when specified", () => {
      render(<Button type="reset">Reset</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "reset");
    });
  });

  describe("Accessibility", () => {
    it("is keyboard accessible", () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Accessible</Button>);
      const button = screen.getByRole("button");
      button.focus();
      expect(document.activeElement).toBe(button);
    });

    it("supports aria-label", () => {
      render(<Button aria-label="Custom label">Button</Button>);
      const button = screen.getByRole("button", { name: "Custom label" });
      expect(button).toBeInTheDocument();
    });

    it("has focus ring styles", () => {
      render(<Button>Focus me</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toContain("focus:ring-2");
      expect(button.className).toContain("focus:ring-primary");
    });

    it("has transition for smooth interactions", () => {
      render(<Button>Transition</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toContain("transition-colors");
      expect(button.className).toContain("duration-200");
    });
  });

  describe("Additional HTML Attributes", () => {
    it("passes through additional HTML attributes", () => {
      render(<Button data-testid="custom-button" id="my-button">Button</Button>);
      const button = screen.getByTestId("custom-button");
      expect(button).toHaveAttribute("id", "my-button");
    });
  });
});
