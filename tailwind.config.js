/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'filters': "url('/icons/filter.svg')",
      },
      height: {
        'screen': '100dvh',
      },
      maxHeight: {
        'screen': '100dvh',
      }
    }
  },
  plugins: [],
}