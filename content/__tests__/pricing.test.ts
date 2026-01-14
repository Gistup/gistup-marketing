import { pricingContent } from "../pricing";

describe("Pricing Content", () => {
  describe("Hero Content", () => {
    it("has required title", () => {
      expect(pricingContent.hero.title).toBeDefined();
      expect(pricingContent.hero.title.length).toBeGreaterThan(0);
    });

    it("has required subtitle", () => {
      expect(pricingContent.hero.subtitle).toBeDefined();
      expect(pricingContent.hero.subtitle.length).toBeGreaterThan(0);
    });

    it("has yearly savings percentage", () => {
      expect(pricingContent.hero.yearlySavingsPercent).toBeDefined();
      expect(pricingContent.hero.yearlySavingsPercent).toBeGreaterThan(0);
      expect(pricingContent.hero.yearlySavingsPercent).toBeLessThanOrEqual(100);
    });
  });

  describe("Pricing Tiers", () => {
    it("has at least one pricing tier", () => {
      expect(pricingContent.tiers.length).toBeGreaterThan(0);
    });

    it("has exactly three tiers (Free, Pro, Business)", () => {
      expect(pricingContent.tiers.length).toBe(3);
      const tierNames = pricingContent.tiers.map((t) => t.name);
      expect(tierNames).toContain("Free");
      expect(tierNames).toContain("Pro");
      expect(tierNames).toContain("Business");
    });

    it("each tier has required fields", () => {
      pricingContent.tiers.forEach((tier) => {
        expect(tier.id).toBeDefined();
        expect(tier.name).toBeDefined();
        expect(tier.features).toBeDefined();
        expect(tier.features.length).toBeGreaterThan(0);
        expect(tier.cta).toBeDefined();
        expect(tier.cta.label).toBeDefined();
        expect(tier.cta.href).toBeDefined();
      });
    });

    it("has unique tier ids", () => {
      const ids = pricingContent.tiers.map((t) => t.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it("Free tier has $0 pricing", () => {
      const freeTier = pricingContent.tiers.find((t) => t.name === "Free");
      expect(freeTier).toBeDefined();
      expect(freeTier?.monthlyPrice).toBe(0);
      expect(freeTier?.yearlyPrice).toBe(0);
    });

    it("Pro tier has numeric pricing", () => {
      const proTier = pricingContent.tiers.find((t) => t.name === "Pro");
      expect(proTier).toBeDefined();
      expect(proTier?.monthlyPrice).toBeGreaterThan(0);
      expect(proTier?.yearlyPrice).toBeGreaterThan(0);
    });

    it("Business tier has custom pricing", () => {
      const businessTier = pricingContent.tiers.find((t) => t.name === "Business");
      expect(businessTier).toBeDefined();
      expect(businessTier?.monthlyPrice).toBeNull();
      expect(businessTier?.yearlyPrice).toBeNull();
      expect(businessTier?.priceLabel).toBeDefined();
    });

    it("yearly price is less than or equal to monthly price", () => {
      pricingContent.tiers.forEach((tier) => {
        if (tier.monthlyPrice !== null && tier.yearlyPrice !== null) {
          expect(tier.yearlyPrice).toBeLessThanOrEqual(tier.monthlyPrice);
        }
      });
    });

    it("each feature has required fields", () => {
      pricingContent.tiers.forEach((tier) => {
        tier.features.forEach((feature) => {
          expect(feature.id).toBeDefined();
          expect(feature.text).toBeDefined();
          expect(feature.text.length).toBeGreaterThan(0);
        });
      });
    });

    it("has unique feature ids within each tier", () => {
      pricingContent.tiers.forEach((tier) => {
        const ids = tier.features.map((f) => f.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
      });
    });

    it("CTA hrefs start with /", () => {
      pricingContent.tiers.forEach((tier) => {
        expect(tier.cta.href).toMatch(/^\//);
      });
    });
  });

  describe("Feature Comparison", () => {
    it("has section title", () => {
      expect(pricingContent.featureComparison.sectionTitle).toBeDefined();
      expect(pricingContent.featureComparison.sectionTitle.length).toBeGreaterThan(0);
    });

    it("has at least one comparison feature", () => {
      expect(pricingContent.featureComparison.features.length).toBeGreaterThan(0);
    });

    it("each comparison feature has required fields", () => {
      pricingContent.featureComparison.features.forEach((feature) => {
        expect(feature.id).toBeDefined();
        expect(feature.name).toBeDefined();
        expect(typeof feature.free).toBe("boolean");
        expect(typeof feature.pro).toBe("boolean");
        expect(typeof feature.business).toBe("boolean");
      });
    });

    it("has unique comparison feature ids", () => {
      const ids = pricingContent.featureComparison.features.map((f) => f.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe("Bottom CTA", () => {
    it("has headline", () => {
      expect(pricingContent.bottomCTA.headline).toBeDefined();
      expect(pricingContent.bottomCTA.headline.length).toBeGreaterThan(0);
    });

    it("has CTA with label and href", () => {
      expect(pricingContent.bottomCTA.cta.label).toBeDefined();
      expect(pricingContent.bottomCTA.cta.href).toBeDefined();
      expect(pricingContent.bottomCTA.cta.href).toMatch(/^\//);
    });
  });

  describe("Content Quality", () => {
    it("does not contain placeholder text", () => {
      const contentString = JSON.stringify(pricingContent);
      expect(contentString).not.toContain("Lorem ipsum");
      expect(contentString).not.toContain("placeholder");
      expect(contentString).not.toContain("TODO");
    });

    it("all text content is meaningful", () => {
      expect(pricingContent.hero.title.length).toBeGreaterThan(3);
      expect(pricingContent.hero.subtitle.length).toBeGreaterThan(10);
      expect(pricingContent.bottomCTA.headline.length).toBeGreaterThan(10);
    });
  });
});
