/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
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