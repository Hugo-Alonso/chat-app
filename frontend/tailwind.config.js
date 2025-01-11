import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"], // Asegúrate de incluir todas las extensiones relevantes
  theme: {
    extend: {},
  },
  plugins: [
    daisyui
  ],
};
