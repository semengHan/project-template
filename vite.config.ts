import path from "path";
import { defineConfig } from "vite";
import autoImport from "unplugin-auto-import/vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: 'public',
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        math: "always",
        globalVars: {},
        // 支持内联 JavaScript
        javascriptEnabled: true,
        sourceMap: true,
      },
    },
    modules: {
      localsConvention: "camelCase",
    },
  },
  plugins: [
    react(),
    autoImport({
      imports: ["react"],
      dts: "./src/auto-imports.d.ts",
    }),
  ],
  server: {
    open: true,
    port: 3000,
  },
});
