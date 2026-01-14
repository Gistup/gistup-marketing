import { privacyContent } from "../privacy";
import type { PrivacyPageContent, PrivacySection } from "../privacy";

describe("Privacy Content", () => {
  describe("Structure", () => {
    it("has required top-level properties", () => {
      expect(privacyContent).toHaveProperty("hero");
      expect(privacyContent).toHaveProperty("sections");
    });

    it("has correct type structure", () => {
      const content: PrivacyPageContent = privacyContent;
      expect(content).toBeDefined();
    });
  });

  describe("Hero Content", () => {
    it("has title", () => {
      expect(privacyContent.hero.title).toBeDefined();
      expect(typeof privacyContent.hero.title).toBe("string");
      expect(privacyContent.hero.title.length).toBeGreaterThan(0);
    });

    it("has lastUpdated date", () => {
      expect(privacyContent.hero.lastUpdated).toBeDefined();
      expect(typeof privacyContent.hero.lastUpdated).toBe("string");
      expect(privacyContent.hero.lastUpdated.length).toBeGreaterThan(0);
    });

    it("hero title matches expected value", () => {
      expect(privacyContent.hero.title).toBe("Privacy Policy");
    });
  });

  describe("Privacy Sections", () => {
    it("has at least one section", () => {
      expect(privacyContent.sections.length).toBeGreaterThan(0);
    });

    it("all sections have required properties", () => {
      privacyContent.sections.forEach((section: PrivacySection) => {
        expect(section).toHaveProperty("id");
        expect(section).toHaveProperty("title");
        expect(section).toHaveProperty("content");
      });
    });

    it("all sections have unique ids", () => {
      const ids = privacyContent.sections.map((section) => section.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it("all sections have non-empty titles", () => {
      privacyContent.sections.forEach((section: PrivacySection) => {
        expect(typeof section.title).toBe("string");
        expect(section.title.length).toBeGreaterThan(0);
      });
    });

    it("all sections have non-empty content", () => {
      privacyContent.sections.forEach((section: PrivacySection) => {
        expect(typeof section.content).toBe("string");
        expect(section.content.length).toBeGreaterThan(0);
      });
    });

    it("has expected number of sections based on wireframe", () => {
      // Based on wireframe showing 8 sections
      expect(privacyContent.sections.length).toBe(8);
    });

    it("has all required sections from wireframe", () => {
      const expectedSections = [
        "introduction",
        "information-we-collect",
        "how-we-use-information",
        "cookies-and-tracking",
        "data-sharing",
        "data-security",
        "your-rights",
        "contact-information",
      ];

      const sectionIds = privacyContent.sections.map((section) => section.id);
      expectedSections.forEach((expectedId) => {
        expect(sectionIds).toContain(expectedId);
      });
    });
  });

  describe("Content Quality", () => {
    it("Introduction section exists and has meaningful content", () => {
      const introSection = privacyContent.sections.find(
        (s) => s.id === "introduction"
      );
      expect(introSection).toBeDefined();
      expect(introSection?.title).toBe("Introduction");
      expect(introSection?.content.length).toBeGreaterThan(50);
    });

    it("Information We Collect section exists", () => {
      const section = privacyContent.sections.find(
        (s) => s.id === "information-we-collect"
      );
      expect(section).toBeDefined();
      expect(section?.title).toBe("Information We Collect");
    });

    it("How We Use Information section exists", () => {
      const section = privacyContent.sections.find(
        (s) => s.id === "how-we-use-information"
      );
      expect(section).toBeDefined();
      expect(section?.title).toBe("How We Use Information");
    });

    it("Cookies & Tracking section exists", () => {
      const section = privacyContent.sections.find(
        (s) => s.id === "cookies-and-tracking"
      );
      expect(section).toBeDefined();
      expect(section?.title).toBe("Cookies & Tracking");
    });

    it("Data Sharing section exists", () => {
      const section = privacyContent.sections.find(
        (s) => s.id === "data-sharing"
      );
      expect(section).toBeDefined();
      expect(section?.title).toBe("Data Sharing");
    });

    it("Data Security section exists", () => {
      const section = privacyContent.sections.find(
        (s) => s.id === "data-security"
      );
      expect(section).toBeDefined();
      expect(section?.title).toBe("Data Security");
    });

    it("Your Rights section exists", () => {
      const section = privacyContent.sections.find(
        (s) => s.id === "your-rights"
      );
      expect(section).toBeDefined();
      expect(section?.title).toBe("Your Rights");
    });

    it("Contact Information section exists", () => {
      const section = privacyContent.sections.find(
        (s) => s.id === "contact-information"
      );
      expect(section).toBeDefined();
      expect(section?.title).toBe("Contact Information");
    });
  });
});
