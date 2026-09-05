/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1B1B1E",
        navy: {
          50: "#EEF1F8",
          100: "#D6DDEF",
          200: "#AEBBDE",
          300: "#8199CD",
          400: "#4F699F",
          500: "#274A85",
          600: "#1E3A6E",
          700: "#182F5A",
          800: "#132446",
          900: "#0E1B34",
        },
        rose: {
          50: "#FCEEF3",
          100: "#F8D3E1",
          200: "#F0A7C2",
          300: "#E5749F",
          400: "#CE3D78",
          500: "#AC1A5C",
          600: "#8F144C",
          700: "#73103D",
          800: "#570C2E",
          900: "#3D0820",
        },
        sand: {
          50: "#FBF8F2",
          100: "#F4EEE1",
          200: "#E8DFC9",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-work-sans)", "sans-serif"],
      },
      borderRadius: {
        sm: "4px",
      },
    },
  },
  plugins: [],
};
