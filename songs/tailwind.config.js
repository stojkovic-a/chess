/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#c2185b',
        'primary-hover': '#e1377a',
        'primary-focus': '#e1377a',
        'secondary': '#424242',
        'secondary-hover': '#525252',
        'secondary-focus': '#525252',
        'dark-square': '#3e5c4a',
        'light-square': '#f0d9b5',

      },
      backgroundImage: {
        'chess': "url('./assets/img/landing.jpg')",
      }
    },
  },
  plugins: [],
}
