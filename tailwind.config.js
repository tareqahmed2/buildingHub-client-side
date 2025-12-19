/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"), // DaisyUI ব্যবহার না করলে এই লাইন remove করো
  ],
  daisyui: {
    themes: "all", // সব DaisyUI theme
  },
};
