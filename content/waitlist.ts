/**
 * Waitlist Page Content Configuration
 *
 * This file serves as a git-based Content Management System (CMS) for the Waitlist page.
 * All waitlist form labels, placeholders, and related content are managed here.
 * Changes to this file will be tracked in version control.
 */

/**
 * Form field configuration
 */
export interface WaitlistFormField {
  id: string;
  label: string;
  placeholder?: string;
  type: "text" | "email";
  required: boolean;
}

/**
 * Waitlist page hero content
 */
export interface WaitlistHeroContent {
  title: string;
  subtitle: string;
  description: string;
}

/**
 * Form feedback messages
 */
export interface WaitlistFormFeedback {
  submitting: string;
  success: {
    title: string;
    message: string;
  };
  error: {
    title: string;
    defaultMessage: string;
  };
}

/**
 * Waitlist form content
 */
export interface WaitlistFormContent {
  fields: WaitlistFormField[];
  helperText: string;
  submitButton: {
    label: string;
    submittingLabel: string;
  };
  feedback: WaitlistFormFeedback;
}

/**
 * Complete waitlist page content
 */
export interface WaitlistPageContent {
  hero: WaitlistHeroContent;
  form: WaitlistFormContent;
}

/**
 * Waitlist page content - Edit this object to update page content
 */
export const waitlistContent: WaitlistPageContent = {
  hero: {
    title: "Get Early Access",
    subtitle: "Be the first to experience GistUp",
    description:
      "Join our waitlist to get early access to GistUp and be among the first to transform your bookmarks into daily audio briefings.",
  },

  form: {
    fields: [
      {
        id: "email",
        label: "Email",
        placeholder: "your@email.com",
        type: "email",
        required: true,
      },
      {
        id: "name",
        label: "Name",
        placeholder: "Your name (optional)",
        type: "text",
        required: false,
      },
    ],
    helperText: "We'll notify you when GistUp is ready for you.",
    submitButton: {
      label: "Join Waitlist",
      submittingLabel: "Joining...",
    },
    feedback: {
      submitting: "Adding you to the waitlist...",
      success: {
        title: "You're on the list!",
        message:
          "Thank you for your interest in GistUp. We'll be in touch soon with early access details.",
      },
      error: {
        title: "Something went wrong",
        defaultMessage:
          "We couldn't add you to the waitlist. Please try again or contact us directly.",
      },
    },
  },
};

export default waitlistContent;
