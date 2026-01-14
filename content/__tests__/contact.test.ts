import {
  contactContent,
  type ContactPageContent,
  type ContactFormField,
} from "../contact";

describe("Contact Content", () => {
  describe("Content Structure", () => {
    it("has hero section", () => {
      expect(contactContent.hero).toBeDefined();
    });

    it("has form section", () => {
      expect(contactContent.form).toBeDefined();
    });

    it("hero has title and subtitle", () => {
      expect(contactContent.hero.title).toBeDefined();
      expect(contactContent.hero.subtitle).toBeDefined();
    });

    it("form has fields, helperText, and submitButton", () => {
      expect(contactContent.form.fields).toBeDefined();
      expect(contactContent.form.helperText).toBeDefined();
      expect(contactContent.form.submitButton).toBeDefined();
    });
  });

  describe("Hero Content", () => {
    it("has correct title", () => {
      expect(contactContent.hero.title).toBe("Contact Us");
    });

    it("has correct subtitle", () => {
      expect(contactContent.hero.subtitle).toBe("We'd love to hear from you");
    });
  });

  describe("Form Fields", () => {
    it("has three fields", () => {
      expect(contactContent.form.fields.length).toBe(3);
    });

    it("has name field", () => {
      const nameField = contactContent.form.fields.find(
        (f: ContactFormField) => f.id === "name"
      );
      expect(nameField).toBeDefined();
      expect(nameField?.type).toBe("text");
      expect(nameField?.required).toBe(true);
    });

    it("has email field", () => {
      const emailField = contactContent.form.fields.find(
        (f: ContactFormField) => f.id === "email"
      );
      expect(emailField).toBeDefined();
      expect(emailField?.type).toBe("email");
      expect(emailField?.required).toBe(true);
    });

    it("has message field", () => {
      const messageField = contactContent.form.fields.find(
        (f: ContactFormField) => f.id === "message"
      );
      expect(messageField).toBeDefined();
      expect(messageField?.type).toBe("textarea");
      expect(messageField?.required).toBe(true);
    });

    it("all fields have labels", () => {
      contactContent.form.fields.forEach((field: ContactFormField) => {
        expect(field.label).toBeDefined();
        expect(field.label.length).toBeGreaterThan(0);
      });
    });

    it("all fields have unique ids", () => {
      const ids = contactContent.form.fields.map(
        (f: ContactFormField) => f.id
      );
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe("Helper Text", () => {
    it("has helper text", () => {
      expect(contactContent.form.helperText).toBe(
        "We typically respond within 24-48 hours."
      );
    });
  });

  describe("Submit Button", () => {
    it("has submit button label", () => {
      expect(contactContent.form.submitButton.label).toBe("Send Message");
    });
  });

  describe("Type Safety", () => {
    it("content matches ContactPageContent type", () => {
      const content: ContactPageContent = contactContent;
      expect(content).toBeDefined();
    });
  });
});
