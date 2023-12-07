import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary': '#2c595a',
        'contras-primary': '#fff',
        'secondary': '#fd6300',
        'contras-secondary': '#fff',
      }
    },
    fontSize: {
      xs: ['12px', '14px'],
      sm: ['13px', '15px'],
      base: ['14px', '16px'],
      lg: ['16px', '18px'],
      xl: ['18px', '20px'],
      '2xl': ['20px', '22px'],
      '3xl': ['22px', '24px'],

      // xs: ['13px', '15px'],
      // sm: ['14px', '16px'],
      // base: ['16px', '18px'],
      // lg: ['18px', '20px'],
      // xl: ['20px', '22px'],
      // '2xl': ['22px', '24px'],
      // '3xl': ['24px', '26px'],
    }
  },
  // plugins: [
  //   plugin(function({}) {

  //   })
  // ],
}
export default config
