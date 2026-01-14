/**
 * Waitlist Form API Route
 *
 * Handles waitlist form submissions with server-side validation.
 * No database persistence - lightweight implementation as per requirements.
 *
 * @endpoint POST /api/waitlist
 */

import { NextRequest, NextResponse } from "next/server";

/**
 * Waitlist form request body
 */
interface WaitlistRequestBody {
  email: string;
  name?: string;
}

/**
 * Validation error response
 */
interface ValidationError {
  field: string;
  message: string;
}

/**
 * Email validation regex pattern
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate the waitlist form request body
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

/**
 * Process waitlist submission (placeholder for actual service integration)
 *
 * In production, this could integrate with:
 * - Email marketing service (Mailchimp, ConvertKit, etc.)
 * - Notification service
 * - Simple email notification
 *
 * Environment variables for configuration:
 * - WAITLIST_NOTIFICATION_EMAIL (optional)
 * - WAITLIST_SERVICE_API_KEY (optional)
 */
async function processWaitlistSubmission(
  data: WaitlistRequestBody
): Promise<boolean> {
  // Log submission without sensitive content (for debugging)
  console.log("[Waitlist] New submission received", {
    timestamp: new Date().toISOString(),
    hasEmail: !!data.email,
    hasName: !!data.name,
  });

  // In production, implement actual processing here
  // This is where you would integrate with your waitlist service
  // For now, simulate successful processing

  // Example with environment variables:
  // const notificationEmail = process.env.WAITLIST_NOTIFICATION_EMAIL;
  // const apiKey = process.env.WAITLIST_SERVICE_API_KEY;

  // Simulate network delay for realistic behavior
  await new Promise((resolve) => setTimeout(resolve, 300));

  return true;
}

/**
 * POST /api/waitlist
 *
 * Handle waitlist form submission
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    // Validate request
    const validationErrors = validateRequest(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationErrors,
        },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const { email, name } = body as WaitlistRequestBody;
    const sanitizedData: WaitlistRequestBody = {
      email: sanitizeInput(email),
      name: name ? sanitizeInput(name) : undefined,
    };

    // Process waitlist submission
    const processed = await processWaitlistSubmission(sanitizedData);

    if (!processed) {
      return NextResponse.json(
        { error: "Failed to process submission. Please try again later." },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for joining the waitlist. We'll be in touch soon!",
      },
      { status: 200 }
    );
  } catch (error) {
    // Log error without sensitive details
    console.error("[Waitlist] Unexpected error:", {
      timestamp: new Date().toISOString(),
      errorType: error instanceof Error ? error.name : "Unknown",
    });

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

/**
 * Handle unsupported methods
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function PUT(): Promise<NextResponse> {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function DELETE(): Promise<NextResponse> {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
