import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { MobileNavigation } from "../MobileNavigation";
import { NavigationItem } from "@/types/navigation";

// Mock usePathname
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe("MobileNavigation", () => {
  const primaryItems: NavigationItem[] = [
    { label: "Pricing", href: "/pricing" },
    { label: "Features", href: "/features" },
    { label: "Blog", href: "/blog" },
  ];

  const ctaItems: NavigationItem[] = [
    { label: "Sign In", href: "/signin", isSecondaryCTA: true },
    { label: "Get Started", href: "/get-started", isCTA: true },
  ];

  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
    mockOnClose.mockClear();
    document.body.style.overflow = "";
  });

  it("renders all navigation items when open", () => {
    render(
      <MobileNavigation
        isOpen={true}
        onClose={mockOnClose}
        primaryItems={primaryItems}
        ctaItems={ctaItems}
      />
    );

    [...primaryItems, ...ctaItems].forEach((item) => {
      expect(screen.getByRole("link", { name: item.label })).toBeInTheDocument();
    });
  });

  it("has correct id for aria-controls reference", () => {
    render(
      <MobileNavigation
        isOpen={true}
        onClose={mockOnClose}
        primaryItems={primaryItems}
        ctaItems={ctaItems}
      />
    );

    const nav = screen.getByRole("navigation", { name: "Mobile navigation" });
    expect(nav).toHaveAttribute("id", "mobile-navigation");
  });

  it("is visible when isOpen is true", () => {
    render(
      <MobileNavigation
        isOpen={true}
        onClose={mockOnClose}
        primaryItems={primaryItems}
        ctaItems={ctaItems}
      />
    );

    const nav = screen.getByRole("navigation", { name: "Mobile navigation" });
    expect(nav.className).toContain("visible");
    expect(nav.className).toContain("opacity-100");
  });

  it("is hidden when isOpen is false", () => {
    render(
      <MobileNavigation
        isOpen={false}
        onClose={mockOnClose}
        primaryItems={primaryItems}
        ctaItems={ctaItems}
      />
    );

    const nav = screen.getByRole("navigation", { name: "Mobile navigation" });
    expect(nav.className).toContain("invisible");
    expect(nav.className).toContain("opacity-0");
  });

  it("calls onClose when a link is clicked", () => {
    render(
      <MobileNavigation
        isOpen={true}
        onClose={mockOnClose}
        primaryItems={primaryItems}
        ctaItems={ctaItems}
      />
    );

    const pricingLink = screen.getByRole("link", { name: "Pricing" });
    fireEvent.click(pricingLink);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Escape key is pressed", () => {
    render(
      <MobileNavigation
        isOpen={true}
        onClose={mockOnClose}
        primaryItems={primaryItems}
        ctaItems={ctaItems}
      />
    );

    fireEvent.keyDown(document, { key: "Escape" });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose on Escape when menu is closed", () => {
    render(
      <MobileNavigation
        isOpen={false}
        onClose={mockOnClose}
        primaryItems={primaryItems}
        ctaItems={ctaItems}
      />
    );

    fireEvent.keyDown(document, { key: "Escape" });

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("marks active link with aria-current", () => {
    mockUsePathname.mockReturnValue("/pricing");
    render(
      <MobileNavigation
        isOpen={true}
        onClose={mockOnClose}
        primaryItems={primaryItems}
        ctaItems={ctaItems}
      />
    );

    const pricingLink = screen.getByRole("link", { name: "Pricing" });
    expect(pricingLink).toHaveAttribute("aria-current", "page");
  });

  it("applies CTA styling to Get Started button", () => {
    render(
      <MobileNavigation
        isOpen={true}
        onClose={mockOnClose}
        primaryItems={primaryItems}
        ctaItems={ctaItems}
      />
    );

    const getStartedLink = screen.getByRole("link", { name: "Get Started" });
    expect(getStartedLink.className).toContain("bg-primary");
    expect(getStartedLink.className).toContain("text-text-inverse");
  });

  it("applies secondary CTA styling to Sign In button", () => {
    render(
      <MobileNavigation
        isOpen={true}
        onClose={mockOnClose}
        primaryItems={primaryItems}
        ctaItems={ctaItems}
      />
    );

    const signInLink = screen.getByRole("link", { name: "Sign In" });
    expect(signInLink.className).toContain("border");
  });

  it("prevents body scroll when open", () => {
    const { rerender } = render(
      <MobileNavigation
        isOpen={false}
        onClose={mockOnClose}
        primaryItems={primaryItems}
        ctaItems={ctaItems}
      />
    );

    expect(document.body.style.overflow).toBe("");

    rerender(
      <MobileNavigation
        isOpen={true}
        onClose={mockOnClose}
        primaryItems={primaryItems}
        ctaItems={ctaItems}
      />
    );

    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restores body scroll when closed", () => {
    const { rerender } = render(
      <MobileNavigation
        isOpen={true}
        onClose={mockOnClose}
        primaryItems={primaryItems}
        ctaItems={ctaItems}
      />
    );

    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <MobileNavigation
        isOpen={false}
        onClose={mockOnClose}
        primaryItems={primaryItems}
        ctaItems={ctaItems}
      />
    );

    expect(document.body.style.overflow).toBe("");
  });

  it("navigation links have focus ring styles", () => {
    render(
      <MobileNavigation
        isOpen={true}
        onClose={mockOnClose}
        primaryItems={primaryItems}
        ctaItems={ctaItems}
      />
    );

    const pricingLink = screen.getByRole("link", { name: "Pricing" });
    expect(pricingLink.className).toContain("focus:ring-2");
    expect(pricingLink.className).toContain("focus:ring-primary");
  });

  it("renders links in vertical list", () => {
    const { container } = render(
      <MobileNavigation
        isOpen={true}
        onClose={mockOnClose}
        primaryItems={primaryItems}
        ctaItems={ctaItems}
      />
    );

    const ul = container.querySelector("ul");
    expect(ul?.className).toContain("flex-col");
  });
});
