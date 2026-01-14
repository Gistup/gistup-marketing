import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FAQAccordion } from "../FAQAccordion";
import type { FAQItem } from "@/content/faq";

describe("FAQAccordion", () => {
  const mockItems: FAQItem[] = [
    {
      id: "faq-1",
      question: "Question 1",
      answer: "Answer 1",
    },
    {
      id: "faq-2",
      question: "Question 2",
      answer: "Answer 2",
    },
    {
      id: "faq-3",
      question: "Question 3",
      answer: "Answer 3",
    },
  ];

  describe("Rendering", () => {
    it("renders all FAQ items", () => {
      render(<FAQAccordion items={mockItems} />);
      expect(screen.getByText("Question 1")).toBeInTheDocument();
      expect(screen.getByText("Question 2")).toBeInTheDocument();
      expect(screen.getByText("Question 3")).toBeInTheDocument();
    });

    it("renders with correct aria-label", () => {
      render(<FAQAccordion items={mockItems} />);
      const container = screen.getByRole("list", {
        name: "Frequently asked questions",
      });
      expect(container).toBeInTheDocument();
    });

    it("renders empty when no items provided", () => {
      render(<FAQAccordion items={[]} />);
      const container = screen.getByRole("list");
      expect(container.children.length).toBe(0);
    });

    it("applies custom className", () => {
      render(<FAQAccordion items={mockItems} className="custom-class" />);
      const container = screen.getByRole("list");
      expect(container.className).toContain("custom-class");
    });
  });

  describe("Single Expansion Mode (default)", () => {
    it("starts with all items collapsed", () => {
      render(<FAQAccordion items={mockItems} />);
      const buttons = screen.getAllByRole("button");
      buttons.forEach((button) => {
        expect(button).toHaveAttribute("aria-expanded", "false");
      });
    });

    it("expands item when clicked", () => {
      render(<FAQAccordion items={mockItems} />);
      const firstButton = screen.getByRole("button", { name: /Question 1/i });
      fireEvent.click(firstButton);
      expect(firstButton).toHaveAttribute("aria-expanded", "true");
    });

    it("collapses previously expanded item when another is clicked", () => {
      render(<FAQAccordion items={mockItems} />);
      const firstButton = screen.getByRole("button", { name: /Question 1/i });
      const secondButton = screen.getByRole("button", { name: /Question 2/i });

      fireEvent.click(firstButton);
      expect(firstButton).toHaveAttribute("aria-expanded", "true");

      fireEvent.click(secondButton);
      expect(firstButton).toHaveAttribute("aria-expanded", "false");
      expect(secondButton).toHaveAttribute("aria-expanded", "true");
    });

    it("collapses item when clicked again", () => {
      render(<FAQAccordion items={mockItems} />);
      const firstButton = screen.getByRole("button", { name: /Question 1/i });

      fireEvent.click(firstButton);
      expect(firstButton).toHaveAttribute("aria-expanded", "true");

      fireEvent.click(firstButton);
      expect(firstButton).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("Multiple Expansion Mode", () => {
    it("allows multiple items to be expanded", () => {
      render(<FAQAccordion items={mockItems} allowMultiple={true} />);
      const firstButton = screen.getByRole("button", { name: /Question 1/i });
      const secondButton = screen.getByRole("button", { name: /Question 2/i });

      fireEvent.click(firstButton);
      fireEvent.click(secondButton);

      expect(firstButton).toHaveAttribute("aria-expanded", "true");
      expect(secondButton).toHaveAttribute("aria-expanded", "true");
    });

    it("allows collapsing individual items", () => {
      render(<FAQAccordion items={mockItems} allowMultiple={true} />);
      const firstButton = screen.getByRole("button", { name: /Question 1/i });
      const secondButton = screen.getByRole("button", { name: /Question 2/i });

      fireEvent.click(firstButton);
      fireEvent.click(secondButton);
      fireEvent.click(firstButton);

      expect(firstButton).toHaveAttribute("aria-expanded", "false");
      expect(secondButton).toHaveAttribute("aria-expanded", "true");
    });
  });

  describe("Accessibility", () => {
    it("all items are keyboard accessible", () => {
      render(<FAQAccordion items={mockItems} />);
      const buttons = screen.getAllByRole("button");
      buttons.forEach((button) => {
        button.focus();
        expect(document.activeElement).toBe(button);
      });
    });

    it("expands item with Enter key", () => {
      render(<FAQAccordion items={mockItems} />);
      const firstButton = screen.getByRole("button", { name: /Question 1/i });
      fireEvent.keyDown(firstButton, { key: "Enter" });
      expect(firstButton).toHaveAttribute("aria-expanded", "true");
    });

    it("expands item with Space key", () => {
      render(<FAQAccordion items={mockItems} />);
      const firstButton = screen.getByRole("button", { name: /Question 1/i });
      fireEvent.keyDown(firstButton, { key: " " });
      expect(firstButton).toHaveAttribute("aria-expanded", "true");
    });
  });

  describe("Styling", () => {
    it("has flex column layout", () => {
      render(<FAQAccordion items={mockItems} />);
      const container = screen.getByRole("list");
      expect(container.className).toContain("flex");
      expect(container.className).toContain("flex-col");
    });

    it("has gap between items", () => {
      render(<FAQAccordion items={mockItems} />);
      const container = screen.getByRole("list");
      expect(container.className).toContain("gap-3");
    });
  });
});
