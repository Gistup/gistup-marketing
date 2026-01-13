import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        primary: {
          DEFAULT: "#4F46E5", // Indigo
          hover: "#4338CA", // Dark Indigo
          accent: "#6366F1", // Soft Indigo
        },
        // Neutral & Background Colors
        background: {
          main: "#FFFFFF",
          secondary: "#F9FAFB",
        },
        border: {
          DEFAULT: "#E5E7EB", // Neutral Gray
        },
        // Text Colors
        text: {
          primary: "#111827", // Near Black
          secondary: "#4B5563", // Dark Gray
          muted: "#6B7280", // Gray
          inverse: "#FFFFFF", // White
        },
        // Status Colors
        status: {
          success: "#22C55E",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      fontSize: {
        h1: ["48px", { lineHeight: "1.2", fontWeight: "700" }],
        h2: ["32px", { lineHeight: "1.3", fontWeight: "600" }],
        h3: ["24px", { lineHeight: "1.4", fontWeight: "500" }],
        body: ["16px", { lineHeight: "1.6" }],
        small: ["14px", { lineHeight: "1.5" }],
      },
      borderRadius: {
        button: "6px",
      },
    },
  },
  plugins: [],
} satisfies Config;
