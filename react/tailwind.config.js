/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sf-pro': ['var(--font-sf-pro-rounded)', 'SF Pro Rounded', 'system-ui', 'sans-serif'],
        'sans': ['var(--font-sf-pro-rounded)', 'SF Pro Rounded', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
