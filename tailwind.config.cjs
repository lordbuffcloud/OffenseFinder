/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#f2d8d8",
        secondary: "#5c8984",
        tertiary: "#545b77",
        "black-100": "#374259",
        "black-200": "#374259",
        "white-100": "#f2d8d8",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #374259",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};
