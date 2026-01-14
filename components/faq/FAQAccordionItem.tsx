"use client";

import React from "react";

/**
 * FAQAccordionItem component props
 */
export interface FAQAccordionItemProps {
  /** Unique identifier for the FAQ item */
  id: string;
  /** The question text */
  question: string;
  /** The answer text */
  answer: string;
  /** Whether the item is currently expanded */
  isExpanded: boolean;
  /** Callback when the item is toggled */
  onToggle: (id: string) => void;
}

/**
 * FAQAccordionItem component
 *
 * A single collapsible FAQ item with question and answer.
 * Implements accessible accordion pattern with keyboard navigation.
 *
 * @example
 * ```tsx
 * <FAQAccordionItem
 *   id="faq-1"
 *   question="What is GistUp?"
 *   answer="GistUp is an intelligent bookmark manager..."
 *   isExpanded={expandedId === "faq-1"}
 *   onToggle={handleToggle}
 * />
 * ```
 */
export const FAQAccordionItem: React.FC<FAQAccordionItemProps> = ({
  id,
  question,
  answer,
  isExpanded,
  onToggle,
}) => {
  const headingId = `faq-heading-${id}`;
  const panelId = `faq-panel-${id}`;

  const handleClick = () => {
    onToggle(id);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle(id);
    }
  };

  return (
    <div
      className="border border-border rounded-button overflow-hidden"
      data-testid={`faq-item-${id}`}
    >
      <h3 className="m-0">
        <button
          id={headingId}
          type="button"
          className="w-full flex items-center justify-between px-4 py-4 md:px-6 text-left bg-background-main hover:bg-background-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
          aria-expanded={isExpanded}
          aria-controls={panelId}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          <span className="text-body font-semibold text-text-primary pr-4">
            {question}
          </span>
          <span
            className="flex-shrink-0 text-text-secondary transition-transform duration-200"
            aria-hidden="true"
          >
            <svg
              className={`w-5 h-5 transform transition-transform duration-200 ${
                isExpanded ? "rotate-45" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v12M6 12h12"
              />
            </svg>
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        className={`overflow-hidden transition-all duration-200 ${
          isExpanded ? "max-h-96" : "max-h-0"
        }`}
        hidden={!isExpanded}
      >
        <div className="px-4 py-4 md:px-6 border-t border-border bg-background-main">
          <p className="text-body text-text-secondary m-0">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FAQAccordionItem;
