import { faqContent } from "../faq";
import type { FAQPageContent, FAQItem } from "../faq";

describe("FAQ Content", () => {
  describe("Structure", () => {
    it("has required top-level properties", () => {
      expect(faqContent).toHaveProperty("hero");
      expect(faqContent).toHaveProperty("items");
      expect(faqContent).toHaveProperty("contactCTA");
    });

    it("has correct type structure", () => {
      const content: FAQPageContent = faqContent;
      expect(content).toBeDefined();
    });
  });

  describe("Hero Content", () => {
    it("has title", () => {
      expect(faqContent.hero.title).toBeDefined();
      expect(typeof faqContent.hero.title).toBe("string");
      expect(faqContent.hero.title.length).toBeGreaterThan(0);
    });

    it("has subtitle", () => {
      expect(faqContent.hero.subtitle).toBeDefined();
      expect(typeof faqContent.hero.subtitle).toBe("string");
      expect(faqContent.hero.subtitle.length).toBeGreaterThan(0);
    });
  });

  describe("FAQ Items", () => {
    it("has at least one FAQ item", () => {
      expect(faqContent.items.length).toBeGreaterThan(0);
    });

    it("all items have required properties", () => {
      faqContent.items.forEach((item: FAQItem) => {
        expect(item).toHaveProperty("id");
        expect(item).toHaveProperty("question");
        expect(item).toHaveProperty("answer");
      });
    });

    it("all items have unique ids", () => {
      const ids = faqContent.items.map((item) => item.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it("all items have non-empty questions", () => {
      faqContent.items.forEach((item: FAQItem) => {
        expect(typeof item.question).toBe("string");
        expect(item.question.length).toBeGreaterThan(0);
      });
    });

    it("all items have non-empty answers", () => {
      faqContent.items.forEach((item: FAQItem) => {
        expect(typeof item.answer).toBe("string");
        expect(item.answer.length).toBeGreaterThan(0);
      });
    });

    it("has expected number of FAQ items", () => {
      // Based on wireframe showing 6 questions
      expect(faqContent.items.length).toBe(6);
    });
  });

  describe("Contact CTA Content", () => {
    it("has headline", () => {
      expect(faqContent.contactCTA.headline).toBeDefined();
      expect(typeof faqContent.contactCTA.headline).toBe("string");
      expect(faqContent.contactCTA.headline.length).toBeGreaterThan(0);
    });

    it("has CTA with label", () => {
      expect(faqContent.contactCTA.cta).toBeDefined();
      expect(faqContent.contactCTA.cta.label).toBeDefined();
      expect(typeof faqContent.contactCTA.cta.label).toBe("string");
      expect(faqContent.contactCTA.cta.label.length).toBeGreaterThan(0);
    });

    it("has CTA with href", () => {
      expect(faqContent.contactCTA.cta.href).toBeDefined();
      expect(typeof faqContent.contactCTA.cta.href).toBe("string");
      expect(faqContent.contactCTA.cta.href.length).toBeGreaterThan(0);
    });

    it("CTA href starts with /", () => {
      expect(faqContent.contactCTA.cta.href.startsWith("/")).toBe(true);
    });
  });

  describe("Content Quality", () => {
    it("hero title matches expected value", () => {
      expect(faqContent.hero.title).toBe("FAQ");
    });

    it("hero subtitle matches expected value", () => {
      expect(faqContent.hero.subtitle).toBe("Frequently Asked Questions");
    });

    it("contact CTA headline matches expected value", () => {
      expect(faqContent.contactCTA.headline).toBe("Still have questions?");
    });

    it("contact CTA button label matches expected value", () => {
      expect(faqContent.contactCTA.cta.label).toBe("Contact Us");
    });

    it("contact CTA links to contact page", () => {
      expect(faqContent.contactCTA.cta.href).toBe("/contact");
    });
  });
});
