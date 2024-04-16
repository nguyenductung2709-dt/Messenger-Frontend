/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary_login_dark: '#000212',
        secondary_login_dark: '#191b29',
        third_login_dark: '#323441',
      },
    },
  },
  plugins: [],
}