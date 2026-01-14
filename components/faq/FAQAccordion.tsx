"use client";

import React, { useState, useCallback } from "react";
import { FAQAccordionItem } from "./FAQAccordionItem";
import type { FAQItem } from "@/content/faq";

/**
 * FAQAccordion component props
 */
export interface FAQAccordionProps {
  /** Array of FAQ items to display */
  items: FAQItem[];
  /** Whether to allow multiple items to be expanded at once */
  allowMultiple?: boolean;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * FAQAccordion component
 *
 * A collection of collapsible FAQ items with accordion behavior.
 * Supports single or multiple expansion modes.
 *
 * @example
 * ```tsx
 * <FAQAccordion
 *   items={faqItems}
 *   allowMultiple={false}
 * />
 * ```
 */
export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  allowMultiple = false,
  className = "",
}) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const handleToggle = useCallback(
    (id: string) => {
      setExpandedIds((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          if (!allowMultiple) {
            newSet.clear();
          }
          newSet.add(id);
        }
        return newSet;
      });
    },
    [allowMultiple]
  );

  return (
    <div
      className={`flex flex-col gap-3 ${className}`}
      role="list"
      aria-label="Frequently asked questions"
    >
      {items.map((item) => (
        <FAQAccordionItem
          key={item.id}
          id={item.id}
          question={item.question}
          answer={item.answer}
          isExpanded={expandedIds.has(item.id)}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};

export default FAQAccordion;
