import { landingContent } from "../landing";

describe("Landing Content", () => {
  describe("Hero Content", () => {
    it("has required headline", () => {
      expect(landingContent.hero.headline).toBeDefined();
      expect(landingContent.hero.headline.length).toBeGreaterThan(0);
    });

    it("has required subtext", () => {
      expect(landingContent.hero.subtext).toBeDefined();
      expect(landingContent.hero.subtext.length).toBeGreaterThan(0);
    });

    it("has primary CTA with label and href", () => {
      expect(landingContent.hero.primaryCTA.label).toBeDefined();
      expect(landingContent.hero.primaryCTA.href).toBeDefined();
      expect(landingContent.hero.primaryCTA.href).toMatch(/^\//);
    });

    it("has secondary CTA with label and href", () => {
      expect(landingContent.hero.secondaryCTA.label).toBeDefined();
      expect(landingContent.hero.secondaryCTA.href).toBeDefined();
    });

    it("has media alt text", () => {
      expect(landingContent.hero.mediaAlt).toBeDefined();
      expect(landingContent.hero.mediaAlt.length).toBeGreaterThan(0);
    });
  });

  describe("Problem Content", () => {
    it("has section title", () => {
      expect(landingContent.problem.sectionTitle).toBeDefined();
      expect(landingContent.problem.sectionTitle).toBe("THE PROBLEM");
    });

    it("has at least one problem statement", () => {
      expect(landingContent.problem.statements.length).toBeGreaterThan(0);
    });

    it("each statement has required fields", () => {
      landingContent.problem.statements.forEach((statement) => {
        expect(statement.id).toBeDefined();
        expect(statement.title).toBeDefined();
        expect(statement.description).toBeDefined();
      });
    });

    it("has unique statement ids", () => {
      const ids = landingContent.problem.statements.map((s) => s.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe("How It Works Content", () => {
    it("has section title", () => {
      expect(landingContent.howItWorks.sectionTitle).toBeDefined();
      expect(landingContent.howItWorks.sectionTitle).toBe("HOW IT WORKS");
    });

    it("has at least one step", () => {
      expect(landingContent.howItWorks.steps.length).toBeGreaterThan(0);
    });

    it("each step has required fields", () => {
      landingContent.howItWorks.steps.forEach((step) => {
        expect(step.id).toBeDefined();
        expect(step.stepNumber).toBeDefined();
        expect(step.title).toBeDefined();
        expect(step.description).toBeDefined();
      });
    });

    it("steps are numbered sequentially", () => {
      landingContent.howItWorks.steps.forEach((step, index) => {
        expect(step.stepNumber).toBe(index + 1);
      });
    });

    it("has unique step ids", () => {
      const ids = landingContent.howItWorks.steps.map((s) => s.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe("Video Demo Content", () => {
    it("has section title", () => {
      expect(landingContent.videoDemo.sectionTitle).toBeDefined();
    });

    it("has button label", () => {
      expect(landingContent.videoDemo.buttonLabel).toBeDefined();
    });

    it("has video URL", () => {
      expect(landingContent.videoDemo.videoUrl).toBeDefined();
    });

    it("has poster alt text", () => {
      expect(landingContent.videoDemo.posterAlt).toBeDefined();
      expect(landingContent.videoDemo.posterAlt.length).toBeGreaterThan(0);
    });
  });

  describe("Features Content", () => {
    it("has section title", () => {
      expect(landingContent.features.sectionTitle).toBeDefined();
      expect(landingContent.features.sectionTitle).toBe("KEY FEATURES");
    });

    it("has at least one feature", () => {
      expect(landingContent.features.features.length).toBeGreaterThan(0);
    });

    it("each feature has required fields", () => {
      landingContent.features.features.forEach((feature) => {
        expect(feature.id).toBeDefined();
        expect(feature.title).toBeDefined();
        expect(feature.description).toBeDefined();
      });
    });

    it("has unique feature ids", () => {
      const ids = landingContent.features.features.map((f) => f.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe("Bottom CTA Content", () => {
    it("has headline", () => {
      expect(landingContent.bottomCTA.headline).toBeDefined();
      expect(landingContent.bottomCTA.headline.length).toBeGreaterThan(0);
    });

    it("has subtext", () => {
      expect(landingContent.bottomCTA.subtext).toBeDefined();
      expect(landingContent.bottomCTA.subtext.length).toBeGreaterThan(0);
    });

    it("has primary CTA with label and href", () => {
      expect(landingContent.bottomCTA.primaryCTA.label).toBeDefined();
      expect(landingContent.bottomCTA.primaryCTA.href).toBeDefined();
      expect(landingContent.bottomCTA.primaryCTA.href).toMatch(/^\//);
    });
  });

  describe("Content Quality", () => {
    it("does not contain placeholder text", () => {
      const contentString = JSON.stringify(landingContent);
      expect(contentString).not.toContain("Lorem ipsum");
      expect(contentString).not.toContain("placeholder");
      expect(contentString).not.toContain("TODO");
    });

    it("all text content is meaningful", () => {
      expect(landingContent.hero.headline.length).toBeGreaterThan(10);
      expect(landingContent.hero.subtext.length).toBeGreaterThan(5);
      expect(landingContent.bottomCTA.headline.length).toBeGreaterThan(10);
    });
  });
});
