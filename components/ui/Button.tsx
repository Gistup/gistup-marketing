import React from "react";

/**
 * Button variant types
 */
export type ButtonVariant = "primary" | "secondary";

/**
 * Button size types
 */
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Button component props
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The visual style variant of the button */
  variant?: ButtonVariant;
  /** The size of the button */
  size?: ButtonSize;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** The content of the button */
  children: React.ReactNode;
  /** Optional click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Optional className for additional styling */
  className?: string;
  /** Button type attribute */
  type?: "button" | "submit" | "reset";
  /** Accessible label for the button */
  "aria-label"?: string;
}

/**
 * Base button styles shared across all variants
 */
const baseStyles =
  "inline-flex items-center justify-center font-medium rounded-button transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2";

/**
 * Variant-specific styles
 */
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-text-inverse hover:bg-primary-hover disabled:bg-primary/50 disabled:cursor-not-allowed",
  secondary:
    "bg-transparent border border-border text-text-primary hover:bg-background-secondary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent",
};

/**
 * Size-specific styles
 */
const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-small",
  md: "px-4 py-2 text-body",
  lg: "px-6 py-3 text-body",
};

/**
 * Button component for user interactions
 *
 * A reusable button component that supports primary and secondary variants,
 * multiple sizes, and disabled states. Fully accessible with keyboard navigation
 * and screen reader support.
 *
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 *
 * <Button variant="secondary" size="lg" disabled>
 *   Disabled Button
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  disabled = false,
  children,
  onClick,
  className = "",
  type = "button",
  "aria-label": ariaLabel,
  ...rest
}) => {
  const combinedClassName = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={combinedClassName}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
