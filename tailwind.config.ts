import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Navy tokens -- kept for headings/accents, not used as section
        // backgrounds. The site is light-themed throughout.
        ink: "#0b0f1a",
        navy: {
          DEFAULT: "#0f1830",
          2: "#16223f",
          3: "#1c2a4d",
        },
        // Light theme surfaces
        parchment: {
          DEFAULT: "#fbfaf7",
          2: "#f3f0e8",
          3: "#ece7d9",
        },
        // Brass/gold accent -- the signature Qamira color, used for
        // eyebrows, underlines, active states, icons.
        brass: {
          DEFAULT: "#b8863a",
          bright: "#c69a4e",
          dim: "#8a6a37",
        },
        slate: {
          teal: "#3e6f6f",
          "teal-bright": "#5c9797",
        },
        // Text on light surfaces
        charcoal: {
          DEFAULT: "#14182a",
          dim: "#4b4f60",
        },
        // Reserved for any future dark surface; unused by default styling
        cream: {
          DEFAULT: "#ece8dd",
          dim: "#b7b6ae",
        },
      },
      fontFamily: {
        display: ["Fraunces", "Iowan Old Style", "Georgia", "serif"],
        body: ["IBM Plex Sans", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["IBM Plex Mono", "SFMono-Regular", "Menlo", "monospace"],
      },
      maxWidth: {
        content: "1280px",
      },
      transitionTimingFunction: {
        signature: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(184,134,58,0.10), transparent 60%), linear-gradient(180deg, #ffffff 0%, #fbfaf7 100%)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(20, 24, 42, 0.04)",
      },
    },
  },
  plugins: [],
} satisfies Config;
