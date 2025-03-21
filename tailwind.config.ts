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
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        gray: "var(--color-gray)",
        "white-dark": "var(--color-white-dark)",
        "white-light": "var(--color-white-light)",
        black: "var(--color-black)",
      },
      fontFamily: {
        sans: "var(--font-pretendard)",
      },
      fontSize: {
        "2xl": "var(--text-2xl)",
        xl: "var(--text-xl)",
        lg: "var(--text-lg)",
        md: "var(--text-md)",
        sm: "var(--text-sm)",
        ss: "var(--text-ss)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
