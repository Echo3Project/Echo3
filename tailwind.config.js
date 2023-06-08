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
        'filters': "url('/icons/filter.svg')",
        'filters': "url('/backgrounds/filters.png')",
      },
      colors: {
        'opacifier': 'rgba(0,0,0,0.8)',
        'lighter': 'rgba(255, 255, 255, 0.20)',
      },
      height: {
        18: '4.25rem',
        'screen': '100dvh',
      },
      maxHeight: {
        'screen': '100dvh',
      }
    }
  },
  plugins: [],
}