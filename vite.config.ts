import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import pluginChecker from "vite-plugin-checker";

export default defineConfig({
  plugins: [
    pluginChecker({ typescript: true }),
    react(),
    svgr({
      include: "**/*.svg",
    }),
  ],
});
