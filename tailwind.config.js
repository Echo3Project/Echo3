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
            'darker': 'rgba(45, 45, 45, 0.15)',
            'light': 'rgba(242, 242, 242, 0.95)',
            'lighter': 'rgba(255, 255, 255, 0.20)',
            'opacifier': 'rgba(0,0,0,0.8)',
            'black-app': 'rgba(45, 45, 45, 1)',
            'white-app': 'rgba(237, 235, 233, 1)',
            'gray-app': 'rgba(147, 147, 147, 1)',
            'green-app': 'rgba(193, 144, 19, 1)',
            'background-app': 'linear-gradient(167.81deg, rgba(242, 242, 242, 0.95) 31.05 %, rgba(242, 242, 242, 0.95) 80.87 %)'
        },

        fontFamily: {
            'dot': ['offbit', 'sans-serif'],
            'jwsans': ['jw sans', 'sans-serif'],
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
