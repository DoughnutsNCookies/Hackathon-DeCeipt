import type { Config } from "tailwindcss";
import templateConfig from "./template.config";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "425px",
        "3xl": "1700px",
      },
      colors: templateConfig.colors,
      animation: {
        "fade-in": "fade-in 2s ease-in-out forwards",
        "fade-up": "fade-up 2s ease-in-out forwards",
        "fade-down": "fade-down 2s ease-in-out forwards",
        "fade-left": "fade-left 2s ease-in-out forwards",
        "fade-right": "fade-right 2s ease-in-out forwards",
      },
      keyframes: {
        "fade-up": {
          "0%": {
            transform: "translateY(100%)",
            opacity: "0%",
          },
          "30%": {
            transform: "translateX(0%)",
            opacity: "100%",
          },
          "100%": {
            opacity: "100%",
          },
        },
        "fade-down": {
          "0%": {
            transform: "translateY(-100%)",
            opacity: "0%",
          },
          "30%": {
            transform: "translateX(0%)",
            opacity: "100%",
          },
          "100%": {
            opacity: "100%",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0%",
          },
          "100%": {
            opacity: "100%",
          },
        },
        "fade-left": {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0%",
          },
          "30%": {
            transform: "translateX(0%)",
            opacity: "100%",
          },
          "100%": {
            opacity: "100%",
          },
        },
        "fade-right": {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "0%",
          },
          "30%": {
            transform: "translateX(0%)",
            opacity: "100%",
          },
          "100%": {
            opacity: "100%",
          },
        },
      },
      fontFamily: templateConfig.fontFamily,
      width: {
        nextui: "1024px",
        nextuihalf: "512px",
      },
      minWidth: {
        nextui: "1024px",
        nextuihalf: "512px",
      },
      maxWidth: {
        nextui: "1024px",
        nextuihalf: "512px",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

export default config;
