/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        container: "#202022",
        whitePrimary: "#F9FAFC",
        greyPrimary: "#898787",
        boxGrey: "#EEEEF8",
        messageText: "#6D6FEC",
        messageContainerGuest: "#EEEEF8",
        messageContainerSender: "#7678ED",
      },
      backgroundImage: {
        modalOverlay:
          "linear-gradient(to bottom, rgba(0, 0, 0, .1), rgba(0, 0, 0, .3))",
      },
    },
  },
  plugins: [],
};
