import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#f6f4ef",
          100: "#ece7dc",
          200: "#dcd3c1",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted: "#f6f4ef",
        },
        ink: {
          DEFAULT: "#2a2e33",
          soft: "#5a6168",
          muted: "#8a9098",
        },
        teal: {
          DEFAULT: "#1f6f6b",
          dark: "#15514e",
          soft: "#e2efed",
        },
        coral: {
          DEFAULT: "#e2774a",
          dark: "#c75e34",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(42,46,51,0.04), 0 8px 24px rgba(42,46,51,0.06)",
        soft: "0 2px 10px rgba(42,46,51,0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
