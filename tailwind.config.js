module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans"],
        lato: ["Lato"],
      },
    },
  },
  plugins: [],
  screens: {
    md: { max: "739px" },
    sm: { min: "740px" },
  },
};
