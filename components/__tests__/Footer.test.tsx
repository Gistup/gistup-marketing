import React from "react";
import { render, screen } from "@testing-library/react";
import { Footer } from "../Footer";

describe("Footer", () => {
  it("renders the footer element", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("displays the FOOTER title", () => {
    render(<Footer />);

    expect(screen.getAllByText("FOOTER").length).toBeGreaterThan(0);
  });

  it("displays the current year in copyright", () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getAllByText(new RegExp(`© ${currentYear} GistUp`));
    expect(copyrightText.length).toBeGreaterThan(0);
  });

  it("renders About link", () => {
    render(<Footer />);

    const aboutLinks = screen.getAllByRole("link", { name: "About" });
    expect(aboutLinks.length).toBeGreaterThan(0);
    expect(aboutLinks[0]).toHaveAttribute("href", "/about");
  });

  it("renders Pricing link", () => {
    render(<Footer />);

    const pricingLinks = screen.getAllByRole("link", { name: "Pricing" });
    expect(pricingLinks.length).toBeGreaterThan(0);
    expect(pricingLinks[0]).toHaveAttribute("href", "/pricing");
  });

  it("renders FAQ link", () => {
    render(<Footer />);

    const faqLinks = screen.getAllByRole("link", { name: "FAQ" });
    expect(faqLinks.length).toBeGreaterThan(0);
    expect(faqLinks[0]).toHaveAttribute("href", "/faq");
  });

  it("renders Privacy Policy link", () => {
    render(<Footer />);

    const privacyLinks = screen.getAllByRole("link", { name: "Privacy Policy" });
    expect(privacyLinks.length).toBeGreaterThan(0);
    expect(privacyLinks[0]).toHaveAttribute("href", "/privacy");
  });

  it("renders Terms link", () => {
    render(<Footer />);

    const termsLinks = screen.getAllByRole("link", { name: "Terms" });
    expect(termsLinks.length).toBeGreaterThan(0);
    expect(termsLinks[0]).toHaveAttribute("href", "/terms");
  });

  it("renders Social Links link", () => {
    render(<Footer />);

    const socialLinks = screen.getAllByRole("link", { name: "Social Links" });
    expect(socialLinks.length).toBeGreaterThan(0);
    expect(socialLinks[0]).toHaveAttribute("href", "#social");
  });

  it("has border top styling", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer.className).toContain("border-t");
  });

  it("uses max-width container", () => {
    const { container } = render(<Footer />);

    const innerDiv = container.querySelector(".max-w-content");
    expect(innerDiv).toBeInTheDocument();
  });

  it("links have hover styles", () => {
    render(<Footer />);

    const aboutLinks = screen.getAllByRole("link", { name: "About" });
    expect(aboutLinks[0].className).toContain("hover:text-primary");
  });

  it("links have focus ring styles for accessibility", () => {
    render(<Footer />);

    const aboutLinks = screen.getAllByRole("link", { name: "About" });
    expect(aboutLinks[0].className).toContain("focus:ring-2");
    expect(aboutLinks[0].className).toContain("focus:ring-primary");
  });

  it("has separate mobile and desktop layouts", () => {
    const { container } = render(<Footer />);

    // Desktop layout is hidden on mobile
    const desktopLayout = container.querySelector(".hidden.md\\:block");
    expect(desktopLayout).toBeInTheDocument();

    // Mobile layout is hidden on desktop
    const mobileLayout = container.querySelector(".md\\:hidden");
    expect(mobileLayout).toBeInTheDocument();
  });

  it("mobile layout has two-column grid", () => {
    const { container } = render(<Footer />);

    const mobileGrid = container.querySelector(".grid-cols-2");
    expect(mobileGrid).toBeInTheDocument();
  });

  it("has footer navigation with proper aria labels", () => {
    render(<Footer />);

    const primaryNav = screen.getByRole("navigation", {
      name: "Footer navigation - primary",
    });
    expect(primaryNav).toBeInTheDocument();

    const secondaryNav = screen.getByRole("navigation", {
      name: "Footer navigation - secondary",
    });
    expect(secondaryNav).toBeInTheDocument();
  });
});
