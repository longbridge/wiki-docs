import colors from "tailwindcss/colors";
delete colors.lightBlue
delete colors.warmGray
delete colors.trueGray
delete colors.coolGray
delete colors.blueGray

export default {
  content: [
    "./src/**/*.{js,scss,css,ts,tsx,jsx,mdx}",
    "./i18n/**/*.{js,scss,css,ts,tsx,jsx,mdx}",
    "./docs/**/*.{js,scss,css,ts,tsx,jsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "copy-link-hover": "url('/img/hero-pattern.svg')",
        "copy-link": "url('/img/footer-texture.png')"
      }
    },
    colors: {
      ...colors,
      // https://uicolors.app/create
      blue: {
        50: "#eef8ff",
        100: "#d9f0ff",
        200: "#bce5ff",
        300: "#8ed5ff",
        400: "#59bcff",
        500: "#37a0ff",
        600: "#1b7ff5",
        700: "#1468e1",
        800: "#1753b6",
        900: "#19488f"
      },
      red: {
        50: "#fff0f0",
        100: "#ffdddd",
        200: "#ffc0c0",
        300: "#ff9494",
        400: "#ff5757",
        500: "#ff2323",
        600: "#ff0000",
        700: "#d70000",
        800: "#b10303",
        900: "#920a0a"
      },
      yellow: {
        50: "#fffbeb",
        100: "#fef3c7",
        200: "#fee789",
        300: "#fdd54c",
        400: "#fcc123",
        500: "#ea9708",
        600: "#da7805",
        700: "#b55408",
        800: "#93410d",
        900: "#79350e"
      }
    }
  }
};
