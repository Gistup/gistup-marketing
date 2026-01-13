import React from "react";

/**
 * Card padding options
 */
export type CardPadding = "none" | "sm" | "md" | "lg";

/**
 * Card component props
 */
export interface CardProps {
  /** The content of the card body */
  children: React.ReactNode;
  /** Optional header content */
  header?: React.ReactNode;
  /** Optional footer content */
  footer?: React.ReactNode;
  /** Internal padding size */
  padding?: CardPadding;
  /** Whether to show a border */
  bordered?: boolean;
  /** Whether to show a shadow */
  shadow?: boolean;
  /** Optional className for additional styling */
  className?: string;
  /** Optional click handler for interactive cards */
  onClick?: () => void;
  /** Whether the card is interactive (clickable) */
  interactive?: boolean;
  /** Accessible label for the card */
  "aria-label"?: string;
}

/**
 * Padding styles
 */
const paddingStyles: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-3 md:p-4",
  md: "p-4 md:p-6",
  lg: "p-6 md:p-8",
};

/**
 * Card component for displaying content in a contained box
 *
 * A flexible card component that supports optional header and footer areas,
 * configurable padding, borders, and shadows. Can be made interactive
 * for clickable card patterns.
 *
 * @example
 * ```tsx
 * // Basic card
 * <Card>
 *   <p>Card content</p>
 * </Card>
 *
 * // Card with header and footer
 * <Card
 *   header={<h3>Card Title</h3>}
 *   footer={<Button>Action</Button>}
 *   padding="lg"
 * >
 *   <p>Card body content</p>
 * </Card>
 *
 * // Interactive card
 * <Card interactive onClick={handleClick}>
 *   <p>Click me</p>
 * </Card>
 * ```
 */
export const Card: React.FC<CardProps> = ({
  children,
  header,
  footer,
  padding = "md",
  bordered = true,
  shadow = false,
  className = "",
  onClick,
  interactive = false,
  "aria-label": ariaLabel,
}) => {
  const baseStyles = "bg-background-main rounded-lg overflow-hidden";

  const borderStyles = bordered ? "border border-border" : "";

  const shadowStyles = shadow ? "shadow-sm" : "";

  const interactiveStyles = interactive
    ? "cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    : "";

  const cardClassName = [
    baseStyles,
    borderStyles,
    shadowStyles,
    interactiveStyles,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const CardWrapper = interactive ? "button" : "div";

  const cardProps = interactive
    ? {
        onClick,
        type: "button" as const,
        "aria-label": ariaLabel,
      }
    : {
        "aria-label": ariaLabel,
      };

  return (
    <CardWrapper className={cardClassName} {...cardProps}>
      {header && (
        <div
          className={`border-b border-border ${paddingStyles[padding]}`}
          data-testid="card-header"
        >
          {header}
        </div>
      )}

      <div className={paddingStyles[padding]} data-testid="card-body">
        {children}
      </div>

      {footer && (
        <div
          className={`border-t border-border ${paddingStyles[padding]}`}
          data-testid="card-footer"
        >
          {footer}
        </div>
      )}
    </CardWrapper>
  );
};

export default Card;
