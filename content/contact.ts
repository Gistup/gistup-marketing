/**
 * Contact Page Content Configuration
 *
 * This file serves as a git-based Content Management System (CMS) for the Contact page.
 * All contact form labels, placeholders, and related content are managed here.
 * Changes to this file will be tracked in version control.
 */

/**
 * Form field configuration
 */
export interface ContactFormField {
  id: string;
  label: string;
  placeholder?: string;
  type: "text" | "email" | "textarea";
  required?: boolean;
}

/**
 * Contact page hero content
 */
export interface ContactHeroContent {
  title: string;
  subtitle: string;
}

/**
 * Form feedback messages
 */
export interface ContactFormFeedback {
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
 * Contact form content
 */
export interface ContactFormContent {
  fields: ContactFormField[];
  helperText: string;
  submitButton: {
    label: string;
    submittingLabel: string;
  };
  feedback: ContactFormFeedback;
}

/**
 * Complete contact page content
 */
export interface ContactPageContent {
  hero: ContactHeroContent;
  form: ContactFormContent;
}

/**
 * Contact page content - Edit this object to update page content
 */
export const contactContent: ContactPageContent = {
  hero: {
    title: "Contact Us",
    subtitle: "We'd love to hear from you",
  },

  form: {
    fields: [
      {
        id: "name",
        label: "Name",
        placeholder: "Your name",
        type: "text",
        required: true,
      },
      {
        id: "email",
        label: "Email",
        placeholder: "your@email.com",
        type: "email",
        required: true,
      },
      {
        id: "message",
        label: "Message",
        placeholder: "How can we help you?",
        type: "textarea",
        required: true,
      },
    ],
    helperText: "We typically respond within 24-48 hours.",
    submitButton: {
      label: "Send Message",
      submittingLabel: "Sending...",
    },
    feedback: {
      submitting: "Sending your message...",
      success: {
        title: "Message Sent!",
        message: "Thank you for reaching out. We'll get back to you within 24-48 hours.",
      },
      error: {
        title: "Something went wrong",
        defaultMessage: "We couldn't send your message. Please try again or email us directly.",
      },
    },
  },
};

export default contactContent;
