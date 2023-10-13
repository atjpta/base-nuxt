/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      keyframes: {
        timer: {
          '0%, 100%': {
            'transform': 'scale(2)',
            'opacity': '0',
          },
        },
        bounce: {
          '0%, 100%': {
            'transform': 'translateY(-10%)',
            'animation-timing-function': 'cubic - bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            'transform': 'translateY(0)',
            'animation-timing-function': 'cubic - bezier(0, 0, 0.2, 1)',
          }
        }
      },
      animation: {
        'timer': '1s linear all',
        'spin-slow': 'spin 5s linear infinite',
        'bounce-slow': 'bounce 1s infinite'

      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
    ],
  },
}

