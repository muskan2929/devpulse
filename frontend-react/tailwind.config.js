/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', "monospace"],
      },
      colors: {
        terminal: {
          bg: "#0a0e0a",
          panel: "#0f1410",
          border: "#1f2a1f",
          green: "#00ff9c",
          cyan: "#00e5ff",
          dim: "#3a4a3a",
          text: "#a8c5a8",
          warn: "#ffb454",
          danger: "#ff5577",
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(0,255,156,0.25)",
      },
      animation: {
        flicker: "flicker 3s infinite",
        blink: "blink 1s steps(2) infinite",
      },
      keyframes: {
        flicker: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.92" },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
