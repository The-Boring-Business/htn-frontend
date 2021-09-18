module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        "landing-page": "url('/landing_page.svg')",
      },
    },
    fontWeight: {
      medium: 500,
      "semi-bold": 600,
      bold: 700,
    },
    colors: {
      gray: "#717579",
      blue: "#0D34FF",
      red: "#EB5757",
      background: "#FBFBFB",
      white: "#FFFFFF",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
