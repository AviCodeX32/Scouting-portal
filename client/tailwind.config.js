/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        krafton: {
          dark: '#080a0f',        // deepest backdrop
          surface: '#0d1117',     // main surface
          card: '#131823',        // elevated cards
          cardHover: '#1a2232',   // hover state
          border: '#1f293d',      // clean borders
          borderLight: '#2d3b55', // active borders
          gold: '#f59e0b',        // iconic Krafton gold
          goldBright: '#fbbf24',  // glowing highlights
          orange: '#f97316',      // fiery competitive
          red: '#ef4444',         // combat frags / WWCD
          emerald: '#10b981',     // placement points
          blue: '#3b82f6',        // tactical accents
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Inter', 'Impact', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'krafton-gold': '0 0 20px -3px rgba(245, 158, 11, 0.25)',
        'krafton-red': '0 0 20px -3px rgba(239, 68, 68, 0.25)',
        'card-dark': '0 10px 25px -5px rgba(0, 0, 0, 0.6)',
      }
    },
  },
  plugins: [],
}
