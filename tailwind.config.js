/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      animation: {
        'loading': '1.3s cubic-bezier(.55,0,.45,1) infinite loading',
      },
      backgroundImage: {
        'contributions': "url('/backgrounds/contribution.png')",
        'filters': "url('/backgrounds/filters.png')",
        'loader': "linear-gradient(to bottom, rgba(242, 242, 242, 0.50) 25%, rgba(242, 242, 242, 0.95) 85%), url('/backgrounds/points.svg')",
      },
      colors: {
        'opacifier': 'rgba(0,0,0,0.8)',
        'lighter': 'rgba(255, 255, 255, 0.20)',
      },
      fontFamily: {
        'dot': ['offbit', 'sans-serif'],
      },
      height: {
        18: '4.25rem',
        'screen': '100dvh',
      },
      lineHeight: {
        50: '0.5',
      },
      maxHeight: {
        'screen': '100dvh',
      }
    }
  },
  plugins: [],
}