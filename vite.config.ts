import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  server: {
    port: 5000,
    proxy: {
      "/ws": {
        target: "http://54.180.239.58:8008",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/ws/, ""),
      },
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  define: {
    global: "window",
  },
  build: {
    chunkSizeWarningLimit: 5000,
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
    sourcemap: false,
  },
});
