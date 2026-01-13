"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationItem } from "@/types/navigation";

interface DesktopNavigationProps {
  /** Primary navigation items */
  primaryItems: NavigationItem[];
  /** CTA navigation items */
  ctaItems: NavigationItem[];
}

/**
 * Desktop navigation component
 * Displays inline navigation links for larger screens
 */
export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  primaryItems,
  ctaItems,
}) => {
  const pathname = usePathname();

  /**
   * Check if a navigation item is currently active
   */
  const isActiveLink = (href: string): boolean => {
    return pathname === href;
  };

  return (
    <nav
      className="hidden md:flex items-center gap-8"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Primary Navigation Links */}
      <ul className="flex items-center gap-6">
        {primaryItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`
                relative py-2 text-body font-medium
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm
                ${
                  isActiveLink(item.href)
                    ? "text-primary"
                    : "text-text-primary hover:text-primary"
                }
              `}
              aria-current={isActiveLink(item.href) ? "page" : undefined}
            >
              {item.label}
              {/* Active indicator underline */}
              <span
                className={`
                  absolute bottom-0 left-0 right-0 h-0.5 bg-primary
                  transform transition-transform duration-200 origin-left
                  ${isActiveLink(item.href) ? "scale-x-100" : "scale-x-0"}
                `}
              />
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA Navigation Links */}
      <ul className="flex items-center gap-4">
        {ctaItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`
                px-4 py-2 rounded-button text-body font-medium
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                ${
                  item.isCTA
                    ? "bg-primary text-text-inverse hover:bg-primary-hover"
                    : item.isSecondaryCTA
                      ? "text-text-primary hover:text-primary"
                      : "text-text-primary hover:text-primary"
                }
              `}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopNavigation;
