import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
/** En producción (GitHub Pages) el sitio vive bajo /nombre-del-repo/ */
var GITHUB_PAGES_BASE = "/retro-escape-40/";
export default defineConfig(function (_a) {
    var command = _a.command;
    return ({
        base: command === "build" ? GITHUB_PAGES_BASE : "/",
        plugins: [react()]
    });
});
