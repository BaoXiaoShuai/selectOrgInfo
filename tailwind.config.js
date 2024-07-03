/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        'less50': "calc(100% - 50px)",
        'less40': "calc(100% - 40px)"
      }
    },
  },
  plugins: [],
}

