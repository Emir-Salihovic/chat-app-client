/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        container: "#202022",
        whitePrimary: "#F9FAFC",
        greyPrimary: "#898787",
      },
    },
  },
  plugins: [],
};
