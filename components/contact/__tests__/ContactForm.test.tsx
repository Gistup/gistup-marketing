import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "../ContactForm";
import type { ContactFormContent } from "@/content/contact";

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("ContactForm", () => {
  const defaultContent: ContactFormContent = {
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
        message: "Thank you for reaching out.",
      },
      error: {
        title: "Something went wrong",
        defaultMessage: "Please try again.",
      },
    },
  };

  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe("Rendering", () => {
    it("renders all form fields", () => {
      render(<ContactForm content={defaultContent} />);

      expect(screen.getByRole("textbox", { name: /Name/ })).toBeInTheDocument();
      expect(screen.getByRole("textbox", { name: /Email/ })).toBeInTheDocument();
      expect(screen.getByRole("textbox", { name: /Message/ })).toBeInTheDocument();
    });

    it("renders the submit button", () => {
      render(<ContactForm content={defaultContent} />);

      expect(
        screen.getByRole("button", { name: "Send Message" })
      ).toBeInTheDocument();
    });

    it("renders the helper text", () => {
      render(<ContactForm content={defaultContent} />);

      expect(
        screen.getByText("We typically respond within 24-48 hours.")
      ).toBeInTheDocument();
    });

    it("renders field placeholders correctly", () => {
      render(<ContactForm content={defaultContent} />);

      expect(screen.getByPlaceholderText("Your name")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("your@email.com")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("How can we help you?")
      ).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <ContactForm content={defaultContent} className="custom-class" />
      );
      const form = container.querySelector("form");
      expect(form).toHaveClass("custom-class");
    });
  });

  describe("Form Fields", () => {
    it("renders name field as text input", () => {
      render(<ContactForm content={defaultContent} />);
      const nameInput = screen.getByRole("textbox", { name: /Name/ });
      expect(nameInput).toHaveAttribute("type", "text");
    });

    it("renders email field as email input", () => {
      render(<ContactForm content={defaultContent} />);
      const emailInput = screen.getByRole("textbox", { name: /Email/ });
      expect(emailInput).toHaveAttribute("type", "email");
    });

    it("renders message field as textarea", () => {
      render(<ContactForm content={defaultContent} />);
      const messageInput = screen.getByRole("textbox", { name: /Message/ });
      expect(messageInput.tagName.toLowerCase()).toBe("textarea");
    });

    it("marks required fields with asterisk", () => {
      render(<ContactForm content={defaultContent} />);

      const labels = screen.getAllByText("*");
      expect(labels.length).toBe(3);
    });

    it("sets required attribute on required fields", () => {
      render(<ContactForm content={defaultContent} />);

      expect(screen.getByRole("textbox", { name: /Name/ })).toHaveAttribute("required");
      expect(screen.getByRole("textbox", { name: /Email/ })).toHaveAttribute("required");
      expect(screen.getByRole("textbox", { name: /Message/ })).toHaveAttribute("required");
    });
  });

  describe("Form Validation", () => {
    it("shows validation error on blur for empty required field", async () => {
      const user = userEvent.setup();
      render(<ContactForm content={defaultContent} />);

      const nameInput = screen.getByRole("textbox", { name: /Name/ });
      await user.click(nameInput);
      await user.tab();

      expect(await screen.findByText("Name is required")).toBeInTheDocument();
    });

    it("shows validation error for invalid email", async () => {
      const user = userEvent.setup();
      render(<ContactForm content={defaultContent} />);

      const emailInput = screen.getByRole("textbox", { name: /Email/ });
      await user.type(emailInput, "invalid-email");
      await user.tab();

      expect(
        await screen.findByText("Please enter a valid email address")
      ).toBeInTheDocument();
    });

    it("clears validation error when input is corrected", async () => {
      const user = userEvent.setup();
      render(<ContactForm content={defaultContent} />);

      const emailInput = screen.getByRole("textbox", { name: /Email/ });
      await user.type(emailInput, "invalid");
      await user.tab();

      expect(
        await screen.findByText("Please enter a valid email address")
      ).toBeInTheDocument();

      await user.clear(emailInput);
      await user.type(emailInput, "valid@email.com");

      await waitFor(() => {
        expect(
          screen.queryByText("Please enter a valid email address")
        ).not.toBeInTheDocument();
      });
    });

    it("shows all validation errors on submit with empty form", async () => {
      const user = userEvent.setup();
      render(<ContactForm content={defaultContent} />);

      const submitButton = screen.getByRole("button", { name: "Send Message" });
      await user.click(submitButton);

      expect(await screen.findByText("Name is required")).toBeInTheDocument();
      expect(await screen.findByText("Email is required")).toBeInTheDocument();
      expect(await screen.findByText("Message is required")).toBeInTheDocument();
    });

    it("does not submit form with validation errors", async () => {
      const user = userEvent.setup();
      render(<ContactForm content={defaultContent} />);

      const submitButton = screen.getByRole("button", { name: "Send Message" });
      await user.click(submitButton);

      expect(mockFetch).not.toHaveBeenCalled();
    });
  });

  describe("Form Submission", () => {
    it("submits form with valid data", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const user = userEvent.setup();
      render(<ContactForm content={defaultContent} />);

      await user.type(screen.getByRole("textbox", { name: /Name/ }), "John Doe");
      await user.type(
        screen.getByRole("textbox", { name: /Email/ }),
        "john@example.com"
      );
      await user.type(
        screen.getByRole("textbox", { name: /Message/ }),
        "This is a test message"
      );

      const submitButton = screen.getByRole("button", { name: "Send Message" });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "John Doe",
            email: "john@example.com",
            message: "This is a test message",
          }),
        });
      });
    });

    it("shows loading state during submission", async () => {
      let resolvePromise: (value: unknown) => void;
      const promise = new Promise((resolve) => {
        resolvePromise = resolve;
      });
      mockFetch.mockReturnValueOnce(promise);

      const user = userEvent.setup();
      render(<ContactForm content={defaultContent} />);

      await user.type(screen.getByRole("textbox", { name: /Name/ }), "John Doe");
      await user.type(
        screen.getByRole("textbox", { name: /Email/ }),
        "john@example.com"
      );
      await user.type(
        screen.getByRole("textbox", { name: /Message/ }),
        "This is a test message"
      );

      const submitButton = screen.getByRole("button", { name: "Send Message" });
      await user.click(submitButton);

      expect(screen.getByText("Sending...")).toBeInTheDocument();
      expect(submitButton).toBeDisabled();

      // Resolve the promise to clean up
      resolvePromise!({
        ok: true,
        json: async () => ({ success: true }),
      });
    });

    it("disables form fields during submission", async () => {
      let resolvePromise: (value: unknown) => void;
      const promise = new Promise((resolve) => {
        resolvePromise = resolve;
      });
      mockFetch.mockReturnValueOnce(promise);

      const user = userEvent.setup();
      render(<ContactForm content={defaultContent} />);

      await user.type(screen.getByRole("textbox", { name: /Name/ }), "John Doe");
      await user.type(
        screen.getByRole("textbox", { name: /Email/ }),
        "john@example.com"
      );
      await user.type(
        screen.getByRole("textbox", { name: /Message/ }),
        "This is a test message"
      );

      const submitButton = screen.getByRole("button", { name: "Send Message" });
      await user.click(submitButton);

      expect(screen.getByRole("textbox", { name: /Name/ })).toBeDisabled();
      expect(screen.getByRole("textbox", { name: /Email/ })).toBeDisabled();
      expect(screen.getByRole("textbox", { name: /Message/ })).toBeDisabled();

      // Resolve the promise to clean up
      resolvePromise!({
        ok: true,
        json: async () => ({ success: true }),
      });
    });

    it("shows success message after successful submission", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const user = userEvent.setup();
      render(<ContactForm content={defaultContent} />);

      await user.type(screen.getByRole("textbox", { name: /Name/ }), "John Doe");
      await user.type(
        screen.getByRole("textbox", { name: /Email/ }),
        "john@example.com"
      );
      await user.type(
        screen.getByRole("textbox", { name: /Message/ }),
        "This is a test message"
      );

      const submitButton = screen.getByRole("button", { name: "Send Message" });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Message Sent!")).toBeInTheDocument();
        expect(
          screen.getByText("Thank you for reaching out.")
        ).toBeInTheDocument();
      });
    });

    it("shows error message after failed submission", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: "Server error" }),
      });

      const user = userEvent.setup();
      render(<ContactForm content={defaultContent} />);

      await user.type(screen.getByRole("textbox", { name: /Name/ }), "John Doe");
      await user.type(
        screen.getByRole("textbox", { name: /Email/ }),
        "john@example.com"
      );
      await user.type(
        screen.getByRole("textbox", { name: /Message/ }),
        "This is a test message"
      );

      const submitButton = screen.getByRole("button", { name: "Send Message" });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Something went wrong")).toBeInTheDocument();
        expect(screen.getByText("Server error")).toBeInTheDocument();
      });
    });

    it("allows sending another message after success", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const user = userEvent.setup();
      render(<ContactForm content={defaultContent} />);

      await user.type(screen.getByRole("textbox", { name: /Name/ }), "John Doe");
      await user.type(
        screen.getByRole("textbox", { name: /Email/ }),
        "john@example.com"
      );
      await user.type(
        screen.getByRole("textbox", { name: /Message/ }),
        "This is a test message"
      );

      const submitButton = screen.getByRole("button", { name: "Send Message" });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Message Sent!")).toBeInTheDocument();
      });

      const sendAnotherButton = screen.getByRole("button", {
        name: "Send another message",
      });
      await user.click(sendAnotherButton);

      // Form should be reset
      expect(screen.getByRole("textbox", { name: /Name/ })).toHaveValue("");
      expect(screen.getByRole("textbox", { name: /Email/ })).toHaveValue("");
      expect(screen.getByRole("textbox", { name: /Message/ })).toHaveValue("");
    });
  });

  describe("Accessibility", () => {
    it("has aria-label on form", () => {
      render(<ContactForm content={defaultContent} />);
      const form = screen.getByRole("form");
      expect(form).toHaveAttribute("aria-label", "Contact form");
    });

    it("has aria-required on required fields", () => {
      render(<ContactForm content={defaultContent} />);

      expect(screen.getByRole("textbox", { name: /Name/ })).toHaveAttribute(
        "aria-required",
        "true"
      );
      expect(screen.getByRole("textbox", { name: /Email/ })).toHaveAttribute(
        "aria-required",
        "true"
      );
      expect(screen.getByRole("textbox", { name: /Message/ })).toHaveAttribute(
        "aria-required",
        "true"
      );
    });

    it("has aria-invalid on fields with errors", async () => {
      const user = userEvent.setup();
      render(<ContactForm content={defaultContent} />);

      const nameInput = screen.getByRole("textbox", { name: /Name/ });
      await user.click(nameInput);
      await user.tab();

      expect(nameInput).toHaveAttribute("aria-invalid", "true");
    });

    it("has aria-describedby linking to error message", async () => {
      const user = userEvent.setup();
      render(<ContactForm content={defaultContent} />);

      const nameInput = screen.getByRole("textbox", { name: /Name/ });
      await user.click(nameInput);
      await user.tab();

      expect(nameInput).toHaveAttribute("aria-describedby", "name-error");
      expect(screen.getByText("Name is required")).toHaveAttribute(
        "id",
        "name-error"
      );
    });

    it("error messages have role alert", async () => {
      const user = userEvent.setup();
      render(<ContactForm content={defaultContent} />);

      const nameInput = screen.getByRole("textbox", { name: /Name/ });
      await user.click(nameInput);
      await user.tab();

      const errorMessage = screen.getByText("Name is required");
      expect(errorMessage).toHaveAttribute("role", "alert");
    });

    it("success message has role status", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const user = userEvent.setup();
      render(<ContactForm content={defaultContent} />);

      await user.type(screen.getByRole("textbox", { name: /Name/ }), "John Doe");
      await user.type(
        screen.getByRole("textbox", { name: /Email/ }),
        "john@example.com"
      );
      await user.type(
        screen.getByRole("textbox", { name: /Message/ }),
        "This is a test message"
      );

      const submitButton = screen.getByRole("button", { name: "Send Message" });
      await user.click(submitButton);

      await waitFor(() => {
        const successContainer = screen.getByRole("status");
        expect(successContainer).toBeInTheDocument();
      });
    });

    it("labels are associated with inputs via htmlFor", () => {
      render(<ContactForm content={defaultContent} />);

      const nameInput = screen.getByRole("textbox", { name: /Name/ });
      const emailInput = screen.getByRole("textbox", { name: /Email/ });
      const messageInput = screen.getByRole("textbox", { name: /Message/ });

      expect(nameInput).toHaveAttribute("id", "name");
      expect(emailInput).toHaveAttribute("id", "email");
      expect(messageInput).toHaveAttribute("id", "message");
    });
  });

  describe("Styling", () => {
    it("has border styling on form", () => {
      const { container } = render(<ContactForm content={defaultContent} />);
      const form = container.querySelector("form");
      expect(form).toHaveClass("border");
      expect(form).toHaveClass("border-border");
    });

    it("has rounded corners on form", () => {
      const { container } = render(<ContactForm content={defaultContent} />);
      const form = container.querySelector("form");
      expect(form).toHaveClass("rounded-lg");
    });

    it("has padding on form", () => {
      const { container } = render(<ContactForm content={defaultContent} />);
      const form = container.querySelector("form");
      expect(form).toHaveClass("p-6");
    });

    it("shows error border on invalid fields", async () => {
      const user = userEvent.setup();
      render(<ContactForm content={defaultContent} />);

      const nameInput = screen.getByRole("textbox", { name: /Name/ });
      await user.click(nameInput);
      await user.tab();

      expect(nameInput).toHaveClass("border-status-error");
    });
  });

  describe("Content Variations", () => {
    it("renders without helper text when not provided", () => {
      const contentWithoutHelper: ContactFormContent = {
        ...defaultContent,
        helperText: "",
      };
      render(<ContactForm content={contentWithoutHelper} />);

      expect(
        screen.queryByText("We typically respond within 24-48 hours.")
      ).not.toBeInTheDocument();
    });

    it("renders different button label", () => {
      const customContent: ContactFormContent = {
        ...defaultContent,
        submitButton: {
          label: "Submit",
          submittingLabel: "Submitting...",
        },
      };
      render(<ContactForm content={customContent} />);

      expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
    });

    it("renders optional fields without asterisk", () => {
      const contentWithOptional: ContactFormContent = {
        ...defaultContent,
        fields: [
          {
            id: "phone",
            label: "Phone",
            placeholder: "Your phone number",
            type: "text",
            required: false,
          },
        ],
      };
      render(<ContactForm content={contentWithOptional} />);

      const phoneLabel = screen.getByText("Phone");
      expect(phoneLabel.parentElement).not.toHaveTextContent("*");
    });
  });

  describe("Button Variant", () => {
    it("uses primary button variant", () => {
      render(<ContactForm content={defaultContent} />);
      const button = screen.getByRole("button");
      expect(button.className).toContain("bg-primary");
    });
  });
});
