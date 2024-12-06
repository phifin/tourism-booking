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
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
