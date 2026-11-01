import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08090a",
        surface: "#0e1014",
        surfaceElevated: "#14171d",
        borderSubtle: "#1f232b",
        borderHover: "#2e3440",
        textPrimary: "#f3f4f6",
        textSecondary: "#9ca3af",
        textMuted: "#6b7280",
        accentBlue: "#3b82f6",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        "7xl": "80rem",
      },
    },
  },
  plugins: [],
};
export default config;
