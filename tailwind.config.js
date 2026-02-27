/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          blue: '#1a4480',
          'blue-light': '#2378c3',
          'blue-dark': '#162e51',
          red: '#d83933',
          gold: '#ffbe2e',
          'gray-cool': '#3d4551',
          'gray-light': '#f0f0f0',
          'gray-mid': '#dfe1e2',
          white: '#ffffff',
        }
      },
      fontFamily: {
        sans: ['Source Sans Pro', 'Helvetica Neue', 'Helvetica', 'Roboto', 'Arial', 'sans-serif'],
        georgian: ['BPG Nino Mkhedruli', 'DejaVu Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
