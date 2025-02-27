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
  darkMode: 'class', // or 'media' or 'class'
  content: [
    './src/**/*.{ts,tsx,js,html,css}',
    './node_modules/tw-elements/dist/js/**/*.js',
    './node_modules/theme-nord/**/*.{ts,tsx,js,html,css}',
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
  plugins: [
    require('tw-elements/dist/plugin'),
    require('tailwind-nord'),
    require('@tailwindcss/typography'),
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'table-1': 'repeat(1, minmax(128px, 1fr))',
        'table-2': 'repeat(2, minmax(128px, 1fr))',
        'table-3': 'repeat(3, minmax(128px, 1fr))',
        'table-4': 'repeat(4, minmax(128px, 1fr))',
        'table-5': 'repeat(5, minmax(128px, 1fr))',
        'table-6': 'repeat(6, minmax(128px, 1fr))',
        'table-7': 'repeat(7, minmax(128px, 1fr))',
        'table-8': 'repeat(8, minmax(128px, 1fr))',
        'table-8': 'repeat(9, minmax(128px, 1fr))',
        'table-10': 'repeat(10, minmax(128px, 1fr))',
        'table-11': 'repeat(11, minmax(128px, 1fr))',
        'table-12': 'repeat(12, minmax(128px, 1fr))',
      },
      /*
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
          dark: colors.zinc['900'],
          medium: colors.zinc['800'],
          light: colors.zinc['700'],
          extralight: colors.zinc['600'],
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
      */
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
