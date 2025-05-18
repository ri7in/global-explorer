/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cockpit-dark': '#0A0F1E', // Deep dark blue/black for background
        'cockpit-charcoal': '#1B2130', // Slightly lighter for elements
        'cockpit-hud': '#00AFFF',    // Bright blue for accents, text, highlights
        'cockpit-accent': '#FF8C00', // Orange/amber for secondary accents
        'cockpit-light-text': '#E0E0E0', // Light grey for general text
        'cockpit-dim-text': '#A0A0A0',   // Dimmer grey for less important text
      },
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'], // A clean, technical font
        'mono': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', "Liberation Mono", "Courier New", 'monospace'], // For any code-like text
      },
      boxShadow: {
        'hud-glow': '0 0 15px 5px rgba(0, 175, 255, 0.3)',
        'accent-glow': '0 0 15px 5px rgba(255, 140, 0, 0.3)',
      }
    },
  },
  plugins: [],
}