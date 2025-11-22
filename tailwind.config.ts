import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        luxuryBlack: '#0D0D0F',
        luxuryGold: '#C9A227',
        luxuryRed: '#7A0F0F',
        luxuryMaroon: '#4C0D0D',
        accentGlow: '#D9B650',
        scorchedOrange: '#E87224',
        scorchedOrangeLight: '#FF9A4A',
        offWhite: '#F5F1E6'
      },
      backgroundImage: {
        'hero-texture': "radial-gradient(circle at 30% 30%, rgba(201,162,39,0.15), transparent 60%)"
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}
export default config
