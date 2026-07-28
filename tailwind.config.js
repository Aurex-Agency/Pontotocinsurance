/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fefaf6',
          100: '#fdf4ed',
          200: '#fae7d6',
          300: '#f6d4b8',
          400: '#f1b98d',
          500: '#D2A36D',
          600: '#b88d5a',
          700: '#9e7447',
          800: '#845c39',
          900: '#6a4a2b',
        },
        // Webinar funnel palette (/webinar-1, /watch-webinar-1)
        ink: '#211D19',
        paper: '#F2F1ED',
        pine: {
          DEFAULT: '#1A5632',
          dark: '#134427',
        },
        brick: '#9A1B1B',
        secondary: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#0f2541',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Arial Black', 'sans-serif'],
        body: ['var(--font-body)', 'Verdana', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
