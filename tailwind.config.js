/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "special-pink":
          "rgba(240, 46, 170, 0.4) -5px 5px, rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px, rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px",
        sharp: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
      },
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      vt323: ["VT323", "Roboto", "sans-serif"],
    },
  },
  plugins: [],
};
