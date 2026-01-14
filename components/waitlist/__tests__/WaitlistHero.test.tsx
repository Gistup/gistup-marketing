import React from "react";
import { render, screen } from "@testing-library/react";
import { WaitlistHero } from "../WaitlistHero";
import type { WaitlistHeroContent } from "@/content/waitlist";

describe("WaitlistHero", () => {
  const defaultContent: WaitlistHeroContent = {
    title: "Get Early Access",
    subtitle: "Be the first to experience GistUp",
    description:
      "Join our waitlist to get early access to GistUp and be among the first to transform your bookmarks into daily audio briefings.",
  };

  describe("Rendering", () => {
    it("renders the title", () => {
      render(<WaitlistHero content={defaultContent} />);

      expect(
        screen.getByRole("heading", { name: "Get Early Access", level: 1 })
      ).toBeInTheDocument();
    });

    it("renders the subtitle", () => {
      render(<WaitlistHero content={defaultContent} />);

      expect(
        screen.getByText("Be the first to experience GistUp")
      ).toBeInTheDocument();
    });

    it("renders the description", () => {
      render(<WaitlistHero content={defaultContent} />);

      expect(
        screen.getByText(/Join our waitlist to get early access/)
      ).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <WaitlistHero content={defaultContent} className="custom-class" />
      );

      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("has text-center class by default", () => {
      const { container } = render(<WaitlistHero content={defaultContent} />);

      expect(container.firstChild).toHaveClass("text-center");
    });
  });

  describe("Typography", () => {
    it("renders title with correct heading level", () => {
      render(<WaitlistHero content={defaultContent} />);

      const title = screen.getByRole("heading", { level: 1 });
      expect(title).toHaveTextContent("Get Early Access");
    });

    it("applies correct styling classes to title", () => {
      render(<WaitlistHero content={defaultContent} />);

      const title = screen.getByRole("heading", { level: 1 });
      expect(title).toHaveClass("text-h1", "font-bold", "text-text-primary");
    });

    it("applies correct styling classes to subtitle", () => {
      render(<WaitlistHero content={defaultContent} />);

      const subtitle = screen.getByText("Be the first to experience GistUp");
      expect(subtitle).toHaveClass("text-h3", "font-medium", "text-text-secondary");
    });

    it("applies correct styling classes to description", () => {
      render(<WaitlistHero content={defaultContent} />);

      const description = screen.getByText(/Join our waitlist/);
      expect(description).toHaveClass("text-body", "text-text-muted");
    });
  });

  describe("Content variations", () => {
    it("renders with different content", () => {
      const customContent: WaitlistHeroContent = {
        title: "Custom Title",
        subtitle: "Custom Subtitle",
        description: "Custom description text.",
      };

      render(<WaitlistHero content={customContent} />);

      expect(
        screen.getByRole("heading", { name: "Custom Title" })
      ).toBeInTheDocument();
      expect(screen.getByText("Custom Subtitle")).toBeInTheDocument();
      expect(screen.getByText("Custom description text.")).toBeInTheDocument();
    });

    it("handles long content gracefully", () => {
      const longContent: WaitlistHeroContent = {
        title: "A Very Long Title That Might Wrap to Multiple Lines",
        subtitle: "A subtitle that is also quite long and descriptive",
        description:
          "A very long description that goes into great detail about what the waitlist is for and why users should sign up. This text should be constrained by the max-width class applied to it.",
      };

      render(<WaitlistHero content={longContent} />);

      expect(
        screen.getByRole("heading", { name: longContent.title })
      ).toBeInTheDocument();
      expect(screen.getByText(longContent.subtitle)).toBeInTheDocument();
      expect(screen.getByText(longContent.description)).toBeInTheDocument();
    });
  });

  describe("Layout", () => {
    it("description has max-width constraint", () => {
      render(<WaitlistHero content={defaultContent} />);

      const description = screen.getByText(/Join our waitlist/);
      expect(description).toHaveClass("max-w-2xl");
    });

    it("description is centered horizontally", () => {
      render(<WaitlistHero content={defaultContent} />);

      const description = screen.getByText(/Join our waitlist/);
      expect(description).toHaveClass("mx-auto");
    });
  });
});
