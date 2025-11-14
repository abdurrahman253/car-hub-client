/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Already there
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#06b6d4",
          "secondary": "#3b82f6",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
          "info": "#2094f3",
          "success": "#009485",
          "warning": "#ff9900",
          "error": "#ff5724",
        },
        dark: {
          "primary": "#22d3ee",
          "secondary": "#60a5fa",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#1f2937", // Dark base
          "info": "#2094f3",
          "success": "#009485",
          "warning": "#ff9900",
          "error": "#ff5724",
        },
      },
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
  },
}