/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Set VITE_BASE when hosting under a sub-path, e.g. GitHub Pages project sites:
//   VITE_BASE=/Eternal-Bharat/ npm run build
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: env.VITE_BASE || "/",
    plugins: [react(), tailwindcss()],
    test: { environment: "jsdom", globals: true, css: false },
  };
});
