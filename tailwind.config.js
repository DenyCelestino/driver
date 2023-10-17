/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        cinza: {
          100: '#F2F2F2',
          200: '#DCDCDC'
        },
        dark: {
          100: '#202024',
          200: '#121214'
        }
      }
    }
  },
  plugins: []
}
