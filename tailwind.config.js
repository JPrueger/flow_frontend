module.exports = {
  purge: ["./index.html", "./src/**/*.vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Catamaran", "Arial", "sans-serif"],
    },
    colors: {
      mainText: "#212121",
      pink: "#99154E",
      yellow: "#FFB319",
      blueGreen: {
        light: "#49A6AA",
        dark: "#0A474A",
      },
      black: "#000",
      white: "#fff",
      borderGrey: "#DEDEDE",
      success: "#00FEAA",
      successBackground: "#E5FFF6",
      successDarker: "#00A26D",
      error: "#FF4545",
      errorBackground: "#FEEDED",
      backgroundColor: "#6B61CC",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
