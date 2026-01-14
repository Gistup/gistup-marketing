/**
 * FAQ Page Content Configuration
 *
 * This file serves as a git-based Content Management System (CMS) for the FAQ page.
 * All FAQ questions, answers, and related content are managed here.
 * Changes to this file will be tracked in version control.
 */

/**
 * Individual FAQ item
 */
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * FAQ category for grouping related questions
 */
export interface FAQCategory {
  id: string;
  title: string;
  items: FAQItem[];
}

/**
 * FAQ page hero content
 */
export interface FAQHeroContent {
  title: string;
  subtitle: string;
}

/**
 * Contact CTA section content
 */
export interface FAQContactCTAContent {
  headline: string;
  cta: {
    label: string;
    href: string;
  };
}

/**
 * Complete FAQ page content
 */
export interface FAQPageContent {
  hero: FAQHeroContent;
  items: FAQItem[];
  contactCTA: FAQContactCTAContent;
}

/**
 * FAQ page content - Edit this object to update page content
 */
export const faqContent: FAQPageContent = {
  hero: {
    title: "FAQ",
    subtitle: "Frequently Asked Questions",
  },

  items: [
    {
      id: "faq-1",
      question: "What is GistUp?",
      answer:
        "GistUp is an intelligent bookmark manager that transforms your saved content into daily audio briefings. Save articles, get AI-powered summaries, and listen to your curated content anywhere, anytime.",
    },
    {
      id: "faq-2",
      question: "How does the AI summarization work?",
      answer:
        "Our AI analyzes your bookmarked articles and extracts the key points, creating concise summaries that capture the essential information. The summaries are then converted to natural-sounding audio so you can listen on the go.",
    },
    {
      id: "faq-3",
      question: "Is there a free plan available?",
      answer:
        "Yes! GistUp offers a free plan that includes up to 10 bookmarks, basic AI summaries, and 1 audio briefing per day. It's a great way to get started and experience the core features of GistUp.",
    },
    {
      id: "faq-4",
      question: "Can I use GistUp on multiple devices?",
      answer:
        "Cross-platform sync is available on our Pro plan and above. This allows you to access your bookmarks and audio briefings seamlessly across all your devices, including web, iOS, and Android.",
    },
    {
      id: "faq-5",
      question: "How do I cancel my subscription?",
      answer:
        "You can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period. We don't offer refunds for partial months, but you won't be charged again after cancellation.",
    },
    {
      id: "faq-6",
      question: "Is my data secure?",
      answer:
        "Absolutely. We take data security seriously. All data is encrypted in transit and at rest. We never sell your personal information or bookmark data to third parties. You can read more about our security practices in our Privacy Policy.",
    },
  ],

  contactCTA: {
    headline: "Still have questions?",
    cta: {
      label: "Contact Us",
      href: "/contact",
    },
  },
};

export default faqContent;
