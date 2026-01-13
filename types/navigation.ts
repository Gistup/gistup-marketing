/**
 * Navigation item type definition
 */
export interface NavigationItem {
  /** Display label for the navigation link */
  label: string;
  /** URL path for the navigation link */
  href: string;
  /** Optional flag to indicate if this is a CTA button */
  isCTA?: boolean;
  /** Optional flag for secondary CTA styling */
  isSecondaryCTA?: boolean;
}

/**
 * Navigation configuration type
 */
export interface NavigationConfig {
  /** Primary navigation items displayed in the main nav */
  primaryItems: NavigationItem[];
  /** CTA items displayed separately (Sign In, Get Started) */
  ctaItems: NavigationItem[];
}
