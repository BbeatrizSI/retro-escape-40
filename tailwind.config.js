/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        crtBg: "#0b1a6d",
        crtText: "#a7bfff",
        crtSoft: "#7f9bff",
        crtDim: "#5f78d6",
        panel: "#10227e"
      },
      boxShadow: {
        glow: "0 0 0.45rem rgba(167,191,255,0.8), 0 0 1rem rgba(100,130,255,0.35)"
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" }
        },
        flicker: {
          "0%, 100%": { opacity: "0.98" },
          "50%": { opacity: "1" },
          "20%, 70%": { opacity: "0.93" }
        }
      },
      animation: {
        scanline: "scanline 6s linear infinite",
        flicker: "flicker 0.2s infinite"
      }
    }
  },
  plugins: []
};
