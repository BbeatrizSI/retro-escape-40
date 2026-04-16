import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** En producción (GitHub Pages) el sitio vive bajo /nombre-del-repo/ */
const GITHUB_PAGES_BASE = "/retro-escape-40/";

export default defineConfig(({ command }) => ({
  base: command === "build" ? GITHUB_PAGES_BASE : "/",
  plugins: [react()]
}));
