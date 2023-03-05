/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      rotate: {
        30: "30deg",
        15: "15deg",
      },
      gap: {
        m3: "-0.75rem",
      },
      animation: {
        photoleft: "photoleft 2s ease-in-out",
        photoright: "photoright 2s ease-in-out",
      },
      keyframes: {
        photoleft: {
          "0%": { transform: "rotate(0)" },
          "100%": { transform: "rotate(-15deg)" },
        },
        photoright: {
          "0%": { transform: "rotate(0)" },
          "100%": { transform: "rotate(15deg)" },
        },
      },
    },
  },
  plugins: [],
};
