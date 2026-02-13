import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        "neon-green": "#00ff41",
        "neon-cyan": "#00d4ff",
        "cyber-dark": "#0a0a0f",
        "cyber-card": "#111118",
        "cyber-border": "#1a1a2e",
      },
      fontFamily: {
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "text-flicker": {
          "0%, 100%": { opacity: "1" },
          "33%": { opacity: "0.95" },
          "66%": { opacity: "0.85" },
        },
        "border-glow": {
          "0%, 100%": { borderColor: "#00ff41" },
          "50%": { borderColor: "#00d4ff" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "text-flicker": "text-flicker 3s ease-in-out infinite",
        "border-glow": "border-glow 3s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        blink: "blink 1s step-end infinite",
      },
      boxShadow: {
        "neon-green": "0 0 5px #00ff41, 0 0 20px rgba(0, 255, 65, 0.3)",
        "neon-cyan": "0 0 5px #00d4ff, 0 0 20px rgba(0, 212, 255, 0.3)",
        "neon-green-lg":
          "0 0 10px #00ff41, 0 0 40px rgba(0, 255, 65, 0.4), 0 0 80px rgba(0, 255, 65, 0.1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
export default config;
