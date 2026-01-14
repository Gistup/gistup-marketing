/**
 * useWaitlistForm Hook
 *
 * Custom hook for managing waitlist form state, validation, and submission.
 * Implements client-side validation for email (required) and name (optional) fields.
 */

import { useState, useCallback } from "react";

/**
 * Form field values
 */
export interface WaitlistFormValues {
  email: string;
  name: string;
}

/**
 * Form field errors
 */
export interface WaitlistFormErrors {
  email?: string;
  name?: string;
}

/**
 * Form submission status
 */
export type WaitlistFormStatus = "idle" | "submitting" | "success" | "error";

/**
 * Hook return type
 */
export interface UseWaitlistFormReturn {
  values: WaitlistFormValues;
  errors: WaitlistFormErrors;
  status: WaitlistFormStatus;
  errorMessage: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  resetForm: () => void;
  isValid: boolean;
}

/**
 * Initial form values
 */
const initialValues: WaitlistFormValues = {
  email: "",
  name: "",
};

/**
 * Email validation regex pattern
 * Validates standard email format: local@domain.tld
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate a single field
 */
export const validateWaitlistField = (
  name: keyof WaitlistFormValues,
  value: string
): string | undefined => {
  const trimmedValue = value.trim();

  switch (name) {
    case "email":
      if (!trimmedValue) {
        return "Email is required";
      }
      if (!EMAIL_REGEX.test(trimmedValue)) {
        return "Please enter a valid email address";
      }
      if (trimmedValue.length > 254) {
        return "Email must be less than 254 characters";
      }
      return undefined;

    case "name":
      // Name is optional, but if provided, validate length
      if (trimmedValue && trimmedValue.length > 100) {
        return "Name must be less than 100 characters";
      }
      return undefined;

    default:
      return undefined;
  }
};

/**
 * Validate all form fields
 */
export const validateWaitlistForm = (
  values: WaitlistFormValues
): WaitlistFormErrors => {
  const errors: WaitlistFormErrors = {};

  const emailError = validateWaitlistField("email", values.email);
  if (emailError) errors.email = emailError;

  const nameError = validateWaitlistField("name", values.name);
  if (nameError) errors.name = nameError;

  return errors;
};

/**
 * Custom hook for waitlist form management
 *
 * @example
 * ```tsx
 * const { values, errors, status, handleChange, handleSubmit } = useWaitlistForm();
 * ```
 */
export const useWaitlistForm = (): UseWaitlistFormReturn => {
  const [values, setValues] = useState<WaitlistFormValues>(initialValues);
  const [errors, setErrors] = useState<WaitlistFormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<WaitlistFormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  /**
   * Handle input change
   */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));

      // Clear error when user starts typing (only if field was touched)
      if (touched[name]) {
        const fieldError = validateWaitlistField(
          name as keyof WaitlistFormValues,
          value
        );
        setErrors((prev) => ({ ...prev, [name]: fieldError }));
      }
    },
    [touched]
  );

  /**
   * Handle input blur - validate field on blur
   */
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));

      const fieldError = validateWaitlistField(
        name as keyof WaitlistFormValues,
        value
      );
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    },
    []
  );

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Validate all fields
      const formErrors = validateWaitlistForm(values);
      setErrors(formErrors);
      setTouched({ email: true, name: true });

      // Check if there are any errors
      if (Object.keys(formErrors).length > 0) {
        return;
      }

      setStatus("submitting");
      setErrorMessage("");

      try {
        const response = await fetch("/api/waitlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email.trim(),
            name: values.name.trim(),
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to join waitlist");
        }

        setStatus("success");
        setValues(initialValues);
        setTouched({});
      } catch (error) {
        setStatus("error");
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again."
        );
      }
    },
    [values]
  );

  /**
   * Reset form to initial state
   */
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setStatus("idle");
    setErrorMessage("");
  }, []);

  /**
   * Check if form is valid (no errors and required email field filled)
   */
  const isValid =
    Object.keys(errors).length === 0 && values.email.trim() !== "";

  return {
    values,
    errors,
    status,
    errorMessage,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    isValid,
  };
};

export default useWaitlistForm;
