/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        104: '26rem', // chiều cao 26rem
        112: '28rem', // chiều cao 28rem
        120: '30rem' // chiều cao 30rem
        // Thêm chiều cao tùy chỉnh ở đây
      },
      width: {
        '95/100': '95%'
      },
      spacing: {
        90: '21rem',
        95: '23rem'
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hidden': {
          /* Ẩn scrollbar */
          'scrollbar-width': 'none' // Firefox
        },
        '.scrollbar-hidden::-webkit-scrollbar': {
          display: 'none' // Chrome, Safari
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin' // Firefox
        },
        '.scrollbar-thin::-webkit-scrollbar': {
          width: '4px',
          height: '4px'
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb': {
          background: '#888',
          borderRadius: '4px'
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb:hover': {
          background: '#555'
        }
      })
    }
  ]
}
