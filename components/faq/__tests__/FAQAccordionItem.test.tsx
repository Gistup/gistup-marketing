import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FAQAccordionItem } from "../FAQAccordionItem";

describe("FAQAccordionItem", () => {
  const defaultProps = {
    id: "faq-1",
    question: "What is GistUp?",
    answer: "GistUp is an intelligent bookmark manager.",
    isExpanded: false,
    onToggle: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders the question text", () => {
      render(<FAQAccordionItem {...defaultProps} />);
      expect(screen.getByText("What is GistUp?")).toBeInTheDocument();
    });

    it("renders the answer text", () => {
      render(<FAQAccordionItem {...defaultProps} isExpanded={true} />);
      expect(
        screen.getByText("GistUp is an intelligent bookmark manager.")
      ).toBeInTheDocument();
    });

    it("renders with correct test id", () => {
      render(<FAQAccordionItem {...defaultProps} />);
      expect(screen.getByTestId("faq-item-faq-1")).toBeInTheDocument();
    });

    it("renders the toggle button", () => {
      render(<FAQAccordionItem {...defaultProps} />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });
  });

  describe("Collapsed State", () => {
    it("has aria-expanded set to false when collapsed", () => {
      render(<FAQAccordionItem {...defaultProps} isExpanded={false} />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-expanded", "false");
    });

    it("hides the answer panel when collapsed", () => {
      render(<FAQAccordionItem {...defaultProps} isExpanded={false} />);
      const panel = screen.getByRole("region", { hidden: true });
      expect(panel).toHaveAttribute("hidden");
    });

    it("applies collapsed styles to icon", () => {
      render(<FAQAccordionItem {...defaultProps} isExpanded={false} />);
      const svg = screen.getByRole("button").querySelector("svg");
      expect(svg?.classList.contains("rotate-0")).toBe(true);
    });
  });

  describe("Expanded State", () => {
    it("has aria-expanded set to true when expanded", () => {
      render(<FAQAccordionItem {...defaultProps} isExpanded={true} />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-expanded", "true");
    });

    it("shows the answer panel when expanded", () => {
      render(<FAQAccordionItem {...defaultProps} isExpanded={true} />);
      const panel = screen.getByRole("region");
      expect(panel).not.toHaveAttribute("hidden");
    });

    it("applies expanded styles to icon", () => {
      render(<FAQAccordionItem {...defaultProps} isExpanded={true} />);
      const svg = screen.getByRole("button").querySelector("svg");
      expect(svg?.classList.contains("rotate-45")).toBe(true);
    });
  });

  describe("Click Behavior", () => {
    it("calls onToggle with correct id when clicked", () => {
      const handleToggle = jest.fn();
      render(
        <FAQAccordionItem {...defaultProps} onToggle={handleToggle} />
      );
      const button = screen.getByRole("button");
      fireEvent.click(button);
      expect(handleToggle).toHaveBeenCalledTimes(1);
      expect(handleToggle).toHaveBeenCalledWith("faq-1");
    });
  });

  describe("Keyboard Accessibility", () => {
    it("calls onToggle when Enter key is pressed", () => {
      const handleToggle = jest.fn();
      render(
        <FAQAccordionItem {...defaultProps} onToggle={handleToggle} />
      );
      const button = screen.getByRole("button");
      fireEvent.keyDown(button, { key: "Enter" });
      expect(handleToggle).toHaveBeenCalledTimes(1);
      expect(handleToggle).toHaveBeenCalledWith("faq-1");
    });

    it("calls onToggle when Space key is pressed", () => {
      const handleToggle = jest.fn();
      render(
        <FAQAccordionItem {...defaultProps} onToggle={handleToggle} />
      );
      const button = screen.getByRole("button");
      fireEvent.keyDown(button, { key: " " });
      expect(handleToggle).toHaveBeenCalledTimes(1);
      expect(handleToggle).toHaveBeenCalledWith("faq-1");
    });

    it("does not call onToggle for other keys", () => {
      const handleToggle = jest.fn();
      render(
        <FAQAccordionItem {...defaultProps} onToggle={handleToggle} />
      );
      const button = screen.getByRole("button");
      fireEvent.keyDown(button, { key: "Tab" });
      expect(handleToggle).not.toHaveBeenCalled();
    });

    it("is focusable", () => {
      render(<FAQAccordionItem {...defaultProps} />);
      const button = screen.getByRole("button");
      button.focus();
      expect(document.activeElement).toBe(button);
    });
  });

  describe("ARIA Attributes", () => {
    it("has correct aria-controls attribute", () => {
      render(<FAQAccordionItem {...defaultProps} />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-controls", "faq-panel-faq-1");
    });

    it("has correct id on button", () => {
      render(<FAQAccordionItem {...defaultProps} />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("id", "faq-heading-faq-1");
    });

    it("has correct aria-labelledby on panel", () => {
      render(<FAQAccordionItem {...defaultProps} isExpanded={true} />);
      const panel = screen.getByRole("region");
      expect(panel).toHaveAttribute("aria-labelledby", "faq-heading-faq-1");
    });

    it("has correct id on panel", () => {
      render(<FAQAccordionItem {...defaultProps} isExpanded={true} />);
      const panel = screen.getByRole("region");
      expect(panel).toHaveAttribute("id", "faq-panel-faq-1");
    });
  });

  describe("Styling", () => {
    it("has border styling", () => {
      render(<FAQAccordionItem {...defaultProps} />);
      const container = screen.getByTestId("faq-item-faq-1");
      expect(container.className).toContain("border");
      expect(container.className).toContain("border-border");
    });

    it("has focus ring styles on button", () => {
      render(<FAQAccordionItem {...defaultProps} />);
      const button = screen.getByRole("button");
      expect(button.className).toContain("focus:ring-2");
      expect(button.className).toContain("focus:ring-primary");
    });

    it("has transition styles", () => {
      render(<FAQAccordionItem {...defaultProps} />);
      const button = screen.getByRole("button");
      expect(button.className).toContain("transition-colors");
    });
  });
});
