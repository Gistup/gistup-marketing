/**
 * useWaitlistForm Hook Tests
 *
 * Tests for the waitlist form hook validation logic and state management.
 */

import { renderHook, act } from "@testing-library/react";
import {
  useWaitlistForm,
  validateWaitlistField,
  validateWaitlistForm,
  WaitlistFormValues,
} from "../useWaitlistForm";

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("validateWaitlistField", () => {
  describe("email validation", () => {
    it("returns error for empty email", () => {
      expect(validateWaitlistField("email", "")).toBe("Email is required");
      expect(validateWaitlistField("email", "   ")).toBe("Email is required");
    });

    it("returns error for invalid email format", () => {
      expect(validateWaitlistField("email", "invalid")).toBe(
        "Please enter a valid email address"
      );
      expect(validateWaitlistField("email", "invalid@")).toBe(
        "Please enter a valid email address"
      );
      expect(validateWaitlistField("email", "@domain.com")).toBe(
        "Please enter a valid email address"
      );
      expect(validateWaitlistField("email", "invalid@domain")).toBe(
        "Please enter a valid email address"
      );
    });

    it("returns error for email over 254 characters", () => {
      const longEmail = "a".repeat(250) + "@b.com";
      expect(validateWaitlistField("email", longEmail)).toBe(
        "Email must be less than 254 characters"
      );
    });

    it("returns undefined for valid email", () => {
      expect(validateWaitlistField("email", "test@example.com")).toBeUndefined();
      expect(
        validateWaitlistField("email", "user.name@domain.co.uk")
      ).toBeUndefined();
    });
  });

  describe("name validation", () => {
    it("returns undefined for empty name (optional field)", () => {
      expect(validateWaitlistField("name", "")).toBeUndefined();
      expect(validateWaitlistField("name", "   ")).toBeUndefined();
    });

    it("returns undefined for valid name", () => {
      expect(validateWaitlistField("name", "John Doe")).toBeUndefined();
    });

    it("returns error for name over 100 characters", () => {
      const longName = "A".repeat(101);
      expect(validateWaitlistField("name", longName)).toBe(
        "Name must be less than 100 characters"
      );
    });

    it("returns undefined for name at max length", () => {
      const maxName = "A".repeat(100);
      expect(validateWaitlistField("name", maxName)).toBeUndefined();
    });
  });
});

describe("validateWaitlistForm", () => {
  it("returns empty object for valid form with email only", () => {
    const values: WaitlistFormValues = {
      email: "john@example.com",
      name: "",
    };
    expect(validateWaitlistForm(values)).toEqual({});
  });

  it("returns empty object for valid form with email and name", () => {
    const values: WaitlistFormValues = {
      email: "john@example.com",
      name: "John Doe",
    };
    expect(validateWaitlistForm(values)).toEqual({});
  });

  it("returns email error for empty email", () => {
    const values: WaitlistFormValues = {
      email: "",
      name: "John Doe",
    };
    const errors = validateWaitlistForm(values);
    expect(errors.email).toBe("Email is required");
    expect(errors.name).toBeUndefined();
  });

  it("returns email error for invalid email", () => {
    const values: WaitlistFormValues = {
      email: "invalid",
      name: "John Doe",
    };
    const errors = validateWaitlistForm(values);
    expect(errors.email).toBe("Please enter a valid email address");
  });

  it("returns name error for name too long", () => {
    const values: WaitlistFormValues = {
      email: "john@example.com",
      name: "A".repeat(101),
    };
    const errors = validateWaitlistForm(values);
    expect(errors.name).toBe("Name must be less than 100 characters");
    expect(errors.email).toBeUndefined();
  });

  it("returns multiple errors when both fields are invalid", () => {
    const values: WaitlistFormValues = {
      email: "invalid",
      name: "A".repeat(101),
    };
    const errors = validateWaitlistForm(values);
    expect(errors.email).toBe("Please enter a valid email address");
    expect(errors.name).toBe("Name must be less than 100 characters");
  });
});

describe("useWaitlistForm", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("initializes with empty values", () => {
    const { result } = renderHook(() => useWaitlistForm());

    expect(result.current.values).toEqual({
      email: "",
      name: "",
    });
    expect(result.current.errors).toEqual({});
    expect(result.current.status).toBe("idle");
    expect(result.current.errorMessage).toBe("");
    expect(result.current.isValid).toBe(false);
  });

  it("updates values on change", () => {
    const { result } = renderHook(() => useWaitlistForm());

    act(() => {
      result.current.handleChange({
        target: { name: "email", value: "test@example.com" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.values.email).toBe("test@example.com");
  });

  it("updates name value on change", () => {
    const { result } = renderHook(() => useWaitlistForm());

    act(() => {
      result.current.handleChange({
        target: { name: "name", value: "John Doe" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.values.name).toBe("John Doe");
  });

  it("validates field on blur", () => {
    const { result } = renderHook(() => useWaitlistForm());

    act(() => {
      result.current.handleBlur({
        target: { name: "email", value: "invalid" },
      } as React.FocusEvent<HTMLInputElement>);
    });

    expect(result.current.errors.email).toBe("Please enter a valid email address");
  });

  it("does not set error for empty optional name on blur", () => {
    const { result } = renderHook(() => useWaitlistForm());

    act(() => {
      result.current.handleBlur({
        target: { name: "name", value: "" },
      } as React.FocusEvent<HTMLInputElement>);
    });

    expect(result.current.errors.name).toBeUndefined();
  });

  it("clears error when user corrects input after blur", () => {
    const { result } = renderHook(() => useWaitlistForm());

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
    const { result } = renderHook(() => useWaitlistForm());

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(result.current.errors.email).toBe("Email is required");
  });

  it("does not submit when validation fails", async () => {
    const { result } = renderHook(() => useWaitlistForm());

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(mockFetch).not.toHaveBeenCalled();
    expect(result.current.status).toBe("idle");
  });

  it("submits form successfully with email only", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: "Success" }),
    });

    const { result } = renderHook(() => useWaitlistForm());

    // Fill in valid email
    act(() => {
      result.current.handleChange({
        target: { name: "email", value: "john@example.com" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(mockFetch).toHaveBeenCalledWith("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "john@example.com",
        name: "",
      }),
    });
    expect(result.current.status).toBe("success");
    expect(result.current.values).toEqual({ email: "", name: "" });
  });

  it("submits form successfully with email and name", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: "Success" }),
    });

    const { result } = renderHook(() => useWaitlistForm());

    // Fill in valid values
    act(() => {
      result.current.handleChange({
        target: { name: "email", value: "john@example.com" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: "name", value: "John Doe" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(mockFetch).toHaveBeenCalledWith("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "john@example.com",
        name: "John Doe",
      }),
    });
    expect(result.current.status).toBe("success");
  });

  it("handles submission error from server", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Server error" }),
    });

    const { result } = renderHook(() => useWaitlistForm());

    // Fill in valid email
    act(() => {
      result.current.handleChange({
        target: { name: "email", value: "john@example.com" },
      } as React.ChangeEvent<HTMLInputElement>);
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

    const { result } = renderHook(() => useWaitlistForm());

    // Fill in valid email
    act(() => {
      result.current.handleChange({
        target: { name: "email", value: "john@example.com" },
      } as React.ChangeEvent<HTMLInputElement>);
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

    const { result } = renderHook(() => useWaitlistForm());

    // Fill in values and submit
    act(() => {
      result.current.handleChange({
        target: { name: "email", value: "john@example.com" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: "name", value: "John Doe" },
      } as React.ChangeEvent<HTMLInputElement>);
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

    expect(result.current.values).toEqual({ email: "", name: "" });
    expect(result.current.errors).toEqual({});
    expect(result.current.status).toBe("idle");
    expect(result.current.errorMessage).toBe("");
  });

  it("isValid is true when email is valid", () => {
    const { result } = renderHook(() => useWaitlistForm());

    act(() => {
      result.current.handleChange({
        target: { name: "email", value: "test@example.com" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.isValid).toBe(true);
  });

  it("isValid is false when there are validation errors", () => {
    const { result } = renderHook(() => useWaitlistForm());

    act(() => {
      result.current.handleChange({
        target: { name: "email", value: "test@example.com" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: "name", value: "A".repeat(101) },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    // Trigger validation
    act(() => {
      result.current.handleBlur({
        target: { name: "name", value: "A".repeat(101) },
      } as React.FocusEvent<HTMLInputElement>);
    });

    expect(result.current.isValid).toBe(false);
  });
});
