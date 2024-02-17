/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#F35B04',
        secondary: '#595959'
      },
      fontFamily:{
        roboto: ['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [require('tailwind-scrollbar')],
}