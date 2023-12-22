import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: ["loghi-03.png", "favicaon-196.png", "apple-icon-180.png"],
  manifest: {
    name: "AMG-PWA",
    short_name: "PWA",
    description: "A mobile app for AMG Datapartners.",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192*192",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180*180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        src: "/logo/manifest-icon-512.maskable.png",
        sizes: "512*512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    theme_color: "#171717",
    background_color: "#f0e7db",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    VitePWA({
      workbox: {
        globPatterns: ["**/*"],
      },
      includeAssets: ["**/*"],
      manifest: manifestForPlugin,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
