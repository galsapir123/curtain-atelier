import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/postcss";

export default defineConfig({
  base: "/curtain-atelier/",
  plugins: [react()],
  publicDir: "public",
  build: { outDir: "pages-dist", emptyOutDir: true, rollupOptions: { input: "pages.html" } },
  css: { postcss: { plugins: [tailwindcss()] } },
});
