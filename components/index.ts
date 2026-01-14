/**
 * Component exports for the GistUp marketing website
 */

export { Header } from "./Header";
export { Footer } from "./Footer";
export { DesktopNavigation } from "./DesktopNavigation";
export { MobileNavigation } from "./MobileNavigation";
export { HamburgerButton } from "./HamburgerButton";

// UI Components
export { Button, Section, Card, Grid } from "./ui";
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  SectionProps,
  SectionSpacing,
  SectionBackground,
  CardProps,
  CardPadding,
  GridProps,
  GridColumns,
  GridGap,
} from "./ui";

// Pricing Components
export {
  PricingToggle,
  PricingCard,
  FeatureComparisonTable,
  PricingBottomCTA,
} from "./pricing";
export type {
  PricingToggleProps,
  PricingCardProps,
  FeatureComparisonTableProps,
  PricingBottomCTAProps,
} from "./pricing";

// FAQ Components
export {
  FAQAccordionItem,
  FAQAccordion,
  FAQContactCTA,
} from "./faq";
export type {
  FAQAccordionItemProps,
  FAQAccordionProps,
  FAQContactCTAProps,
} from "./faq";

// Contact Components
export { ContactForm } from "./contact";
export type { ContactFormProps } from "./contact";

// Privacy Components
export {
  PrivacyHero,
  PrivacySection,
  PrivacySectionList,
} from "./privacy";
export type {
  PrivacyHeroProps,
  PrivacySectionProps,
  PrivacySectionListProps,
} from "./privacy";
