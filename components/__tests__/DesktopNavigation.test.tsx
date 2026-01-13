import React from "react";
import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { DesktopNavigation } from "../DesktopNavigation";
import { NavigationItem } from "@/types/navigation";

// Mock usePathname
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe("DesktopNavigation", () => {
  const primaryItems: NavigationItem[] = [
    { label: "Pricing", href: "/pricing" },
    { label: "Features", href: "/features" },
    { label: "Blog", href: "/blog" },
  ];

  const ctaItems: NavigationItem[] = [
    { label: "Sign In", href: "/signin", isSecondaryCTA: true },
    { label: "Get Started", href: "/get-started", isCTA: true },
  ];

  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
  });

  it("renders all primary navigation items", () => {
    render(<DesktopNavigation primaryItems={primaryItems} ctaItems={ctaItems} />);

    primaryItems.forEach((item) => {
      expect(screen.getByRole("link", { name: item.label })).toBeInTheDocument();
    });
  });

  it("renders all CTA items", () => {
    render(<DesktopNavigation primaryItems={primaryItems} ctaItems={ctaItems} />);

    ctaItems.forEach((item) => {
      expect(screen.getByRole("link", { name: item.label })).toBeInTheDocument();
    });
  });

  it("has correct href attributes for navigation links", () => {
    render(<DesktopNavigation primaryItems={primaryItems} ctaItems={ctaItems} />);

    primaryItems.forEach((item) => {
      const link = screen.getByRole("link", { name: item.label });
      expect(link).toHaveAttribute("href", item.href);
    });
  });

  it("marks active link with aria-current", () => {
    mockUsePathname.mockReturnValue("/pricing");
    render(<DesktopNavigation primaryItems={primaryItems} ctaItems={ctaItems} />);

    const pricingLink = screen.getByRole("link", { name: "Pricing" });
    expect(pricingLink).toHaveAttribute("aria-current", "page");

    const featuresLink = screen.getByRole("link", { name: "Features" });
    expect(featuresLink).not.toHaveAttribute("aria-current");
  });

  it("applies primary CTA styling to Get Started button", () => {
    render(<DesktopNavigation primaryItems={primaryItems} ctaItems={ctaItems} />);

    const getStartedLink = screen.getByRole("link", { name: "Get Started" });
    expect(getStartedLink.className).toContain("bg-primary");
    expect(getStartedLink.className).toContain("text-text-inverse");
  });

  it("has proper navigation role and aria-label", () => {
    render(<DesktopNavigation primaryItems={primaryItems} ctaItems={ctaItems} />);

    const nav = screen.getByRole("navigation", { name: "Main navigation" });
    expect(nav).toBeInTheDocument();
  });

  it("is hidden on mobile screens (md:flex class)", () => {
    render(<DesktopNavigation primaryItems={primaryItems} ctaItems={ctaItems} />);

    const nav = screen.getByRole("navigation", { name: "Main navigation" });
    expect(nav.className).toContain("hidden");
    expect(nav.className).toContain("md:flex");
  });

  it("navigation links have focus ring styles", () => {
    render(<DesktopNavigation primaryItems={primaryItems} ctaItems={ctaItems} />);

    const pricingLink = screen.getByRole("link", { name: "Pricing" });
    expect(pricingLink.className).toContain("focus:ring-2");
    expect(pricingLink.className).toContain("focus:ring-primary");
  });

  it("applies active styling to current route", () => {
    mockUsePathname.mockReturnValue("/features");
    render(<DesktopNavigation primaryItems={primaryItems} ctaItems={ctaItems} />);

    const featuresLink = screen.getByRole("link", { name: "Features" });
    expect(featuresLink.className).toContain("text-primary");
  });
});
