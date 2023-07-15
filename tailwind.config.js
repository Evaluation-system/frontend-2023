/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        tilt: "tilt 7s infinite linear",
      },
      keyframes: {
        tilt: {
          "0%, 50%, 100%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(1deg)",
          },
          "75%": {
            transform: "rotate(-1deg)",
          },
        },
      },
      lineHeight: {
        h1XL: "80.19px",
        h2XL: "40.1px",
        h3XL: "30.07px",
        h4XL: "25.06px",
        h1: "30.06px",
        input: "22.55px",
      },
    },
    fontFamily: {
      geo: ["Geologica", "sans-serif"],
    },
    colors: {
      primary: "#1B1B23",
      secondary: "#FFFFFF",
      gray: "#FFFFFF80",
      gradient: "linear-gradient(90deg, #D2459D -13.66%, #4383FF 100%)",
      red: "#FF7777CC",
      blue: "#4383FF",
      gree: "#3ae374",
      modal: "#00000079",
    },
  },
  plugins: [require("tailwindcss-counter")()],
};
