/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      "4xs": "300px",
      "3xs": "350px",
      xxs: "400px",
      xs: "480px",
      ...defaultTheme.screens,
    },
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        mlg: "1000px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1536px",
      },
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        thirdClr: "var(--thirdClr)",
        thirdClrDark: "var(--thirdClrDark)",
        fourthClr: "var(--fourthClr)",
        fourthClrDark: "var(--fourthClrDark)",
        // thirdClrDark: "var(--thirdClrDark)",
        // fourthClr: "var(--fourthClr)",
        // fourthClrDark: "var(--fourthClrDark)",
      },
      boxShadow: {
        "#3": "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        "#5": "rgba(0, 0, 0, 0.7) 0px 3px 8px",
        "#6": "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        // "#5-white": "rgba(255, 255, 255, 0.3) 0px 3px 8px",
      },
      fontSize: {
        sm: "0.8rem",
        base: "1rem",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
      },
      // gridTemplateColumns: {
      //   "auto-grid": "repeat(auto-fit, minmax(120px, 2fr))",
      // },
    },
  },
  plugins: [],
};
