import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ContactForm } from "../ContactForm";
import type { ContactFormContent } from "@/content/contact";

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
    },
  };

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

  describe("Form Behavior", () => {
    it("prevents default form submission", () => {
      render(<ContactForm content={defaultContent} />);
      const form = screen.getByRole("form");

      const submitEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      });
      const preventDefaultSpy = jest.spyOn(submitEvent, "preventDefault");

      fireEvent(form, submitEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it("button is of type button (not submit)", () => {
      render(<ContactForm content={defaultContent} />);
      const button = screen.getByRole("button", { name: "Send Message" });
      expect(button).toHaveAttribute("type", "button");
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

    it("has aria-label on submit button", () => {
      render(<ContactForm content={defaultContent} />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Send Message");
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
        },
      };
      render(<ContactForm content={customContent} />);

      expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
    });

    it("renders optional fields without asterisk", () => {
      const contentWithOptional: ContactFormContent = {
        fields: [
          {
            id: "phone",
            label: "Phone",
            placeholder: "Your phone number",
            type: "text",
            required: false,
          },
        ],
        helperText: "",
        submitButton: {
          label: "Send",
        },
      };
      render(<ContactForm content={contentWithOptional} />);

      const phoneLabel = screen.getByText("Phone");
      expect(phoneLabel.parentElement).not.toHaveTextContent("*");
    });
  });

  describe("Button Variant", () => {
    it("uses secondary button variant", () => {
      render(<ContactForm content={defaultContent} />);
      const button = screen.getByRole("button");
      expect(button.className).toContain("bg-transparent");
      expect(button.className).toContain("border");
    });
  });
});
