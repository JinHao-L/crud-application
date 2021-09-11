module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    textColor: {
      white: "#FFF",
      black: "#000",
    },
    extend: {
      height: theme => ({
        "notesHeight": "calc(100vh - 128px)"
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
