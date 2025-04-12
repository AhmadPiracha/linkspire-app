// tailwind.config.js
module.exports = {
  darkMode: 'class', // enable toggling via `class="dark"` :contentReference[oaicite:1]{index=1}
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#818CF8',
        accent: '#10B981',
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
};
