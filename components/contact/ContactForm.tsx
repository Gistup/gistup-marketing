import React from "react";
import { Button } from "@/components/ui";
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
}

const FormField: React.FC<FormFieldProps> = ({ field }) => {
  const baseInputStyles =
    "w-full px-4 py-3 border border-border rounded-button bg-background-main text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200";

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
          className={`${baseInputStyles} resize-none`}
          aria-required={field.required}
        />
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
        className={baseInputStyles}
        aria-required={field.required}
      />
    </div>
  );
};

/**
 * ContactForm component for displaying the contact form
 *
 * A form component that renders contact form fields based on the content
 * configuration. This component handles UI layout only - form submission
 * logic is explicitly handled in Epic 3.
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
  const { fields, helperText, submitButton } = content;

  const formClassName = [
    "border border-border rounded-lg p-6 md:p-8 bg-background-main",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <form
      className={formClassName}
      aria-label="Contact form"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col gap-4 md:gap-5">
        {fields.map((field) => (
          <FormField key={field.id} field={field} />
        ))}
      </div>

      {helperText && (
        <p className="text-small text-text-secondary mt-4">{helperText}</p>
      )}

      <div className="mt-6">
        <Button
          type="button"
          variant="secondary"
          size="md"
          aria-label={submitButton.label}
          className="w-full md:w-auto"
        >
          {submitButton.label}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
