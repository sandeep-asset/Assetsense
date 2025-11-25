import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    // 🚀 Reduce preload and unnecessary chunk merging
    modulePreload: {
      polyfill: false,
    },

    // 🚀 Aggressive code splitting for vendor libraries
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
          // remove if you don't use them
        },
      },
    },

    // 🚀 Reduce chunk size by dropping debug code
    minify: "esbuild",
    target: "esnext",

    // Optional: remove console logs in production
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
