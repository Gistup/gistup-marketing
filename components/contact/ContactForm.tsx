"use client";

import React from "react";
import { Button } from "@/components/ui";
import { useContactForm } from "@/hooks";
import type { ContactFormContent, ContactFormField } from "@/content/contact";

/**
 * ContactForm component props
 */
export interface ContactFormProps {
  /** Form content configuration */
  content: ContactFormContent;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * FormField component for rendering individual form fields
 */
interface FormFieldProps {
  field: ContactFormField;
  value: string;
  error?: string;
  disabled: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  field,
  value,
  error,
  disabled,
  onChange,
  onBlur,
}) => {
  const baseInputStyles =
    "w-full px-4 py-3 border rounded-button bg-background-main text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 disabled:bg-background-secondary disabled:cursor-not-allowed";

  const inputClassName = `${baseInputStyles} ${
    error ? "border-status-error" : "border-border"
  }`;

  const errorId = `${field.id}-error`;

  if (field.type === "textarea") {
    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={field.id}
          className="text-body font-medium text-text-primary"
        >
          {field.label}
          {field.required && (
            <span className="text-status-error ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>
        <textarea
          id={field.id}
          name={field.id}
          placeholder={field.placeholder}
          required={field.required}
          rows={5}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={`${inputClassName} resize-none`}
          aria-required={field.required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        />
        {error && (
          <p
            id={errorId}
            className="text-small text-status-error"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={field.id}
        className="text-body font-medium text-text-primary"
      >
        {field.label}
        {field.required && (
          <span className="text-status-error ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        type={field.type}
        id={field.id}
        name={field.id}
        placeholder={field.placeholder}
        required={field.required}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={inputClassName}
        aria-required={field.required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <p
          id={errorId}
          className="text-small text-status-error"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

/**
 * Success message component
 */
interface SuccessMessageProps {
  title: string;
  message: string;
  onReset: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  title,
  message,
  onReset,
}) => (
  <div
    className="border border-status-success rounded-lg p-6 md:p-8 bg-background-main text-center"
    role="status"
    aria-live="polite"
  >
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-status-success/10 flex items-center justify-center">
        <svg
          className="w-6 h-6 text-status-success"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <div>
        <h3 className="text-h3 font-semibold text-text-primary mb-2">
          {title}
        </h3>
        <p className="text-body text-text-secondary">{message}</p>
      </div>
      <Button
        type="button"
        variant="secondary"
        size="md"
        onClick={onReset}
        aria-label="Send another message"
      >
        Send Another Message
      </Button>
    </div>
  </div>
);

/**
 * Error message component
 */
interface ErrorMessageProps {
  title: string;
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ title, message }) => (
  <div
    className="border border-status-error rounded-lg p-4 bg-status-error/5 mb-4"
    role="alert"
    aria-live="assertive"
  >
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0">
        <svg
          className="w-5 h-5 text-status-error"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div>
        <h4 className="text-body font-medium text-status-error">{title}</h4>
        <p className="text-small text-text-secondary mt-1">{message}</p>
      </div>
    </div>
  </div>
);

/**
 * ContactForm component for displaying the contact form
 *
 * A form component that renders contact form fields based on the content
 * configuration. Handles form validation, submission, and user feedback.
 *
 * @example
 * ```tsx
 * <ContactForm content={contactContent.form} />
 * ```
 */
export const ContactForm: React.FC<ContactFormProps> = ({
  content,
  className = "",
}) => {
  const { fields, helperText, submitButton, feedback } = content;
  const {
    values,
    errors,
    status,
    errorMessage,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useContactForm();

  const formClassName = [
    "border border-border rounded-lg p-6 md:p-8 bg-background-main",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const isSubmitting = status === "submitting";

  // Show success message after successful submission
  if (status === "success") {
    return (
      <SuccessMessage
        title={feedback.success.title}
        message={feedback.success.message}
        onReset={resetForm}
      />
    );
  }

  return (
    <form
      className={formClassName}
      aria-label="Contact form"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Error banner for submission errors */}
      {status === "error" && (
        <ErrorMessage
          title={feedback.error.title}
          message={errorMessage || feedback.error.defaultMessage}
        />
      )}

      <div className="flex flex-col gap-4 md:gap-5">
        {fields.map((field) => (
          <FormField
            key={field.id}
            field={field}
            value={values[field.id as keyof typeof values] || ""}
            error={errors[field.id as keyof typeof errors]}
            disabled={isSubmitting}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        ))}
      </div>

      {helperText && (
        <p className="text-small text-text-secondary mt-4">{helperText}</p>
      )}

      <div className="mt-6">
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={isSubmitting}
          aria-label={
            isSubmitting ? submitButton.submittingLabel : submitButton.label
          }
          className="w-full md:w-auto"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {submitButton.submittingLabel}
            </span>
          ) : (
            submitButton.label
          )}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
