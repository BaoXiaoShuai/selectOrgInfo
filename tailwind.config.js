/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        'less1': "calc(100% - 1px)",
      },
      height: {
        'less50': "calc(100% - 50px)",
        'less40': "calc(100% - 40px)",
        'less30': "calc(100% - 30px)",
        'less55': "calc(100% - 55px)",
      },
      padding: {
        'px10': "10px"
      }
    },
  },
  plugins: [],
}

