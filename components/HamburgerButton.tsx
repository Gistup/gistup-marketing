"use client";

import React from "react";

interface HamburgerButtonProps {
  /** Whether the mobile menu is currently open */
  isOpen: boolean;
  /** Callback function when the button is clicked */
  onClick: () => void;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Accessible hamburger menu button component
 * Transforms between hamburger icon and close (X) icon based on state
 */
export const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  isOpen,
  onClick,
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative w-10 h-10 flex items-center justify-center
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        rounded-md transition-colors duration-200
        hover:bg-background-secondary
        ${className}
      `}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation"
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
    >
      <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
      <div className="w-6 h-5 relative flex flex-col justify-between">
        {/* Top bar */}
        <span
          className={`
            block h-0.5 w-6 bg-text-primary rounded-full
            transform transition-all duration-300 ease-in-out origin-center
            ${isOpen ? "rotate-45 translate-y-[9px]" : ""}
          `}
        />
        {/* Middle bar */}
        <span
          className={`
            block h-0.5 w-6 bg-text-primary rounded-full
            transition-all duration-300 ease-in-out
            ${isOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"}
          `}
        />
        {/* Bottom bar */}
        <span
          className={`
            block h-0.5 w-6 bg-text-primary rounded-full
            transform transition-all duration-300 ease-in-out origin-center
            ${isOpen ? "-rotate-45 -translate-y-[9px]" : ""}
          `}
        />
      </div>
    </button>
  );
};

export default HamburgerButton;
