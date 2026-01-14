/**
 * Contact Form API Route
 *
 * Handles contact form submissions with server-side validation.
 * Email delivery is the system of record - no database persistence.
 *
 * @endpoint POST /api/contact
 */

import { NextRequest, NextResponse } from "next/server";

/**
 * Contact form request body
 */
interface ContactRequestBody {
  name: string;
  email: string;
  message: string;
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
 * Validate the contact form request body
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

/**
 * Send email notification (placeholder for actual email service)
 *
 * In production, this would integrate with an email service like:
 * - SendGrid
 * - AWS SES
 * - Resend
 * - Postmark
 *
 * Environment variables required:
 * - EMAIL_SERVICE_API_KEY
 * - EMAIL_FROM_ADDRESS
 * - EMAIL_TO_ADDRESS
 */
async function sendEmailNotification(data: ContactRequestBody): Promise<boolean> {
  // Log submission without sensitive content (for debugging)
  console.log("[Contact Form] New submission received", {
    timestamp: new Date().toISOString(),
    hasName: !!data.name,
    hasEmail: !!data.email,
    hasMessage: !!data.message,
    messageLength: data.message.length,
  });

  // In production, implement actual email sending here
  // For now, simulate successful email delivery
  // This is where you would integrate with your email service

  // Example with environment variables:
  // const apiKey = process.env.EMAIL_SERVICE_API_KEY;
  // const fromAddress = process.env.EMAIL_FROM_ADDRESS;
  // const toAddress = process.env.EMAIL_TO_ADDRESS;

  // Simulate network delay for realistic behavior
  await new Promise((resolve) => setTimeout(resolve, 500));

  return true;
}

/**
 * POST /api/contact
 *
 * Handle contact form submission
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
    const { name, email, message } = body as ContactRequestBody;
    const sanitizedData: ContactRequestBody = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      message: sanitizeInput(message),
    };

    // Send email notification
    const emailSent = await sendEmailNotification(sanitizedData);

    if (!emailSent) {
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message. We will get back to you soon.",
      },
      { status: 200 }
    );
  } catch (error) {
    // Log error without sensitive details
    console.error("[Contact Form] Unexpected error:", {
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
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}

export async function PUT(): Promise<NextResponse> {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}

export async function DELETE(): Promise<NextResponse> {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
