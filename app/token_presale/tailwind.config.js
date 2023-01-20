/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cA: '#e8963a',
        cB: '#e83838',
        cC: 'white',
        cD: '#fcba03',
    }},
  },
  plugins: [],
}