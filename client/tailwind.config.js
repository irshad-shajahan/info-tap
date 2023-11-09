/** @type {import('tailwindcss').Config} */
import {nextui} from "@nextui-org/react";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mont: ["Montserrat", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        raleway:['Raleway', 'sans-serif'],
        readex:['Readex Pro', 'sans-serif']
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}