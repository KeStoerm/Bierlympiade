const possibleTeamColors = ['red', 'yellow', 'green', 'blue', 'purple', 'pink']

module.exports = {
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    safelist: ['hidden', ...possibleTeamColors.map((color) => `text-${color}-700`), ...possibleTeamColors.map((color) => `bg-${color}-700`)]
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
