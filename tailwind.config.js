module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  content: [
    './src/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}'
  ],
  // variants: {
  //   extend: {
  //     contrast: ["hover", "focus"],
  //     brightness: ["hover", "focus"],
  //     backgroundOpacity: ['active'],
  //     border: ["focus"]
  //   },
  // },
  plugins: [],
}
