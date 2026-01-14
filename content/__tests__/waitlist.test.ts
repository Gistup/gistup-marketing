/**
 * Waitlist Content Tests
 *
 * Tests to ensure the waitlist content configuration is valid and complete.
 */

import { waitlistContent } from "../waitlist";
import type {
  WaitlistPageContent,
  WaitlistHeroContent,
  WaitlistFormContent,
  WaitlistFormField,
} from "../waitlist";

describe("waitlistContent", () => {
  describe("Structure", () => {
    it("has all required top-level properties", () => {
      expect(waitlistContent).toHaveProperty("hero");
      expect(waitlistContent).toHaveProperty("form");
    });

    it("matches WaitlistPageContent interface", () => {
      const content: WaitlistPageContent = waitlistContent;
      expect(content).toBeDefined();
    });
  });

  describe("Hero Content", () => {
    const hero: WaitlistHeroContent = waitlistContent.hero;

    it("has all required properties", () => {
      expect(hero).toHaveProperty("title");
      expect(hero).toHaveProperty("subtitle");
      expect(hero).toHaveProperty("description");
    });

    it("has non-empty title", () => {
      expect(hero.title).toBeTruthy();
      expect(typeof hero.title).toBe("string");
    });

    it("has non-empty subtitle", () => {
      expect(hero.subtitle).toBeTruthy();
      expect(typeof hero.subtitle).toBe("string");
    });

    it("has non-empty description", () => {
      expect(hero.description).toBeTruthy();
      expect(typeof hero.description).toBe("string");
    });
  });

  describe("Form Content", () => {
    const form: WaitlistFormContent = waitlistContent.form;

    it("has all required properties", () => {
      expect(form).toHaveProperty("fields");
      expect(form).toHaveProperty("helperText");
      expect(form).toHaveProperty("submitButton");
      expect(form).toHaveProperty("feedback");
    });

    describe("Fields", () => {
      it("has at least one field", () => {
        expect(form.fields.length).toBeGreaterThan(0);
      });

      it("has email field", () => {
        const emailField = form.fields.find((f) => f.id === "email");
        expect(emailField).toBeDefined();
      });

      it("email field is required", () => {
        const emailField = form.fields.find((f) => f.id === "email");
        expect(emailField?.required).toBe(true);
      });

      it("email field has type email", () => {
        const emailField = form.fields.find((f) => f.id === "email");
        expect(emailField?.type).toBe("email");
      });

      it("has name field", () => {
        const nameField = form.fields.find((f) => f.id === "name");
        expect(nameField).toBeDefined();
      });

      it("name field is optional", () => {
        const nameField = form.fields.find((f) => f.id === "name");
        expect(nameField?.required).toBe(false);
      });

      it("all fields have required properties", () => {
        form.fields.forEach((field: WaitlistFormField) => {
          expect(field).toHaveProperty("id");
          expect(field).toHaveProperty("label");
          expect(field).toHaveProperty("type");
          expect(field).toHaveProperty("required");
          expect(typeof field.id).toBe("string");
          expect(typeof field.label).toBe("string");
          expect(["text", "email"].includes(field.type)).toBe(true);
          expect(typeof field.required).toBe("boolean");
        });
      });

      it("all fields have unique ids", () => {
        const ids = form.fields.map((f) => f.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
      });
    });

    describe("Helper Text", () => {
      it("has non-empty helper text", () => {
        expect(form.helperText).toBeTruthy();
        expect(typeof form.helperText).toBe("string");
      });
    });

    describe("Submit Button", () => {
      it("has label", () => {
        expect(form.submitButton.label).toBeTruthy();
        expect(typeof form.submitButton.label).toBe("string");
      });

      it("has submitting label", () => {
        expect(form.submitButton.submittingLabel).toBeTruthy();
        expect(typeof form.submitButton.submittingLabel).toBe("string");
      });
    });

    describe("Feedback Messages", () => {
      it("has submitting message", () => {
        expect(form.feedback.submitting).toBeTruthy();
        expect(typeof form.feedback.submitting).toBe("string");
      });

      describe("Success Feedback", () => {
        it("has title", () => {
          expect(form.feedback.success.title).toBeTruthy();
          expect(typeof form.feedback.success.title).toBe("string");
        });

        it("has message", () => {
          expect(form.feedback.success.message).toBeTruthy();
          expect(typeof form.feedback.success.message).toBe("string");
        });
      });

      describe("Error Feedback", () => {
        it("has title", () => {
          expect(form.feedback.error.title).toBeTruthy();
          expect(typeof form.feedback.error.title).toBe("string");
        });

        it("has default message", () => {
          expect(form.feedback.error.defaultMessage).toBeTruthy();
          expect(typeof form.feedback.error.defaultMessage).toBe("string");
        });
      });
    });
  });

  describe("Content Quality", () => {
    it("hero title is appropriate for waitlist page", () => {
      expect(waitlistContent.hero.title.toLowerCase()).toMatch(
        /early access|waitlist|get started/i
      );
    });

    it("submit button label indicates joining action", () => {
      expect(waitlistContent.form.submitButton.label.toLowerCase()).toMatch(
        /join|sign up|get/i
      );
    });

    it("success message indicates successful signup", () => {
      expect(waitlistContent.form.feedback.success.title.toLowerCase()).toMatch(
        /list|success|done|thank/i
      );
    });
  });
});
