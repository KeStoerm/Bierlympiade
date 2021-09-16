module.exports = {
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    safelist: ['hidden', 'text-red-700', 'bg-red-700', 'bg-green-700']
  },
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f5f2eb'
        },
        secondary: {
          DEFAULT: '#4d4d4d'
        },
        accent: {
          DEFAULT: '#dfcaa1'
        },
        background: {
          DEFAULT: '#f5f2eb'
        },
      },
    }
  }
}
