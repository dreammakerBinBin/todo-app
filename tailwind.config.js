/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        background: '#F8FAFC',
        card: '#FFFFFF',
        text: '#1E293B',
        success: '#22C55E',
        border: '#E2E8F0',
        'heat-0': '#E2E8F0',
        'heat-1': '#BBF7D0',
        'heat-2': '#86EFAC',
        'heat-3': '#22C55E',
      },
    },
  },
  plugins: [],
}
