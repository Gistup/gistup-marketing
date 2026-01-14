/**
 * useContactForm Hook
 *
 * Custom hook for managing contact form state, validation, and submission.
 * Implements client-side validation for name, email, and message fields.
 */

import { useState, useCallback } from "react";

/**
 * Form field values
 */
export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

/**
 * Form field errors
 */
export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

/**
 * Form submission status
 */
export type FormStatus = "idle" | "submitting" | "success" | "error";

/**
 * Hook return type
 */
export interface UseContactFormReturn {
  values: ContactFormValues;
  errors: ContactFormErrors;
  status: FormStatus;
  errorMessage: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleBlur: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  resetForm: () => void;
  isValid: boolean;
}

/**
 * Initial form values
 */
const initialValues: ContactFormValues = {
  name: "",
  email: "",
  message: "",
};

/**
 * Email validation regex pattern
 * Validates standard email format: local@domain.tld
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate a single field
 */
export const validateField = (
  name: keyof ContactFormValues,
  value: string
): string | undefined => {
  const trimmedValue = value.trim();

  switch (name) {
    case "name":
      if (!trimmedValue) {
        return "Name is required";
      }
      if (trimmedValue.length < 2) {
        return "Name must be at least 2 characters";
      }
      if (trimmedValue.length > 100) {
        return "Name must be less than 100 characters";
      }
      return undefined;

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

    case "message":
      if (!trimmedValue) {
        return "Message is required";
      }
      if (trimmedValue.length < 10) {
        return "Message must be at least 10 characters";
      }
      if (trimmedValue.length > 5000) {
        return "Message must be less than 5000 characters";
      }
      return undefined;

    default:
      return undefined;
  }
};

/**
 * Validate all form fields
 */
export const validateForm = (
  values: ContactFormValues
): ContactFormErrors => {
  const errors: ContactFormErrors = {};

  const nameError = validateField("name", values.name);
  if (nameError) errors.name = nameError;

  const emailError = validateField("email", values.email);
  if (emailError) errors.email = emailError;

  const messageError = validateField("message", values.message);
  if (messageError) errors.message = messageError;

  return errors;
};

/**
 * Custom hook for contact form management
 *
 * @example
 * ```tsx
 * const { values, errors, status, handleChange, handleSubmit } = useContactForm();
 * ```
 */
export const useContactForm = (): UseContactFormReturn => {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  /**
   * Handle input change
   */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));

      // Clear error when user starts typing (only if field was touched)
      if (touched[name]) {
        const fieldError = validateField(name as keyof ContactFormValues, value);
        setErrors((prev) => ({ ...prev, [name]: fieldError }));
      }
    },
    [touched]
  );

  /**
   * Handle input blur - validate field on blur
   */
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));

      const fieldError = validateField(name as keyof ContactFormValues, value);
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
      const formErrors = validateForm(values);
      setErrors(formErrors);
      setTouched({ name: true, email: true, message: true });

      // Check if there are any errors
      if (Object.keys(formErrors).length > 0) {
        return;
      }

      setStatus("submitting");
      setErrorMessage("");

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name.trim(),
            email: values.email.trim(),
            message: values.message.trim(),
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to send message");
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
   * Check if form is valid (no errors and all required fields filled)
   */
  const isValid =
    Object.keys(errors).length === 0 &&
    values.name.trim() !== "" &&
    values.email.trim() !== "" &&
    values.message.trim() !== "";

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

export default useContactForm;
