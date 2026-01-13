"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";
import { HamburgerButton } from "./HamburgerButton";
import { navigationConfig } from "@/config/navigation";

/**
 * Header component with responsive navigation
 * Displays desktop navigation on larger screens and hamburger menu on mobile
 */
export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  /**
   * Toggle mobile menu open/closed state
   */
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  /**
   * Close mobile menu
   */
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-background-main border-b border-border">
      <div className="container mx-auto px-4 max-w-content">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-text-primary hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
            aria-label="GistUp - Go to homepage"
          >
            GistUp
          </Link>

          {/* Desktop Navigation */}
          <DesktopNavigation
            primaryItems={navigationConfig.primaryItems}
            ctaItems={navigationConfig.ctaItems}
          />

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <span className="text-sm text-text-secondary">Menu</span>
            <HamburgerButton
              isOpen={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        primaryItems={navigationConfig.primaryItems}
        ctaItems={navigationConfig.ctaItems}
      />
    </header>
  );
};

export default Header;
