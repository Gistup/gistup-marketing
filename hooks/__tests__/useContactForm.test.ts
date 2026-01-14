import { renderHook, act } from "@testing-library/react";
import {
  useContactForm,
  validateField,
  validateForm,
  ContactFormValues,
} from "../useContactForm";

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("validateField", () => {
  describe("name validation", () => {
    it("returns error for empty name", () => {
      expect(validateField("name", "")).toBe("Name is required");
      expect(validateField("name", "   ")).toBe("Name is required");
    });

    it("returns error for name less than 2 characters", () => {
      expect(validateField("name", "A")).toBe("Name must be at least 2 characters");
    });

    it("returns error for name over 100 characters", () => {
      const longName = "A".repeat(101);
      expect(validateField("name", longName)).toBe("Name must be less than 100 characters");
    });

    it("returns undefined for valid name", () => {
      expect(validateField("name", "John Doe")).toBeUndefined();
      expect(validateField("name", "AB")).toBeUndefined();
    });
  });

  describe("email validation", () => {
    it("returns error for empty email", () => {
      expect(validateField("email", "")).toBe("Email is required");
      expect(validateField("email", "   ")).toBe("Email is required");
    });

    it("returns error for invalid email format", () => {
      expect(validateField("email", "invalid")).toBe("Please enter a valid email address");
      expect(validateField("email", "invalid@")).toBe("Please enter a valid email address");
      expect(validateField("email", "@domain.com")).toBe("Please enter a valid email address");
      expect(validateField("email", "invalid@domain")).toBe("Please enter a valid email address");
    });

    it("returns error for email over 254 characters", () => {
      const longEmail = "a".repeat(250) + "@b.com";
      expect(validateField("email", longEmail)).toBe("Email must be less than 254 characters");
    });

    it("returns undefined for valid email", () => {
      expect(validateField("email", "test@example.com")).toBeUndefined();
      expect(validateField("email", "user.name@domain.co.uk")).toBeUndefined();
    });
  });

  describe("message validation", () => {
    it("returns error for empty message", () => {
      expect(validateField("message", "")).toBe("Message is required");
      expect(validateField("message", "   ")).toBe("Message is required");
    });

    it("returns error for message less than 10 characters", () => {
      expect(validateField("message", "Short")).toBe("Message must be at least 10 characters");
    });

    it("returns error for message over 5000 characters", () => {
      const longMessage = "A".repeat(5001);
      expect(validateField("message", longMessage)).toBe("Message must be less than 5000 characters");
    });

    it("returns undefined for valid message", () => {
      expect(validateField("message", "This is a valid message")).toBeUndefined();
    });
  });
});

describe("validateForm", () => {
  it("returns empty object for valid form", () => {
    const values: ContactFormValues = {
      name: "John Doe",
      email: "john@example.com",
      message: "This is a test message",
    };
    expect(validateForm(values)).toEqual({});
  });

  it("returns all errors for empty form", () => {
    const values: ContactFormValues = {
      name: "",
      email: "",
      message: "",
    };
    const errors = validateForm(values);
    expect(errors.name).toBe("Name is required");
    expect(errors.email).toBe("Email is required");
    expect(errors.message).toBe("Message is required");
  });

  it("returns only relevant errors", () => {
    const values: ContactFormValues = {
      name: "John",
      email: "invalid",
      message: "This is a valid message",
    };
    const errors = validateForm(values);
    expect(errors.name).toBeUndefined();
    expect(errors.email).toBe("Please enter a valid email address");
    expect(errors.message).toBeUndefined();
  });
});

describe("useContactForm", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("initializes with empty values", () => {
    const { result } = renderHook(() => useContactForm());

    expect(result.current.values).toEqual({
      name: "",
      email: "",
      message: "",
    });
    expect(result.current.errors).toEqual({});
    expect(result.current.status).toBe("idle");
    expect(result.current.errorMessage).toBe("");
    expect(result.current.isValid).toBe(false);
  });

  it("updates values on change", () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.handleChange({
        target: { name: "name", value: "John Doe" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.values.name).toBe("John Doe");
  });

  it("validates field on blur", () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.handleBlur({
        target: { name: "email", value: "invalid" },
      } as React.FocusEvent<HTMLInputElement>);
    });

    expect(result.current.errors.email).toBe("Please enter a valid email address");
  });

  it("clears error when user corrects input after blur", () => {
    const { result } = renderHook(() => useContactForm());

    // First, blur with invalid value
    act(() => {
      result.current.handleBlur({
        target: { name: "email", value: "invalid" },
      } as React.FocusEvent<HTMLInputElement>);
    });

    expect(result.current.errors.email).toBe("Please enter a valid email address");

    // Then, change to valid value
    act(() => {
      result.current.handleChange({
        target: { name: "email", value: "valid@email.com" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.errors.email).toBeUndefined();
  });

  it("validates all fields on submit", async () => {
    const { result } = renderHook(() => useContactForm());

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(result.current.errors.name).toBe("Name is required");
    expect(result.current.errors.email).toBe("Email is required");
    expect(result.current.errors.message).toBe("Message is required");
  });

  it("does not submit when validation fails", async () => {
    const { result } = renderHook(() => useContactForm());

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(mockFetch).not.toHaveBeenCalled();
    expect(result.current.status).toBe("idle");
  });

  it("submits form successfully", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: "Success" }),
    });

    const { result } = renderHook(() => useContactForm());

    // Fill in valid values
    act(() => {
      result.current.handleChange({
        target: { name: "name", value: "John Doe" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: "email", value: "john@example.com" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: "message", value: "This is a test message" },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(mockFetch).toHaveBeenCalledWith("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "John Doe",
        email: "john@example.com",
        message: "This is a test message",
      }),
    });
    expect(result.current.status).toBe("success");
    expect(result.current.values).toEqual({ name: "", email: "", message: "" });
  });

  it("handles submission error from server", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Server error" }),
    });

    const { result } = renderHook(() => useContactForm());

    // Fill in valid values
    act(() => {
      result.current.handleChange({
        target: { name: "name", value: "John Doe" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: "email", value: "john@example.com" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: "message", value: "This is a test message" },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(result.current.status).toBe("error");
    expect(result.current.errorMessage).toBe("Server error");
  });

  it("handles network error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useContactForm());

    // Fill in valid values
    act(() => {
      result.current.handleChange({
        target: { name: "name", value: "John Doe" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: "email", value: "john@example.com" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: "message", value: "This is a test message" },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(result.current.status).toBe("error");
    expect(result.current.errorMessage).toBe("Network error");
  });

  it("resets form correctly", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const { result } = renderHook(() => useContactForm());

    // Fill in values and submit
    act(() => {
      result.current.handleChange({
        target: { name: "name", value: "John Doe" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: "email", value: "john@example.com" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: "message", value: "This is a test message" },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(result.current.status).toBe("success");

    // Reset form
    act(() => {
      result.current.resetForm();
    });

    expect(result.current.values).toEqual({ name: "", email: "", message: "" });
    expect(result.current.errors).toEqual({});
    expect(result.current.status).toBe("idle");
    expect(result.current.errorMessage).toBe("");
  });

  it("isValid returns true only when form is valid", () => {
    const { result } = renderHook(() => useContactForm());

    expect(result.current.isValid).toBe(false);

    act(() => {
      result.current.handleChange({
        target: { name: "name", value: "John Doe" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.isValid).toBe(false);

    act(() => {
      result.current.handleChange({
        target: { name: "email", value: "john@example.com" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.isValid).toBe(false);

    act(() => {
      result.current.handleChange({
        target: { name: "message", value: "This is a test message" },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });

    expect(result.current.isValid).toBe(true);
  });

  it("sets status to submitting during submission", async () => {
    let resolvePromise: (value: unknown) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    mockFetch.mockReturnValueOnce(promise);

    const { result } = renderHook(() => useContactForm());

    // Fill in valid values
    act(() => {
      result.current.handleChange({
        target: { name: "name", value: "John Doe" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: "email", value: "john@example.com" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: "message", value: "This is a test message" },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });

    // Start submission
    let submitPromise: Promise<void>;
    act(() => {
      submitPromise = result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    // Check status is submitting
    expect(result.current.status).toBe("submitting");

    // Resolve the fetch
    await act(async () => {
      resolvePromise!({
        ok: true,
        json: async () => ({ success: true }),
      });
      await submitPromise;
    });

    expect(result.current.status).toBe("success");
  });
});
