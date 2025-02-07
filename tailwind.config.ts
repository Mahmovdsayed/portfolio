import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            default: {
              DEFAULT: "#000000",
              foreground: "#fff",
            },
            focus: "#000000",
          },
        },
        dark: {
          colors: {
            default: {
              DEFAULT: "#fff",
              foreground: "#000000",
            },
            focus: "#fff",
          },
        },
      },
    }),
  ],
} satisfies Config;
