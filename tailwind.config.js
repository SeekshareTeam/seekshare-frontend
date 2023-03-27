// eslint-disable-next-line
const colors = require('tailwindcss/colors');
// eslint-disable-next-line
const svgToDataUri = require('mini-svg-data-uri');

// primary: {
//   medium: '#a55f75',
//   dark: '#74334a',
//   light: '#d88da4',
// },

module.exports = {
  darkMode: 'media', // or 'media' or 'class'
  content: [
    './src/**/*.{ts,tsx,js,html}',
    './pages/**/*.{ts,tsx,js,html}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  safelist: [
    {
      pattern: /(from|via|to|bg)-(black|white)/,
    },
    {
      pattern: /(from|via|to|bg)-(.+)-([1-9]00)/,
    },
    // {
    //   pattern: /(text|border)-(.+)-([1-9]00)/,
    //   variants: ['dark', 'hover', 'dark:hover']
    // },
  ],
  plugins: [require('tw-elements/dist/plugin')],
  theme: {
    extend: {
      colors: {
        lightpen: {
          dark: colors.gray['800'],
          medium: colors.gray['700'],
          light: colors.gray['600'],
        },
        darkpen: {
          extradark: colors.gray['500'],
          dark: colors.gray['400'],
          medium: colors.gray['200'],
          light: colors.gray['100'],
          extralight: colors.white,
        },
        primary: {
          medium: colors.emerald['700'],
          dark: colors.emerald['900'],
          light: colors.emerald['500'],
        },
        night: {
          dark: colors.slate['900'],
          medium: colors.slate['800'],
          light: colors.slate['700'],
          extralight: colors.slate['600'],
        },
        dusk: {
          medium: colors.gray['700'],
          dark: colors.gray['800'],
          light: colors.gray['600'],
        },
        secondary: {
          medium: '#00796b',
          dark: '#004c40',
          light: '#48a999',
        },
        link: {
          medium: colors.blue['400'],
          dark: colors.blue['600'],
          light: colors.blue['200'],
        },
      },
      backgroundImage: (theme) => ({
        squiggle: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 3" enable-background="new 0 0 6 3" width="6" height="3" fill="${theme(
            'colors.yellow.400'
          )}"><polygon points="5.5,0 2.5,3 1.1,3 4.1,0"/><polygon points="4,0 6,2 6,0.6 5.4,0"/><polygon points="0,2 1,3 2.4,3 0,0.6"/></svg>`
        )}")`,
      }),
    },
  },
};
