/**
 * Privacy Policy Page Content Configuration
 *
 * This file serves as a git-based Content Management System (CMS) for the Privacy Policy page.
 * All privacy policy sections and content are managed here.
 * Changes to this file will be tracked in version control.
 */

/**
 * Individual privacy policy section
 */
export interface PrivacySection {
  id: string;
  title: string;
  content: string;
}

/**
 * Privacy page hero content
 */
export interface PrivacyHeroContent {
  title: string;
  lastUpdated: string;
}

/**
 * Complete Privacy Policy page content
 */
export interface PrivacyPageContent {
  hero: PrivacyHeroContent;
  sections: PrivacySection[];
}

/**
 * Privacy Policy page content - Edit this object to update page content
 */
export const privacyContent: PrivacyPageContent = {
  hero: {
    title: "Privacy Policy",
    lastUpdated: "January 14, 2026",
  },

  sections: [
    {
      id: "introduction",
      title: "Introduction",
      content:
        "Welcome to GistUp. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our service. By using GistUp, you agree to the collection and use of information in accordance with this policy.",
    },
    {
      id: "information-we-collect",
      title: "Information We Collect",
      content:
        "We collect several types of information to provide and improve our service. This includes personal information you provide directly (such as your name, email address, and account credentials), usage data (including bookmarks, reading preferences, and listening history), and technical data (such as device information, IP address, and browser type). We may also collect information from third-party services you connect to GistUp.",
    },
    {
      id: "how-we-use-information",
      title: "How We Use Information",
      content:
        "We use the information we collect to provide, maintain, and improve our services. This includes generating AI-powered summaries of your bookmarked content, creating personalized audio briefings, and enhancing your overall experience. We also use your information to communicate with you about service updates, respond to your inquiries, and ensure the security of our platform.",
    },
    {
      id: "cookies-and-tracking",
      title: "Cookies & Tracking",
      content:
        "GistUp uses cookies and similar tracking technologies to enhance your experience. Essential cookies are required for the service to function properly. Analytics cookies help us understand how you use our service so we can improve it. You can control cookie preferences through your browser settings, though disabling certain cookies may affect service functionality.",
    },
    {
      id: "data-sharing",
      title: "Data Sharing",
      content:
        "We do not sell your personal information to third parties. We may share your data with trusted service providers who assist us in operating our platform, such as cloud hosting providers and payment processors. These providers are contractually obligated to protect your data. We may also disclose information when required by law or to protect our rights and the safety of our users.",
    },
    {
      id: "data-security",
      title: "Data Security",
      content:
        "We implement industry-standard security measures to protect your personal information. All data is encrypted in transit using TLS and at rest using AES-256 encryption. We regularly audit our security practices and maintain strict access controls. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
    },
    {
      id: "your-rights",
      title: "Your Rights",
      content:
        "You have the right to access, correct, or delete your personal data at any time. You can export your data, request a copy of the information we hold about you, or ask us to delete your account entirely. If you are located in the European Union, you have additional rights under GDPR, including the right to data portability and the right to object to certain processing activities.",
    },
    {
      id: "contact-information",
      title: "Contact Information",
      content:
        "If you have any questions about this Privacy Policy or our data practices, please contact us at privacy@gistup.com. You can also reach our Data Protection Officer at dpo@gistup.com. For general inquiries, visit our Contact page or write to us at GistUp Inc., 123 Privacy Lane, San Francisco, CA 94102.",
    },
  ],
};

export default privacyContent;
