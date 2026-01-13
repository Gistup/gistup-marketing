import { NavigationConfig } from "@/types/navigation";

/**
 * Navigation configuration for the GistUp marketing website
 * Based on the wireframe specifications
 */
export const navigationConfig: NavigationConfig = {
  primaryItems: [
    { label: "Pricing", href: "/pricing" },
    { label: "Features", href: "/features" },
    { label: "Blog", href: "/blog" },
  ],
  ctaItems: [
    { label: "Sign In", href: "/signin", isSecondaryCTA: true },
    { label: "Get Started", href: "/get-started", isCTA: true },
  ],
};

/**
 * Footer navigation links organized by category
 */
export const footerNavigation = {
  leftColumn: [
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
  ],
  rightColumn: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Social Links", href: "#social" },
  ],
};
