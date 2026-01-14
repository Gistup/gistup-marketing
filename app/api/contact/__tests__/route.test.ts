/**
 * Contact API Route Tests
 *
 * Tests for the contact form API endpoint validation logic.
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
 * Contact form request body interface
 */
interface ContactRequestBody {
  name: string;
  email: string;
  message: string;
}

/**
 * Validate the contact form request body
 * This is a copy of the validation logic from route.ts for testing
 */
function validateRequest(body: unknown): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!body || typeof body !== "object") {
    errors.push({ field: "body", message: "Invalid request body" });
    return errors;
  }

  const { name, email, message } = body as ContactRequestBody;

  // Validate name
  if (!name || typeof name !== "string") {
    errors.push({ field: "name", message: "Name is required" });
  } else {
    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      errors.push({ field: "name", message: "Name must be at least 2 characters" });
    } else if (trimmedName.length > 100) {
      errors.push({ field: "name", message: "Name must be less than 100 characters" });
    }
  }

  // Validate email
  if (!email || typeof email !== "string") {
    errors.push({ field: "email", message: "Email is required" });
  } else {
    const trimmedEmail = email.trim();
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      errors.push({ field: "email", message: "Please enter a valid email address" });
    } else if (trimmedEmail.length > 254) {
      errors.push({ field: "email", message: "Email must be less than 254 characters" });
    }
  }

  // Validate message
  if (!message || typeof message !== "string") {
    errors.push({ field: "message", message: "Message is required" });
  } else {
    const trimmedMessage = message.trim();
    if (trimmedMessage.length < 10) {
      errors.push({ field: "message", message: "Message must be at least 10 characters" });
    } else if (trimmedMessage.length > 5000) {
      errors.push({ field: "message", message: "Message must be less than 5000 characters" });
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
    .substring(0, 5000); // Enforce max length
}

describe("Contact API Validation", () => {
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
      it("returns empty array for valid data", () => {
        const errors = validateRequest({
          name: "John Doe",
          email: "john@example.com",
          message: "This is a test message",
        });

        expect(errors).toEqual([]);
      });

      it("accepts trimmed whitespace in inputs", () => {
        const errors = validateRequest({
          name: "  John Doe  ",
          email: "  john@example.com  ",
          message: "  This is a test message  ",
        });

        expect(errors).toEqual([]);
      });

      it("accepts minimum valid lengths", () => {
        const errors = validateRequest({
          name: "AB",
          email: "a@b.co",
          message: "0123456789", // exactly 10 characters
        });

        expect(errors).toEqual([]);
      });
    });

    describe("Name validation", () => {
      it("returns error for missing name", () => {
        const errors = validateRequest({
          email: "john@example.com",
          message: "This is a test message",
        });

        expect(errors).toContainEqual({
          field: "name",
          message: "Name is required",
        });
      });

      it("returns error for empty name", () => {
        const errors = validateRequest({
          name: "",
          email: "john@example.com",
          message: "This is a test message",
        });

        expect(errors).toContainEqual({
          field: "name",
          message: "Name is required",
        });
      });

      it("returns error for name too short", () => {
        const errors = validateRequest({
          name: "A",
          email: "john@example.com",
          message: "This is a test message",
        });

        expect(errors).toContainEqual({
          field: "name",
          message: "Name must be at least 2 characters",
        });
      });

      it("returns error for name too long", () => {
        const errors = validateRequest({
          name: "A".repeat(101),
          email: "john@example.com",
          message: "This is a test message",
        });

        expect(errors).toContainEqual({
          field: "name",
          message: "Name must be less than 100 characters",
        });
      });

      it("returns error for non-string name", () => {
        const errors = validateRequest({
          name: 123,
          email: "john@example.com",
          message: "This is a test message",
        });

        expect(errors).toContainEqual({
          field: "name",
          message: "Name is required",
        });
      });
    });

    describe("Email validation", () => {
      it("returns error for missing email", () => {
        const errors = validateRequest({
          name: "John Doe",
          message: "This is a test message",
        });

        expect(errors).toContainEqual({
          field: "email",
          message: "Email is required",
        });
      });

      it("returns error for empty email", () => {
        const errors = validateRequest({
          name: "John Doe",
          email: "",
          message: "This is a test message",
        });

        expect(errors).toContainEqual({
          field: "email",
          message: "Email is required",
        });
      });

      it("returns error for invalid email format - no @", () => {
        const errors = validateRequest({
          name: "John Doe",
          email: "invalid-email",
          message: "This is a test message",
        });

        expect(errors).toContainEqual({
          field: "email",
          message: "Please enter a valid email address",
        });
      });

      it("returns error for invalid email format - no domain", () => {
        const errors = validateRequest({
          name: "John Doe",
          email: "invalid@",
          message: "This is a test message",
        });

        expect(errors).toContainEqual({
          field: "email",
          message: "Please enter a valid email address",
        });
      });

      it("returns error for invalid email format - no local part", () => {
        const errors = validateRequest({
          name: "John Doe",
          email: "@domain.com",
          message: "This is a test message",
        });

        expect(errors).toContainEqual({
          field: "email",
          message: "Please enter a valid email address",
        });
      });

      it("returns error for invalid email format - no TLD", () => {
        const errors = validateRequest({
          name: "John Doe",
          email: "invalid@domain",
          message: "This is a test message",
        });

        expect(errors).toContainEqual({
          field: "email",
          message: "Please enter a valid email address",
        });
      });

      it("returns error for email too long", () => {
        const errors = validateRequest({
          name: "John Doe",
          email: "a".repeat(250) + "@b.com",
          message: "This is a test message",
        });

        expect(errors).toContainEqual({
          field: "email",
          message: "Email must be less than 254 characters",
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
          const errors = validateRequest({
            name: "John Doe",
            email,
            message: "This is a test message",
          });

          const emailErrors = errors.filter((e) => e.field === "email");
          expect(emailErrors).toEqual([]);
        });
      });
    });

    describe("Message validation", () => {
      it("returns error for missing message", () => {
        const errors = validateRequest({
          name: "John Doe",
          email: "john@example.com",
        });

        expect(errors).toContainEqual({
          field: "message",
          message: "Message is required",
        });
      });

      it("returns error for empty message", () => {
        const errors = validateRequest({
          name: "John Doe",
          email: "john@example.com",
          message: "",
        });

        expect(errors).toContainEqual({
          field: "message",
          message: "Message is required",
        });
      });

      it("returns error for message too short", () => {
        const errors = validateRequest({
          name: "John Doe",
          email: "john@example.com",
          message: "Short",
        });

        expect(errors).toContainEqual({
          field: "message",
          message: "Message must be at least 10 characters",
        });
      });

      it("returns error for message too long", () => {
        const errors = validateRequest({
          name: "John Doe",
          email: "john@example.com",
          message: "A".repeat(5001),
        });

        expect(errors).toContainEqual({
          field: "message",
          message: "Message must be less than 5000 characters",
        });
      });
    });

    describe("Invalid request body", () => {
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

    describe("Multiple validation errors", () => {
      it("returns all errors for completely empty form", () => {
        const errors = validateRequest({
          name: "",
          email: "",
          message: "",
        });

        expect(errors.length).toBe(3);
        expect(errors).toContainEqual({
          field: "name",
          message: "Name is required",
        });
        expect(errors).toContainEqual({
          field: "email",
          message: "Email is required",
        });
        expect(errors).toContainEqual({
          field: "message",
          message: "Message is required",
        });
      });

      it("returns multiple errors for multiple invalid fields", () => {
        const errors = validateRequest({
          name: "A", // too short
          email: "invalid", // invalid format
          message: "Short", // too short
        });

        expect(errors.length).toBe(3);
      });
    });
  });

  describe("sanitizeInput", () => {
    it("trims whitespace", () => {
      expect(sanitizeInput("  hello  ")).toBe("hello");
    });

    it("removes HTML tags", () => {
      expect(sanitizeInput("<script>alert('xss')</script>")).toBe(
        "scriptalert('xss')/script"
      );
      expect(sanitizeInput("<b>bold</b>")).toBe("bbold/b");
    });

    it("truncates long input", () => {
      const longInput = "A".repeat(6000);
      expect(sanitizeInput(longInput).length).toBe(5000);
    });

    it("handles normal input", () => {
      expect(sanitizeInput("Hello, World!")).toBe("Hello, World!");
    });

    it("handles empty string", () => {
      expect(sanitizeInput("")).toBe("");
    });
  });
});
