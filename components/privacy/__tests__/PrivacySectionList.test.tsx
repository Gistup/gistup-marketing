import React from "react";
import { render, screen } from "@testing-library/react";
import { PrivacySectionList } from "../PrivacySectionList";
import type { PrivacySection } from "@/content/privacy";

describe("PrivacySectionList", () => {
  const mockSections: PrivacySection[] = [
    {
      id: "section-1",
      title: "Section One",
      content: "Content for section one.",
    },
    {
      id: "section-2",
      title: "Section Two",
      content: "Content for section two.",
    },
    {
      id: "section-3",
      title: "Section Three",
      content: "Content for section three.",
    },
  ];

  describe("Rendering", () => {
    it("renders all sections", () => {
      render(<PrivacySectionList sections={mockSections} />);
      expect(
        screen.getByRole("heading", { name: /Section One/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /Section Two/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /Section Three/i })
      ).toBeInTheDocument();
    });

    it("renders with correct aria-label", () => {
      render(<PrivacySectionList sections={mockSections} />);
      const container = screen.getByRole("list", {
        name: "Privacy policy sections",
      });
      expect(container).toBeInTheDocument();
    });

    it("renders empty when no sections provided", () => {
      render(<PrivacySectionList sections={[]} />);
      const container = screen.getByRole("list");
      expect(container.children.length).toBe(0);
    });

    it("renders correct number of list items", () => {
      render(<PrivacySectionList sections={mockSections} />);
      const listItems = screen.getAllByRole("listitem");
      expect(listItems.length).toBe(3);
    });
  });

  describe("Styling", () => {
    it("has flex column layout", () => {
      render(<PrivacySectionList sections={mockSections} />);
      const container = screen.getByRole("list");
      expect(container.className).toContain("flex");
      expect(container.className).toContain("flex-col");
    });

    it("has gap between items", () => {
      render(<PrivacySectionList sections={mockSections} />);
      const container = screen.getByRole("list");
      expect(container.className).toContain("gap-4");
    });

    it("applies custom className", () => {
      render(
        <PrivacySectionList sections={mockSections} className="custom-class" />
      );
      const container = screen.getByRole("list");
      expect(container.className).toContain("custom-class");
    });
  });

  describe("Accessibility", () => {
    it("has list role", () => {
      render(<PrivacySectionList sections={mockSections} />);
      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
    });

    it("each section is wrapped in listitem role", () => {
      render(<PrivacySectionList sections={mockSections} />);
      const listItems = screen.getAllByRole("listitem");
      expect(listItems.length).toBe(mockSections.length);
    });

    it("sections are keyboard navigable", () => {
      render(<PrivacySectionList sections={mockSections} />);
      const articles = screen.getAllByRole("article");
      articles.forEach((article) => {
        expect(article).toBeVisible();
      });
    });
  });

  describe("Content Ordering", () => {
    it("renders sections in correct order", () => {
      render(<PrivacySectionList sections={mockSections} />);
      const headings = screen.getAllByRole("heading", { level: 2 });
      expect(headings[0]).toHaveTextContent("Section One");
      expect(headings[1]).toHaveTextContent("Section Two");
      expect(headings[2]).toHaveTextContent("Section Three");
    });
  });

  describe("Integration with PrivacySection", () => {
    it("each section has proper id attribute", () => {
      render(<PrivacySectionList sections={mockSections} />);
      const articles = screen.getAllByRole("article");
      expect(articles[0]).toHaveAttribute("id", "section-1");
      expect(articles[1]).toHaveAttribute("id", "section-2");
      expect(articles[2]).toHaveAttribute("id", "section-3");
    });

    it("each section renders its content", () => {
      render(<PrivacySectionList sections={mockSections} />);
      expect(
        screen.getByText(/Content for section one/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Content for section two/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Content for section three/i)
      ).toBeInTheDocument();
    });
  });
});
