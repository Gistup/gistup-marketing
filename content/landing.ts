/**
 * Landing Page Content Configuration
 *
 * This file serves as a git-based Content Management System (CMS) for the landing page.
 * All text content, CTAs, and configurable elements are managed here.
 * Changes to this file will be tracked in version control.
 */

export interface HeroContent {
  headline: string;
  subtext: string;
  primaryCTA: {
    label: string;
    href: string;
  };
  secondaryCTA: {
    label: string;
    href: string;
  };
  mediaAlt: string;
}

export interface ProblemStatement {
  id: string;
  title: string;
  description: string;
}

export interface ProblemContent {
  sectionTitle: string;
  statements: ProblemStatement[];
}

export interface HowItWorksStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
}

export interface HowItWorksContent {
  sectionTitle: string;
  steps: HowItWorksStep[];
}

export interface VideoDemoContent {
  sectionTitle: string;
  buttonLabel: string;
  videoUrl: string;
  posterAlt: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface FeaturesContent {
  sectionTitle: string;
  features: Feature[];
}

export interface BottomCTAContent {
  headline: string;
  subtext: string;
  primaryCTA: {
    label: string;
    href: string;
  };
}

export interface LandingPageContent {
  hero: HeroContent;
  problem: ProblemContent;
  howItWorks: HowItWorksContent;
  videoDemo: VideoDemoContent;
  features: FeaturesContent;
  bottomCTA: BottomCTAContent;
}

/**
 * Landing page content - Edit this object to update page content
 */
export const landingContent: LandingPageContent = {
  hero: {
    headline: "Transform Your Bookmarks into Daily Audio Briefings",
    subtext: "Listen to what you've saved.",
    primaryCTA: {
      label: "Get Early Access",
      href: "/get-started",
    },
    secondaryCTA: {
      label: "Watch Demo",
      href: "#video-demo",
    },
    mediaAlt: "GistUp app interface showing audio briefing feature",
  },

  problem: {
    sectionTitle: "THE PROBLEM",
    statements: [
      {
        id: "problem-1",
        title: "Too Many Unread Bookmarks",
        description:
          "Your reading list keeps growing, but you never find time to catch up.",
      },
      {
        id: "problem-2",
        title: "Content Scattered Everywhere",
        description:
          "Articles, videos, and notes spread across multiple apps and platforms.",
      },
      {
        id: "problem-3",
        title: "No Easy Way to Consume",
        description:
          "Reading requires dedicated time and attention you don't always have.",
      },
    ],
  },

  howItWorks: {
    sectionTitle: "HOW IT WORKS",
    steps: [
      {
        id: "step-1",
        stepNumber: 1,
        title: "Save Content",
        description: "Clip articles, videos, and notes from anywhere with one click.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        title: "AI Summarizes",
        description:
          "Our AI extracts key insights and creates concise summaries.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        title: "Listen to Audio",
        description:
          "Get personalized audio briefings you can listen to anytime, anywhere.",
      },
    ],
  },

  videoDemo: {
    sectionTitle: "See GistUp in Action",
    buttonLabel: "Video Demo",
    videoUrl: "#",
    posterAlt: "Video demonstration of GistUp features",
  },

  features: {
    sectionTitle: "KEY FEATURES",
    features: [
      {
        id: "feature-1",
        title: "Audio Briefings",
        description:
          "Convert your saved content into easy-to-listen audio summaries.",
      },
      {
        id: "feature-2",
        title: "Cross-Platform Sync",
        description:
          "Access your content seamlessly across all your devices.",
      },
      {
        id: "feature-3",
        title: "Smart Summaries",
        description:
          "AI-powered summaries that capture the essence of any content.",
      },
    ],
  },

  bottomCTA: {
    headline: "Ready to Transform Your Reading Experience?",
    subtext:
      "Join thousands of users who have reclaimed their time with GistUp.",
    primaryCTA: {
      label: "Get Early Access",
      href: "/get-started",
    },
  },
};

export default landingContent;
