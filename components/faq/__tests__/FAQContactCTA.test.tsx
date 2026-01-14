import React from "react";
import { render, screen } from "@testing-library/react";
import { FAQContactCTA } from "../FAQContactCTA";
import type { FAQContactCTAContent } from "@/content/faq";

// Mock next/link
jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
  MockLink.displayName = "MockLink";
  return MockLink;
});

describe("FAQContactCTA", () => {
  const defaultContent: FAQContactCTAContent = {
    headline: "Still have questions?",
    cta: {
      label: "Contact Us",
      href: "/contact",
    },
  };

  describe("Rendering", () => {
    it("renders the headline text", () => {
      render(<FAQContactCTA content={defaultContent} />);
      expect(screen.getByText("Still have questions?")).toBeInTheDocument();
    });

    it("renders the CTA button", () => {
      render(<FAQContactCTA content={defaultContent} />);
      expect(
        screen.getByRole("button", { name: "Contact Us" })
      ).toBeInTheDocument();
    });

    it("renders with correct href", () => {
      render(<FAQContactCTA content={defaultContent} />);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/contact");
    });

    it("applies custom className", () => {
      const { container } = render(
        <FAQContactCTA content={defaultContent} className="custom-class" />
      );
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("custom-class");
    });
  });

  describe("Content Variations", () => {
    it("renders different headline text", () => {
      const customContent: FAQContactCTAContent = {
        headline: "Need more help?",
        cta: {
          label: "Get Support",
          href: "/support",
        },
      };
      render(<FAQContactCTA content={customContent} />);
      expect(screen.getByText("Need more help?")).toBeInTheDocument();
    });

    it("renders different CTA label", () => {
      const customContent: FAQContactCTAContent = {
        headline: "Questions?",
        cta: {
          label: "Email Us",
          href: "/email",
        },
      };
      render(<FAQContactCTA content={customContent} />);
      expect(
        screen.getByRole("button", { name: "Email Us" })
      ).toBeInTheDocument();
    });

    it("renders different CTA href", () => {
      const customContent: FAQContactCTAContent = {
        headline: "Questions?",
        cta: {
          label: "Support",
          href: "/help-center",
        },
      };
      render(<FAQContactCTA content={customContent} />);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/help-center");
    });
  });

  describe("Accessibility", () => {
    it("has correct role", () => {
      render(<FAQContactCTA content={defaultContent} />);
      expect(
        screen.getByRole("complementary", { name: "Contact support" })
      ).toBeInTheDocument();
    });

    it("has aria-label on container", () => {
      render(<FAQContactCTA content={defaultContent} />);
      const container = screen.getByRole("complementary");
      expect(container).toHaveAttribute("aria-label", "Contact support");
    });

    it("button has aria-label", () => {
      render(<FAQContactCTA content={defaultContent} />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Contact Us");
    });
  });

  describe("Styling", () => {
    it("has centered text", () => {
      const { container } = render(<FAQContactCTA content={defaultContent} />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("text-center");
    });

    it("has border styling", () => {
      const { container } = render(<FAQContactCTA content={defaultContent} />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("border");
      expect(wrapper).toHaveClass("border-border");
    });

    it("has rounded corners", () => {
      const { container } = render(<FAQContactCTA content={defaultContent} />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("rounded-button");
    });

    it("has flex layout", () => {
      const { container } = render(<FAQContactCTA content={defaultContent} />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("flex");
      expect(wrapper).toHaveClass("flex-col");
      expect(wrapper).toHaveClass("items-center");
      expect(wrapper).toHaveClass("justify-center");
    });

    it("has padding", () => {
      const { container } = render(<FAQContactCTA content={defaultContent} />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("px-6");
      expect(wrapper).toHaveClass("py-8");
    });
  });

  describe("Button Variant", () => {
    it("uses secondary button variant", () => {
      render(<FAQContactCTA content={defaultContent} />);
      const button = screen.getByRole("button");
      expect(button.className).toContain("bg-transparent");
      expect(button.className).toContain("border");
    });
  });
});
