import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@store": path.resolve(__dirname, "src/store"),
      "@hook": path.resolve(__dirname, "src/hook"),
      "@helper": path.resolve(__dirname, "src/helper"),
      "@service": path.resolve(__dirname, "src/service"),
    },
  },

  optimizeDeps: {
    exclude: ["@ffmpeg/ffmpeg"],
  },

  server: {
    host: true,
    port: 5173,
  },
})
