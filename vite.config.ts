import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import locatorBabelJsx from "@locator/babel-jsx/dist";

// @locator/babel-jsx fayl yo'lini escape qilmasdan JS satrga qo'yadi, shuning uchun
// Windows'da "\ui\..." kabi yo'llar "Bad character escape sequence" xatosini beradi.
// Yo'llarni "/" ga o'tkazib beramiz.
type LocatorState = { filename?: string; cwd: string };
type LocatorEnter = (this: unknown, path: unknown, state: LocatorState) => void;
const toPosix = (p: string) => p.replace(/\\/g, "/");

function locatorJsx(babel: unknown) {
  const factory = (locatorBabelJsx as { default?: unknown }).default ?? locatorBabelJsx;
  const plugin = (factory as (babel: unknown) => {
    visitor: { Program: { enter: LocatorEnter } };
  })(babel);
  const { enter } = plugin.visitor.Program;

  plugin.visitor.Program.enter = function (path, state) {
    const posixState = Object.create(state, {
      filename: { value: state.filename && toPosix(state.filename) },
      cwd: { value: toPosix(state.cwd) },
    });
    return enter.call(this, path, posixState);
  };

  return plugin;
}

export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [
        // other Babel plugins
        [
          locatorJsx,
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
      // PDF preview: X-Frame-Options: SAMEORIGIN ni olib tashlaymiz
      "/certificate": {
        target: "https://api.innoweek.uz",
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on("proxyRes", (proxyRes) => {
            delete proxyRes.headers["x-frame-options"];
            delete proxyRes.headers["content-security-policy"];
          });
        },
      },
    },
  },
});
