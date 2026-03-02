module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans"],
        lato: ["Lato"],
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
      },
    },
  },
  plugins: [],
  screens: {
    md: { max: "739px" },
    sm: { min: "740px" },
  },
};
