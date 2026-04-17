import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

/** En producción (GitHub Pages) el sitio vive bajo /nombre-del-repo/ */
const GITHUB_PAGES_BASE = "/retro-escape-40/";

export default defineConfig(({ command }) => {
  const base = command === "build" ? GITHUB_PAGES_BASE : "/";

  return {
    base,
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["pwa-192.png", "pwa-512.png"],
        manifest: {
          id: "/retro-escape-40/",
          name: "Escape 80s - Cumple 40",
          short_name: "Escape 40",
          description: "Escape room retro con retos repartidos a lo largo del día.",
          theme_color: "#000000",
          background_color: "#020803",
          display: "standalone",
          orientation: "portrait-primary",
          start_url: base,
          scope: base,
          icons: [
            { src: "pwa-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
            { src: "pwa-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
            { src: "pwa-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
          ]
        },
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"]
        }
      })
    ]
  };
});
