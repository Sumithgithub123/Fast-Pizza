/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      // pizza:'Roboto Mono, monospace'
      sans: "Roboto Mono, monospace",
    },
    extend: {
      // colors:{
      //   pizza:'green'
      // }
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
