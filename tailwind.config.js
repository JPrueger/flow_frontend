module.exports = {
  // purge: ["./index.html", "./src/**/*.vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Catamaran", "Arial", "sans-serif"],
    },
    colors: {
      mainText: "#212121",
      pink: {
        main: "#99154E",
        hover: "#6F0B36"
      },
      yellow: "#FFB319",
      blueGreen: {
        light: "#49A6AA",
        dark: "#0A474A",
        darker: "#00383B"
      },
      black: "#000",
      white: "#fff",
      borderGrey: "#DEDEDE",
      grey: "#F0F0F0",
      greyLight: "#F9F9F9",
      success: "#00FEAA",
      successBackground: "#E5FFF6",
      successDarker: "#00A26D",
      error: "#FF4545",
      errorBackground: "#FEEDED",
      backgroundColor: "#6B61CC",
    },
    zIndex: {
      '-10': '-10',
      '0': 0,
      '10': 10,
      '20': 20,
      '30': 30,
      '40': 40,
      '50': 50,
      '25': 25,
      '75': 75,
      '100': 100,
      'auto': 'auto',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
