import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    proxy: {
      "/ws": {
        target: "http://localhost:8008",
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
});
