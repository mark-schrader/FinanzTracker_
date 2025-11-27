/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode with 'class' strategy
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './assets/**/*.{css,scss}',
  ],
  theme: {
    extend: {
      screens: {
        custom: '500px', // eigener Breakpoint Challenge Dashboard
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
    extend: { 
      colors: {
        brand: {
          50:  '#E6F9F8',
          100: '#C4EFED',
          200: '#9BE2E0',
          300: '#6CD0D0',
          400: '#45BCBA',
          500: '#3AA6A1', //main color
          600: '#2F8E8A',
          700: '#277674',
          800: '#205F5E',
          900: '#1A4C4B',
        },
      },},
  },
  plugins: [],
}
