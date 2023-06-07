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