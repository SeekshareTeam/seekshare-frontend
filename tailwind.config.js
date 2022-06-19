module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      contrast: ["hover", "focus"],
      brightness: ["hover", "focus"],
      backgroundOpacity: ['active'],
      border: ["focus"]
    },
  },
  plugins: [],
}
