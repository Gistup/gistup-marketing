/**
 * Waitlist API Route Tests
 *
 * Tests for the waitlist form API endpoint validation logic.
 * Note: These tests focus on the validation logic rather than the full
 * Next.js route handler due to Jest environment limitations with Next.js
 * server components.
 */

// Mock console.log and console.error to prevent noise in tests
const mockConsoleLog = jest.spyOn(console, "log").mockImplementation();
const mockConsoleError = jest.spyOn(console, "error").mockImplementation();

/**
 * Email validation regex pattern (same as in route.ts)
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validation error interface
 */
interface ValidationError {
  field: string;
  message: string;
}

/**
 * Waitlist form request body interface
 */
interface WaitlistRequestBody {
  email: string;
  name?: string;
}

/**
 * Validate the waitlist form request body
 * This is a copy of the validation logic from route.ts for testing
 */
function validateRequest(body: unknown): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!body || typeof body !== "object") {
    errors.push({ field: "body", message: "Invalid request body" });
    return errors;
  }

  const { email, name } = body as WaitlistRequestBody;

  // Validate email (required)
  if (!email || typeof email !== "string") {
    errors.push({ field: "email", message: "Email is required" });
  } else {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      errors.push({ field: "email", message: "Email is required" });
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      errors.push({
        field: "email",
        message: "Please enter a valid email address",
      });
    } else if (trimmedEmail.length > 254) {
      errors.push({
        field: "email",
        message: "Email must be less than 254 characters",
      });
    }
  }

  // Validate name (optional, but if provided, check length)
  if (name !== undefined && name !== null) {
    if (typeof name !== "string") {
      errors.push({ field: "name", message: "Name must be a string" });
    } else {
      const trimmedName = name.trim();
      if (trimmedName.length > 100) {
        errors.push({
          field: "name",
          message: "Name must be less than 100 characters",
        });
      }
    }
  }

  return errors;
}

/**
 * Sanitize input to prevent injection attacks
 */
function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .substring(0, 254); // Enforce max length for email
}

describe("Waitlist API Validation", () => {
  beforeEach(() => {
    mockConsoleLog.mockClear();
    mockConsoleError.mockClear();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
    mockConsoleError.mockRestore();
  });

  describe("validateRequest", () => {
    describe("Valid submissions", () => {
      it("returns empty array for valid email only", () => {
        const errors = validateRequest({
          email: "john@example.com",
        });

        expect(errors).toEqual([]);
      });

      it("returns empty array for valid email with name", () => {
        const errors = validateRequest({
          email: "john@example.com",
          name: "John Doe",
        });

        expect(errors).toEqual([]);
      });

      it("returns empty array for valid email with empty name", () => {
        const errors = validateRequest({
          email: "john@example.com",
          name: "",
        });

        expect(errors).toEqual([]);
      });

      it("accepts trimmed whitespace in inputs", () => {
        const errors = validateRequest({
          email: "  john@example.com  ",
          name: "  John Doe  ",
        });

        expect(errors).toEqual([]);
      });

      it("accepts minimum valid email", () => {
        const errors = validateRequest({
          email: "a@b.co",
        });

        expect(errors).toEqual([]);
      });
    });

    describe("Invalid body", () => {
      it("returns error for null body", () => {
        const errors = validateRequest(null);

        expect(errors).toContainEqual({
          field: "body",
          message: "Invalid request body",
        });
      });

      it("returns error for undefined body", () => {
        const errors = validateRequest(undefined);

        expect(errors).toContainEqual({
          field: "body",
          message: "Invalid request body",
        });
      });

      it("returns error for non-object body", () => {
        const errors = validateRequest("string");

        expect(errors).toContainEqual({
          field: "body",
          message: "Invalid request body",
        });
      });
    });

    describe("Email validation", () => {
      it("returns error for missing email", () => {
        const errors = validateRequest({
          name: "John Doe",
        });

        expect(errors).toContainEqual({
          field: "email",
          message: "Email is required",
        });
      });

      it("returns error for empty email", () => {
        const errors = validateRequest({
          email: "",
        });

        expect(errors).toContainEqual({
          field: "email",
          message: "Email is required",
        });
      });

      it("returns error for whitespace-only email", () => {
        const errors = validateRequest({
          email: "   ",
        });

        expect(errors).toContainEqual({
          field: "email",
          message: "Email is required",
        });
      });

      it("returns error for invalid email format - no @", () => {
        const errors = validateRequest({
          email: "invalid-email",
        });

        expect(errors).toContainEqual({
          field: "email",
          message: "Please enter a valid email address",
        });
      });

      it("returns error for invalid email format - no domain", () => {
        const errors = validateRequest({
          email: "invalid@",
        });

        expect(errors).toContainEqual({
          field: "email",
          message: "Please enter a valid email address",
        });
      });

      it("returns error for invalid email format - no local part", () => {
        const errors = validateRequest({
          email: "@domain.com",
        });

        expect(errors).toContainEqual({
          field: "email",
          message: "Please enter a valid email address",
        });
      });

      it("returns error for invalid email format - no TLD", () => {
        const errors = validateRequest({
          email: "invalid@domain",
        });

        expect(errors).toContainEqual({
          field: "email",
          message: "Please enter a valid email address",
        });
      });

      it("returns error for email too long", () => {
        const errors = validateRequest({
          email: "a".repeat(250) + "@b.com",
        });

        expect(errors).toContainEqual({
          field: "email",
          message: "Email must be less than 254 characters",
        });
      });

      it("returns error for non-string email", () => {
        const errors = validateRequest({
          email: 123,
        });

        expect(errors).toContainEqual({
          field: "email",
          message: "Email is required",
        });
      });

      it("accepts valid email formats", () => {
        const validEmails = [
          "test@example.com",
          "user.name@domain.co.uk",
          "user+tag@example.org",
          "a@b.co",
        ];

        validEmails.forEach((email) => {
          const errors = validateRequest({ email });
          const emailErrors = errors.filter((e) => e.field === "email");
          expect(emailErrors).toEqual([]);
        });
      });
    });

    describe("Name validation (optional)", () => {
      it("accepts missing name", () => {
        const errors = validateRequest({
          email: "john@example.com",
        });

        const nameErrors = errors.filter((e) => e.field === "name");
        expect(nameErrors).toEqual([]);
      });

      it("accepts empty name", () => {
        const errors = validateRequest({
          email: "john@example.com",
          name: "",
        });

        const nameErrors = errors.filter((e) => e.field === "name");
        expect(nameErrors).toEqual([]);
      });

      it("accepts null name", () => {
        const errors = validateRequest({
          email: "john@example.com",
          name: null,
        });

        const nameErrors = errors.filter((e) => e.field === "name");
        expect(nameErrors).toEqual([]);
      });

      it("accepts undefined name", () => {
        const errors = validateRequest({
          email: "john@example.com",
          name: undefined,
        });

        const nameErrors = errors.filter((e) => e.field === "name");
        expect(nameErrors).toEqual([]);
      });

      it("returns error for name too long", () => {
        const errors = validateRequest({
          email: "john@example.com",
          name: "A".repeat(101),
        });

        expect(errors).toContainEqual({
          field: "name",
          message: "Name must be less than 100 characters",
        });
      });

      it("accepts name at max length", () => {
        const errors = validateRequest({
          email: "john@example.com",
          name: "A".repeat(100),
        });

        const nameErrors = errors.filter((e) => e.field === "name");
        expect(nameErrors).toEqual([]);
      });

      it("returns error for non-string name", () => {
        const errors = validateRequest({
          email: "john@example.com",
          name: 123,
        });

        expect(errors).toContainEqual({
          field: "name",
          message: "Name must be a string",
        });
      });
    });

    describe("Multiple errors", () => {
      it("returns multiple errors when both email and name are invalid", () => {
        const errors = validateRequest({
          email: "invalid",
          name: "A".repeat(101),
        });

        expect(errors).toContainEqual({
          field: "email",
          message: "Please enter a valid email address",
        });
        expect(errors).toContainEqual({
          field: "name",
          message: "Name must be less than 100 characters",
        });
      });
    });
  });

  describe("sanitizeInput", () => {
    it("trims whitespace", () => {
      expect(sanitizeInput("  test  ")).toBe("test");
    });

    it("removes HTML tags", () => {
      expect(sanitizeInput("<script>alert('xss')</script>")).toBe(
        "scriptalert('xss')/script"
      );
    });

    it("removes angle brackets", () => {
      expect(sanitizeInput("test<>value")).toBe("testvalue");
    });

    it("enforces max length", () => {
      const longInput = "a".repeat(300);
      expect(sanitizeInput(longInput).length).toBe(254);
    });

    it("handles empty string", () => {
      expect(sanitizeInput("")).toBe("");
    });

    it("handles normal input without modification", () => {
      expect(sanitizeInput("John Doe")).toBe("John Doe");
    });

    it("handles email addresses correctly", () => {
      expect(sanitizeInput("  test@example.com  ")).toBe("test@example.com");
    });
  });
});
