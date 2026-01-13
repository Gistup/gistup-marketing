import React from "react";

/**
 * Grid column options
 */
export type GridColumns = 1 | 2 | 3 | 4;

/**
 * Grid gap options
 */
export type GridGap = "none" | "sm" | "md" | "lg";

/**
 * Grid component props
 */
export interface GridProps {
  /** The grid items */
  children: React.ReactNode;
  /** Number of columns on desktop (defaults to responsive behavior) */
  columns?: GridColumns;
  /** Gap between grid items */
  gap?: GridGap;
  /** Optional className for additional styling */
  className?: string;
  /** Whether items should stretch to equal height */
  equalHeight?: boolean;
  /** Accessible role for the grid */
  role?: string;
  /** Accessible label for the grid */
  "aria-label"?: string;
}

/**
 * Gap styles
 */
const gapStyles: Record<GridGap, string> = {
  none: "gap-0",
  sm: "gap-3 md:gap-4",
  md: "gap-4 md:gap-6",
  lg: "gap-6 md:gap-8",
};

/**
 * Column styles for responsive grid
 * Mobile: 1 column
 * Tablet: 2 columns (or specified)
 * Desktop: specified columns
 */
const columnStyles: Record<GridColumns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

/**
 * Grid component for responsive layouts
 *
 * A flexible grid component that supports 1-4 column layouts with
 * automatic responsive breakpoints. Mobile-first design that adapts
 * to different screen sizes.
 *
 * @example
 * ```tsx
 * // 3-column grid
 * <Grid columns={3} gap="md">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </Grid>
 *
 * // 2-column grid with large gap
 * <Grid columns={2} gap="lg" equalHeight>
 *   <div>Left content</div>
 *   <div>Right content</div>
 * </Grid>
 * ```
 */
export const Grid: React.FC<GridProps> = ({
  children,
  columns = 3,
  gap = "md",
  className = "",
  equalHeight = false,
  role,
  "aria-label": ariaLabel,
}) => {
  const baseStyles = "grid";

  const heightStyles = equalHeight ? "items-stretch" : "";

  const gridClassName = [
    baseStyles,
    columnStyles[columns],
    gapStyles[gap],
    heightStyles,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={gridClassName} role={role} aria-label={ariaLabel}>
      {children}
    </div>
  );
};

export default Grid;
