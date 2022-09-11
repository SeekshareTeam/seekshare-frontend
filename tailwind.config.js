// eslint-disable-next-line
const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'media', // or 'media' or 'class'
  content: [
    './src/**/*.{ts,tsx,js,html}',
    './pages/**/*.{ts,tsx,js,html}',
    './node_modules/tw-elements/dist/js/**/*.js',
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
          medium: '#a55f75',
          dark: '#74334a',
          light: '#d88da4',
        },
        night: {
          dark: colors.black,
          medium: colors.zinc['900'],
          light: colors.zinc['800'],
          extralight: colors.zinc['700'],
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
        }
      },
    },
  },
};
