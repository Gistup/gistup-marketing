import React from "react";
import { render, screen } from "@testing-library/react";
import { VideoDemoSection } from "../VideoDemoSection";
import { VideoDemoContent } from "@/content/landing";

const mockContent: VideoDemoContent = {
  sectionTitle: "See GistUp in Action",
  buttonLabel: "Play Video",
  videoUrl: "https://example.com/video",
  posterAlt: "Video demonstration placeholder",
};

describe("VideoDemoSection", () => {
  describe("Rendering", () => {
    it("renders the play button with correct label", () => {
      render(<VideoDemoSection content={mockContent} />);
      expect(
        screen.getByRole("button", { name: "Play Play Video" })
      ).toBeInTheDocument();
    });

    it("renders video placeholder with correct aria-label", () => {
      render(<VideoDemoSection content={mockContent} />);
      expect(
        screen.getByRole("img", { name: "Video demonstration placeholder" })
      ).toBeInTheDocument();
    });

    it("renders the button text", () => {
      render(<VideoDemoSection content={mockContent} />);
      expect(screen.getByText("Play Video")).toBeInTheDocument();
    });
  });

  describe("Section Attributes", () => {
    it("has correct id for anchor linking", () => {
      const { container } = render(
        <VideoDemoSection content={mockContent} />
      );
      const section = container.querySelector("#video-demo");
      expect(section).toBeInTheDocument();
    });

    it("has proper aria-label", () => {
      render(<VideoDemoSection content={mockContent} />);
      expect(
        screen.getByRole("region", { name: "Video demonstration" })
      ).toBeInTheDocument();
    });
  });

  describe("Visual Elements", () => {
    it("renders placeholder SVG", () => {
      const { container } = render(
        <VideoDemoSection content={mockContent} />
      );
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("has aspect ratio container", () => {
      const { container } = render(
        <VideoDemoSection content={mockContent} />
      );
      const aspectContainer = container.querySelector(".aspect-video");
      expect(aspectContainer).toBeInTheDocument();
    });
  });

  describe("Custom Styling", () => {
    it("applies custom className", () => {
      const { container } = render(
        <VideoDemoSection content={mockContent} className="custom-class" />
      );
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });

  describe("Background", () => {
    it("uses secondary background", () => {
      const { container } = render(
        <VideoDemoSection content={mockContent} />
      );
      const section = container.querySelector("section");
      expect(section?.className).toContain("bg-background-secondary");
    });
  });
});
