/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      roboto: ["Roboto", 'sans-serif']
    },
    extend: {
      backgroundImage: {
        'main': "url('../assets/bg.jpg')"
      },
      colors: {
        light: {
          300: '#f4f4f488',
          400: '#f1f1f1',
          500: '#f4f4f4'
        }
      },
    },
  },
  plugins: [],
}