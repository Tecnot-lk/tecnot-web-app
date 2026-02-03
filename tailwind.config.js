/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tecnot': {
          primary: '#4DB8A8',
          dark: '#3A9688',
          light: '#E0F7F4',
          accent: '#2DD4BF',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      screens: {
        'xs': '375px',    // Extra small phones
        'sm': '640px',    // Small devices
        'md': '768px',    // Medium devices (tablets)
        'lg': '1024px',   // Large devices (desktops)
        'xl': '1280px',   // Extra large
        '2xl': '1536px',  // 2X Extra large
      },
    },
  },
  plugins: [],
}