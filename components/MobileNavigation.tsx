"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationItem } from "@/types/navigation";

interface MobileNavigationProps {
  /** Whether the mobile menu is currently open */
  isOpen: boolean;
  /** Callback function to close the menu */
  onClose: () => void;
  /** Primary navigation items */
  primaryItems: NavigationItem[];
  /** CTA navigation items */
  ctaItems: NavigationItem[];
}

/**
 * Mobile navigation menu component
 * Displays a vertical list of navigation links when the hamburger menu is open
 */
export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
  primaryItems,
  ctaItems,
}) => {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        // Check if the click is on the hamburger button (don't close if so)
        const target = event.target as HTMLElement;
        if (!target.closest('[aria-controls="mobile-navigation"]')) {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Focus the first link when menu opens
      setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /**
   * Check if a navigation item is currently active
   */
  const isActiveLink = (href: string): boolean => {
    return pathname === href;
  };

  /**
   * Handle link click - close menu after navigation
   */
  const handleLinkClick = () => {
    onClose();
  };

  // All navigation items combined for mobile view
  const allItems = [...primaryItems, ...ctaItems];

  return (
    <div
      ref={navRef}
      id="mobile-navigation"
      role="navigation"
      aria-label="Mobile navigation"
      className={`
        absolute top-full left-0 right-0 z-50
        bg-background-main border-b border-border
        shadow-lg
        transform transition-all duration-300 ease-in-out
        ${isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}
      `}
    >
      <nav className="container mx-auto px-4 py-4">
        <ul className="flex flex-col space-y-1">
          {allItems.map((item, index) => (
            <li key={item.href}>
              <Link
                ref={index === 0 ? firstLinkRef : undefined}
                href={item.href}
                onClick={handleLinkClick}
                className={`
                  block py-3 px-4 rounded-md
                  text-body font-medium
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset
                  ${
                    item.isCTA
                      ? "bg-primary text-text-inverse hover:bg-primary-hover text-center mt-2"
                      : item.isSecondaryCTA
                        ? "border border-border text-text-primary hover:bg-background-secondary text-center"
                        : isActiveLink(item.href)
                          ? "bg-background-secondary text-primary"
                          : "text-text-primary hover:bg-background-secondary"
                  }
                `}
                aria-current={isActiveLink(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MobileNavigation;
