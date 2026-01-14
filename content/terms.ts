/**
 * Terms of Service Page Content Configuration
 *
 * This file serves as a git-based Content Management System (CMS) for the Terms of Service page.
 * All terms sections and content are managed here.
 * Changes to this file will be tracked in version control.
 */

/**
 * Individual terms of service section
 */
export interface TermsSection {
  id: string;
  title: string;
  content: string;
}

/**
 * Terms page hero content
 */
export interface TermsHeroContent {
  title: string;
  lastUpdated: string;
}

/**
 * Complete Terms of Service page content
 */
export interface TermsPageContent {
  hero: TermsHeroContent;
  sections: TermsSection[];
}

/**
 * Terms of Service page content - Edit this object to update page content
 */
export const termsContent: TermsPageContent = {
  hero: {
    title: "Terms of Service",
    lastUpdated: "January 14, 2026",
  },

  sections: [
    {
      id: "acceptance-of-terms",
      title: "Acceptance of Terms",
      content:
        "By accessing or using GistUp, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service. The materials contained in this service are protected by applicable copyright and trademark law.",
    },
    {
      id: "use-license",
      title: "Use License",
      content:
        "Permission is granted to temporarily access and use GistUp for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose; attempt to decompile or reverse engineer any software contained in GistUp; remove any copyright or other proprietary notations from the materials; or transfer the materials to another person or mirror the materials on any other server.",
    },
    {
      id: "user-accounts",
      title: "User Accounts",
      content:
        "When you create an account with us, you must provide accurate, complete, and current information at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account. You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password. You agree not to disclose your password to any third party.",
    },
    {
      id: "service-description",
      title: "Service Description",
      content:
        "GistUp provides AI-powered content summarization and audio briefing services. We reserve the right to modify, suspend, or discontinue any aspect of the service at any time without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service. The accuracy of AI-generated summaries may vary, and users should verify important information from original sources.",
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      content:
        "The service and its original content, features, and functionality are and will remain the exclusive property of GistUp and its licensors. The service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of GistUp.",
    },
    {
      id: "limitation-of-liability",
      title: "Limitation of Liability",
      content:
        "In no event shall GistUp, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service; any conduct or content of any third party on the service; any content obtained from the service; and unauthorized access, use, or alteration of your transmissions or content.",
    },
    {
      id: "governing-law",
      title: "Governing Law",
      content:
        "These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.",
    },
  ],
};

export default termsContent;
