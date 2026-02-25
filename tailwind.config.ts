import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jetbrains: {
          bg: '#0D1117',
          text: '#E8EDF3',
          blue: '#087CFA',
          green: '#21D789',
          pink: '#FC318C',
          orange: '#FC801D',
        }
      },
      backdropFilter: {
        'blur-28': 'blur(28px)',
      }
    },
  },
  plugins: [],
}

export default config
