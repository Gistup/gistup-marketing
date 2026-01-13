import React from "react";
import Link from "next/link";
import { footerNavigation } from "@/config/navigation";

/**
 * Footer component for the GistUp marketing website
 * Displays navigation links and copyright information
 * Responsive layout: stacked columns on mobile, inline on desktop
 */
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-main border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8 max-w-content">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="flex flex-col gap-4">
            {/* Footer Title */}
            <h2 className="text-lg font-bold text-text-primary">FOOTER</h2>

            {/* Copyright and Links Row */}
            <div className="flex flex-wrap items-center gap-x-1 text-small text-text-secondary">
              <span>© {currentYear} GistUp. All rights reserved.</span>
              {[...footerNavigation.leftColumn, ...footerNavigation.rightColumn].map(
                (item) => (
                  <React.Fragment key={item.href}>
                    <span className="mx-1">•</span>
                    <Link
                      href={item.href}
                      className="text-text-secondary hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
                    >
                      {item.label}
                    </Link>
                  </React.Fragment>
                )
              )}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex flex-col gap-6">
            {/* Footer Title */}
            <h2 className="text-lg font-bold text-text-primary">FOOTER</h2>

            {/* Two Column Links */}
            <div className="grid grid-cols-2 gap-4">
              {/* Left Column */}
              <nav aria-label="Footer navigation - primary">
                <ul className="flex flex-col gap-2">
                  {footerNavigation.leftColumn.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-small text-text-secondary hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Right Column */}
              <nav aria-label="Footer navigation - secondary">
                <ul className="flex flex-col gap-2">
                  {footerNavigation.rightColumn.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-small text-text-secondary hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Copyright */}
            <p className="text-small text-text-secondary">
              © {currentYear} GistUp. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
