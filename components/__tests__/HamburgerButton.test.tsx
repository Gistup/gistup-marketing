import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { HamburgerButton } from "../HamburgerButton";

describe("HamburgerButton", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it("renders correctly when closed", () => {
    render(<HamburgerButton isOpen={false} onClick={mockOnClick} />);

    const button = screen.getByRole("button", { name: /open navigation menu/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-controls", "mobile-navigation");
  });

  it("renders correctly when open", () => {
    render(<HamburgerButton isOpen={true} onClick={mockOnClick} />);

    const button = screen.getByRole("button", { name: /close navigation menu/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("calls onClick when clicked", () => {
    render(<HamburgerButton isOpen={false} onClick={mockOnClick} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("is keyboard accessible", () => {
    render(<HamburgerButton isOpen={false} onClick={mockOnClick} />);

    const button = screen.getByRole("button");
    button.focus();

    expect(document.activeElement).toBe(button);

    fireEvent.keyDown(button, { key: "Enter" });
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });

  it("applies custom className", () => {
    render(
      <HamburgerButton
        isOpen={false}
        onClick={mockOnClick}
        className="custom-class"
      />
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("has visible focus state", () => {
    render(<HamburgerButton isOpen={false} onClick={mockOnClick} />);

    const button = screen.getByRole("button");
    // Check that focus ring classes are present
    expect(button.className).toContain("focus:ring-2");
    expect(button.className).toContain("focus:ring-primary");
  });

  it("contains three span elements for hamburger lines", () => {
    const { container } = render(
      <HamburgerButton isOpen={false} onClick={mockOnClick} />
    );

    // The hamburger icon has 3 lines (spans)
    const lines = container.querySelectorAll("span.block");
    expect(lines.length).toBe(3);
  });

  it("transforms to X when open", () => {
    const { container } = render(
      <HamburgerButton isOpen={true} onClick={mockOnClick} />
    );

    const lines = container.querySelectorAll("span.block");
    // Check that rotation classes are applied when open
    expect(lines[0].className).toContain("rotate-45");
    expect(lines[1].className).toContain("opacity-0");
    expect(lines[2].className).toContain("-rotate-45");
  });
});
