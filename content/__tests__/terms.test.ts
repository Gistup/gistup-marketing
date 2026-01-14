import { termsContent } from "../terms";
import type { TermsPageContent, TermsSection } from "../terms";

describe("Terms Content", () => {
  describe("Structure", () => {
    it("has required top-level properties", () => {
      expect(termsContent).toHaveProperty("hero");
      expect(termsContent).toHaveProperty("sections");
    });

    it("has correct type structure", () => {
      const content: TermsPageContent = termsContent;
      expect(content).toBeDefined();
    });
  });

  describe("Hero Content", () => {
    it("has title", () => {
      expect(termsContent.hero.title).toBeDefined();
      expect(typeof termsContent.hero.title).toBe("string");
      expect(termsContent.hero.title.length).toBeGreaterThan(0);
    });

    it("has lastUpdated date", () => {
      expect(termsContent.hero.lastUpdated).toBeDefined();
      expect(typeof termsContent.hero.lastUpdated).toBe("string");
      expect(termsContent.hero.lastUpdated.length).toBeGreaterThan(0);
    });

    it("hero title matches expected value", () => {
      expect(termsContent.hero.title).toBe("Terms of Service");
    });
  });

  describe("Terms Sections", () => {
    it("has at least one section", () => {
      expect(termsContent.sections.length).toBeGreaterThan(0);
    });

    it("all sections have required properties", () => {
      termsContent.sections.forEach((section: TermsSection) => {
        expect(section).toHaveProperty("id");
        expect(section).toHaveProperty("title");
        expect(section).toHaveProperty("content");
      });
    });

    it("all sections have unique ids", () => {
      const ids = termsContent.sections.map((section) => section.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it("all sections have non-empty titles", () => {
      termsContent.sections.forEach((section: TermsSection) => {
        expect(typeof section.title).toBe("string");
        expect(section.title.length).toBeGreaterThan(0);
      });
    });

    it("all sections have non-empty content", () => {
      termsContent.sections.forEach((section: TermsSection) => {
        expect(typeof section.content).toBe("string");
        expect(section.content.length).toBeGreaterThan(0);
      });
    });

    it("has expected number of sections based on wireframe", () => {
      // Based on wireframe showing 7 sections
      expect(termsContent.sections.length).toBe(7);
    });

    it("has all required sections from wireframe", () => {
      const expectedSections = [
        "acceptance-of-terms",
        "use-license",
        "user-accounts",
        "service-description",
        "intellectual-property",
        "limitation-of-liability",
        "governing-law",
      ];

      const sectionIds = termsContent.sections.map((section) => section.id);
      expectedSections.forEach((expectedId) => {
        expect(sectionIds).toContain(expectedId);
      });
    });
  });

  describe("Content Quality", () => {
    it("Acceptance of Terms section exists and has meaningful content", () => {
      const section = termsContent.sections.find(
        (s) => s.id === "acceptance-of-terms"
      );
      expect(section).toBeDefined();
      expect(section?.title).toBe("Acceptance of Terms");
      expect(section?.content.length).toBeGreaterThan(50);
    });

    it("Use License section exists", () => {
      const section = termsContent.sections.find(
        (s) => s.id === "use-license"
      );
      expect(section).toBeDefined();
      expect(section?.title).toBe("Use License");
    });

    it("User Accounts section exists", () => {
      const section = termsContent.sections.find(
        (s) => s.id === "user-accounts"
      );
      expect(section).toBeDefined();
      expect(section?.title).toBe("User Accounts");
    });

    it("Service Description section exists", () => {
      const section = termsContent.sections.find(
        (s) => s.id === "service-description"
      );
      expect(section).toBeDefined();
      expect(section?.title).toBe("Service Description");
    });

    it("Intellectual Property section exists", () => {
      const section = termsContent.sections.find(
        (s) => s.id === "intellectual-property"
      );
      expect(section).toBeDefined();
      expect(section?.title).toBe("Intellectual Property");
    });

    it("Limitation of Liability section exists", () => {
      const section = termsContent.sections.find(
        (s) => s.id === "limitation-of-liability"
      );
      expect(section).toBeDefined();
      expect(section?.title).toBe("Limitation of Liability");
    });

    it("Governing Law section exists", () => {
      const section = termsContent.sections.find(
        (s) => s.id === "governing-law"
      );
      expect(section).toBeDefined();
      expect(section?.title).toBe("Governing Law");
    });
  });
});
