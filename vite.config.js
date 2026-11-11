import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "Tiệm bánh nhà Tun - Admin",
        short_name: "Tun Admin",
        description: "Quản lý tiệm bánh nhà Tun",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        navigateFallback: "index.html",
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
      },
    }),
  ],

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
