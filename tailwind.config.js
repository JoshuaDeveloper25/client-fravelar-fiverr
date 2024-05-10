/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#DB0505",
        "primary-dark": "#917072",
        "primary-light": "#FFEDEC"
      },
    },
  },
  plugins: [],
};
