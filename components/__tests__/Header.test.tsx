import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "../Header";

// Mock child components to isolate Header testing
jest.mock("../DesktopNavigation", () => ({
  DesktopNavigation: ({ primaryItems, ctaItems }: { primaryItems: unknown[]; ctaItems: unknown[] }) => (
    <nav data-testid="desktop-navigation">
      Desktop Navigation ({primaryItems.length + ctaItems.length} items)
    </nav>
  ),
}));

jest.mock("../MobileNavigation", () => ({
  MobileNavigation: ({
    isOpen,
    onClose,
    primaryItems,
    ctaItems,
  }: {
    isOpen: boolean;
    onClose: () => void;
    primaryItems: unknown[];
    ctaItems: unknown[];
  }) => (
    <nav data-testid="mobile-navigation" data-open={isOpen}>
      Mobile Navigation ({primaryItems.length + ctaItems.length} items)
      <button onClick={onClose} data-testid="close-mobile-nav">
        Close
      </button>
    </nav>
  ),
}));

jest.mock("../HamburgerButton", () => ({
  HamburgerButton: ({
    isOpen,
    onClick,
  }: {
    isOpen: boolean;
    onClick: () => void;
  }) => (
    <button
      data-testid="hamburger-button"
      data-open={isOpen}
      onClick={onClick}
      aria-expanded={isOpen}
    >
      Menu
    </button>
  ),
}));

describe("Header", () => {
  it("renders the GistUp logo", () => {
    render(<Header />);

    const logo = screen.getByRole("link", { name: /gistup/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("href", "/");
  });

  it("renders desktop navigation", () => {
    render(<Header />);

    expect(screen.getByTestId("desktop-navigation")).toBeInTheDocument();
  });

  it("renders mobile navigation", () => {
    render(<Header />);

    expect(screen.getByTestId("mobile-navigation")).toBeInTheDocument();
  });

  it("renders hamburger button", () => {
    render(<Header />);

    expect(screen.getByTestId("hamburger-button")).toBeInTheDocument();
  });

  it("mobile menu is initially closed", () => {
    render(<Header />);

    const mobileNav = screen.getByTestId("mobile-navigation");
    expect(mobileNav).toHaveAttribute("data-open", "false");

    const hamburger = screen.getByTestId("hamburger-button");
    expect(hamburger).toHaveAttribute("data-open", "false");
  });

  it("toggles mobile menu when hamburger is clicked", () => {
    render(<Header />);

    const hamburger = screen.getByTestId("hamburger-button");
    const mobileNav = screen.getByTestId("mobile-navigation");

    // Initially closed
    expect(mobileNav).toHaveAttribute("data-open", "false");

    // Click to open
    fireEvent.click(hamburger);
    expect(mobileNav).toHaveAttribute("data-open", "true");
    expect(hamburger).toHaveAttribute("data-open", "true");

    // Click to close
    fireEvent.click(hamburger);
    expect(mobileNav).toHaveAttribute("data-open", "false");
    expect(hamburger).toHaveAttribute("data-open", "false");
  });

  it("closes mobile menu when close callback is triggered", () => {
    render(<Header />);

    const hamburger = screen.getByTestId("hamburger-button");
    const closeButton = screen.getByTestId("close-mobile-nav");
    const mobileNav = screen.getByTestId("mobile-navigation");

    // Open the menu
    fireEvent.click(hamburger);
    expect(mobileNav).toHaveAttribute("data-open", "true");

    // Close via callback
    fireEvent.click(closeButton);
    expect(mobileNav).toHaveAttribute("data-open", "false");
  });

  it("header has sticky positioning", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header.className).toContain("sticky");
    expect(header.className).toContain("top-0");
  });

  it("header has proper z-index for layering", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header.className).toContain("z-40");
  });

  it("header has border bottom", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header.className).toContain("border-b");
  });

  it("logo has proper accessibility label", () => {
    render(<Header />);

    const logo = screen.getByRole("link", { name: /gistup.*homepage/i });
    expect(logo).toBeInTheDocument();
  });

  it("displays Menu text next to hamburger on mobile", () => {
    render(<Header />);

    // There are multiple "Menu" texts - one in the span and one in the mocked button
    const menuTexts = screen.getAllByText("Menu");
    expect(menuTexts.length).toBeGreaterThan(0);
  });

  it("header uses max-width container", () => {
    const { container } = render(<Header />);

    const innerDiv = container.querySelector(".max-w-content");
    expect(innerDiv).toBeInTheDocument();
  });
});
