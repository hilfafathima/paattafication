/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hud: {
          bg: '#0B0F19',
          card: '#131B2E',
          'card-light': '#1E293B',
          border: '#334155',
          cyan: '#06B6D4',
          'cyan-glow': '#00F0FF',
          green: '#10B981',
          'green-glow': '#00FF88',
          crimson: '#FF2E4D',
          amber: '#F59E0B',
          text: '#F8FAFC',
          muted: '#94A3B8',
          dim: '#64748B',
        }
      },
      fontFamily: {
        malayalam: ['Noto Sans Malayalam', 'sans-serif'],
        typewriter: ['Special Elite', 'Courier Prime', 'monospace'],
        serif: ['Playfair Display', 'Cinzel', 'serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'hud-cyan': '0 0 20px -5px rgba(6, 182, 212, 0.3)',
        'hud-green': '0 0 20px -5px rgba(16, 185, 129, 0.3)',
        'hud-crimson': '0 0 20px -5px rgba(255, 46, 77, 0.3)',
        'hud-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}
