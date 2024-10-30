/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        homeBannerBg: "url('/src/Assets/Images/HomeBannerBackground.png')",
      },
      colors: {
        orange: "#f38328",
        black: "#272727",
        lightgrey: "#525252",
        darkgrey: "#363636",
        beige: "#fffbf8",
        lime: {
          400: "#65A141",
        },
      },
      screens: {
        xs: "0px",
        ...defaultTheme.screens,
      },
      fontSize: {
        heading1: "35px",
        heading2: "26px",
      },
    },
  },
  plugins: [],
};
