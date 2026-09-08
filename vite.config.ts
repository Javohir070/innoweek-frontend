import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [
        // other Babel plugins
        [
          "@locator/babel-jsx/dist",
          {
            env: "development",
          },
        ],
      ],
    },
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  server: {
    port: 3000,
    proxy: {
      "/api-ixtiro": {
        target: "https://api-ixtiro.ilmiy.uz",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api-ixtiro/, ""),
      },
      "/api-tijorat": {
        target: "https://back-tijorat.ilmiy.uz",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api-tijorat/, ""),
      },
      "/api-internship": {
        target: "https://api-internship.ilmiy.uz",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api-internship/, ""),
      },
    },
  },
});
