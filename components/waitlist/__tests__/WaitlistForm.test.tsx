import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WaitlistForm } from "../WaitlistForm";
import type { WaitlistFormContent } from "@/content/waitlist";

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("WaitlistForm", () => {
  const defaultContent: WaitlistFormContent = {
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
        message: "Thank you for your interest in GistUp.",
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
      render(<WaitlistForm content={defaultContent} />);

      expect(
        screen.getByRole("textbox", { name: /Email/ })
      ).toBeInTheDocument();
      expect(screen.getByRole("textbox", { name: /Name/ })).toBeInTheDocument();
    });

    it("renders the submit button", () => {
      render(<WaitlistForm content={defaultContent} />);

      expect(
        screen.getByRole("button", { name: "Join Waitlist" })
      ).toBeInTheDocument();
    });

    it("renders the helper text", () => {
      render(<WaitlistForm content={defaultContent} />);

      expect(
        screen.getByText("We'll notify you when GistUp is ready for you.")
      ).toBeInTheDocument();
    });

    it("renders field placeholders correctly", () => {
      render(<WaitlistForm content={defaultContent} />);

      expect(screen.getByPlaceholderText("your@email.com")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Your name (optional)")
      ).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <WaitlistForm content={defaultContent} className="custom-class" />
      );
      const form = container.querySelector("form");
      expect(form).toHaveClass("custom-class");
    });

    it("renders form with correct aria-label", () => {
      render(<WaitlistForm content={defaultContent} />);

      expect(screen.getByRole("form", { name: "Waitlist form" })).toBeInTheDocument();
    });
  });

  describe("Form Fields", () => {
    it("renders email field as email input", () => {
      render(<WaitlistForm content={defaultContent} />);
      const emailInput = screen.getByRole("textbox", { name: /Email/ });
      expect(emailInput).toHaveAttribute("type", "email");
    });

    it("renders name field as text input", () => {
      render(<WaitlistForm content={defaultContent} />);
      const nameInput = screen.getByRole("textbox", { name: /Name/ });
      expect(nameInput).toHaveAttribute("type", "text");
    });

    it("marks required fields with asterisk", () => {
      render(<WaitlistForm content={defaultContent} />);

      // Only email is required
      const asterisks = screen.getAllByText("*");
      expect(asterisks.length).toBe(1);
    });

    it("sets required attribute on required fields", () => {
      render(<WaitlistForm content={defaultContent} />);

      expect(
        screen.getByRole("textbox", { name: /Email/ })
      ).toHaveAttribute("required");
      expect(
        screen.getByRole("textbox", { name: /Name/ })
      ).not.toHaveAttribute("required");
    });
  });

  describe("Form Validation", () => {
    it("shows validation error on blur for empty required email", async () => {
      const user = userEvent.setup();
      render(<WaitlistForm content={defaultContent} />);

      const emailInput = screen.getByRole("textbox", { name: /Email/ });
      await user.click(emailInput);
      await user.tab();

      expect(await screen.findByText("Email is required")).toBeInTheDocument();
    });

    it("shows validation error for invalid email", async () => {
      const user = userEvent.setup();
      render(<WaitlistForm content={defaultContent} />);

      const emailInput = screen.getByRole("textbox", { name: /Email/ });
      await user.type(emailInput, "invalid-email");
      await user.tab();

      expect(
        await screen.findByText("Please enter a valid email address")
      ).toBeInTheDocument();
    });

    it("does not show error for empty optional name field", async () => {
      const user = userEvent.setup();
      render(<WaitlistForm content={defaultContent} />);

      const nameInput = screen.getByRole("textbox", { name: /Name/ });
      await user.click(nameInput);
      await user.tab();

      // No error should appear for empty optional field
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });

    it("clears validation error when input is corrected", async () => {
      const user = userEvent.setup();
      render(<WaitlistForm content={defaultContent} />);

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

    it("shows validation error on submit with empty email", async () => {
      const user = userEvent.setup();
      render(<WaitlistForm content={defaultContent} />);

      const submitButton = screen.getByRole("button", { name: "Join Waitlist" });
      await user.click(submitButton);

      expect(await screen.findByText("Email is required")).toBeInTheDocument();
    });

    it("does not submit form with validation errors", async () => {
      const user = userEvent.setup();
      render(<WaitlistForm content={defaultContent} />);

      const submitButton = screen.getByRole("button", { name: "Join Waitlist" });
      await user.click(submitButton);

      expect(mockFetch).not.toHaveBeenCalled();
    });
  });

  describe("Form Submission", () => {
    it("submits form with valid email only", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const user = userEvent.setup();
      render(<WaitlistForm content={defaultContent} />);

      await user.type(
        screen.getByRole("textbox", { name: /Email/ }),
        "john@example.com"
      );

      const submitButton = screen.getByRole("button", { name: "Join Waitlist" });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "john@example.com",
            name: "",
          }),
        });
      });
    });

    it("submits form with email and name", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const user = userEvent.setup();
      render(<WaitlistForm content={defaultContent} />);

      await user.type(
        screen.getByRole("textbox", { name: /Email/ }),
        "john@example.com"
      );
      await user.type(
        screen.getByRole("textbox", { name: /Name/ }),
        "John Doe"
      );

      const submitButton = screen.getByRole("button", { name: "Join Waitlist" });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "john@example.com",
            name: "John Doe",
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
      render(<WaitlistForm content={defaultContent} />);

      await user.type(
        screen.getByRole("textbox", { name: /Email/ }),
        "john@example.com"
      );

      const submitButton = screen.getByRole("button", { name: "Join Waitlist" });
      await user.click(submitButton);

      expect(screen.getByText("Joining...")).toBeInTheDocument();
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
      render(<WaitlistForm content={defaultContent} />);

      await user.type(
        screen.getByRole("textbox", { name: /Email/ }),
        "john@example.com"
      );

      const submitButton = screen.getByRole("button", { name: "Join Waitlist" });
      await user.click(submitButton);

      expect(screen.getByRole("textbox", { name: /Email/ })).toBeDisabled();
      expect(screen.getByRole("textbox", { name: /Name/ })).toBeDisabled();

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
      render(<WaitlistForm content={defaultContent} />);

      await user.type(
        screen.getByRole("textbox", { name: /Email/ }),
        "john@example.com"
      );

      const submitButton = screen.getByRole("button", { name: "Join Waitlist" });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("You're on the list!")).toBeInTheDocument();
        expect(
          screen.getByText("Thank you for your interest in GistUp.")
        ).toBeInTheDocument();
      });
    });

    it("shows error message after failed submission", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: "Server error" }),
      });

      const user = userEvent.setup();
      render(<WaitlistForm content={defaultContent} />);

      await user.type(
        screen.getByRole("textbox", { name: /Email/ }),
        "john@example.com"
      );

      const submitButton = screen.getByRole("button", { name: "Join Waitlist" });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Something went wrong")).toBeInTheDocument();
        expect(screen.getByText("Server error")).toBeInTheDocument();
      });
    });

    it("shows default error message when no error message returned", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      });

      const user = userEvent.setup();
      render(<WaitlistForm content={defaultContent} />);

      await user.type(
        screen.getByRole("textbox", { name: /Email/ }),
        "john@example.com"
      );

      const submitButton = screen.getByRole("button", { name: "Join Waitlist" });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Something went wrong")).toBeInTheDocument();
      });
    });
  });

  describe("Success State", () => {
    it("shows Join Again button after success", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const user = userEvent.setup();
      render(<WaitlistForm content={defaultContent} />);

      await user.type(
        screen.getByRole("textbox", { name: /Email/ }),
        "john@example.com"
      );

      const submitButton = screen.getByRole("button", { name: "Join Waitlist" });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: "Join waitlist again" })
        ).toBeInTheDocument();
      });
    });

    it("resets form when Join Again is clicked", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const user = userEvent.setup();
      render(<WaitlistForm content={defaultContent} />);

      await user.type(
        screen.getByRole("textbox", { name: /Email/ }),
        "john@example.com"
      );

      const submitButton = screen.getByRole("button", { name: "Join Waitlist" });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("You're on the list!")).toBeInTheDocument();
      });

      const joinAgainButton = screen.getByRole("button", {
        name: "Join waitlist again",
      });
      await user.click(joinAgainButton);

      // Form should be visible again
      expect(
        screen.getByRole("textbox", { name: /Email/ })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Join Waitlist" })
      ).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has accessible form label", () => {
      render(<WaitlistForm content={defaultContent} />);

      expect(
        screen.getByRole("form", { name: "Waitlist form" })
      ).toBeInTheDocument();
    });

    it("associates labels with inputs", () => {
      render(<WaitlistForm content={defaultContent} />);

      const emailInput = screen.getByRole("textbox", { name: /Email/ });
      const nameInput = screen.getByRole("textbox", { name: /Name/ });

      expect(emailInput).toHaveAttribute("id", "email");
      expect(nameInput).toHaveAttribute("id", "name");
    });

    it("sets aria-required on required fields", () => {
      render(<WaitlistForm content={defaultContent} />);

      expect(
        screen.getByRole("textbox", { name: /Email/ })
      ).toHaveAttribute("aria-required", "true");
      expect(
        screen.getByRole("textbox", { name: /Name/ })
      ).toHaveAttribute("aria-required", "false");
    });

    it("sets aria-invalid when field has error", async () => {
      const user = userEvent.setup();
      render(<WaitlistForm content={defaultContent} />);

      const emailInput = screen.getByRole("textbox", { name: /Email/ });
      await user.click(emailInput);
      await user.tab();

      await waitFor(() => {
        expect(emailInput).toHaveAttribute("aria-invalid", "true");
      });
    });

    it("associates error messages with inputs via aria-describedby", async () => {
      const user = userEvent.setup();
      render(<WaitlistForm content={defaultContent} />);

      const emailInput = screen.getByRole("textbox", { name: /Email/ });
      await user.click(emailInput);
      await user.tab();

      await waitFor(() => {
        expect(emailInput).toHaveAttribute("aria-describedby", "email-error");
      });
    });

    it("error messages have role=alert", async () => {
      const user = userEvent.setup();
      render(<WaitlistForm content={defaultContent} />);

      const emailInput = screen.getByRole("textbox", { name: /Email/ });
      await user.click(emailInput);
      await user.tab();

      await waitFor(() => {
        expect(screen.getByRole("alert")).toBeInTheDocument();
      });
    });

    it("success message has role=status", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const user = userEvent.setup();
      render(<WaitlistForm content={defaultContent} />);

      await user.type(
        screen.getByRole("textbox", { name: /Email/ }),
        "john@example.com"
      );

      const submitButton = screen.getByRole("button", { name: "Join Waitlist" });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByRole("status")).toBeInTheDocument();
      });
    });
  });
});
