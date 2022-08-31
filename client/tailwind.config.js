/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.7s ease-out'
      },
      keyframes: {
        fadeIn: {
          from: { transform: 'translateY(25%)', opacity: 0.1 },
          to: { transform: 'translateY(0%)', opacity: 1 },
        }
      }
    },
  },
  plugins: [],
}