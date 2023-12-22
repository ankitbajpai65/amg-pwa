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
        src: "./public/loghi-03.png",
        sizes: "192*192",
        type: "image/png",
      },
      {
        src: "./public/logo/apple-icon-180.png",
        sizes: "180*180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        src: "./public/logo/manifest-icon-192.maskable.png",
        sizes: "192*192",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};

export default defineConfig({
  base: "./",
  plugins: [react(), VitePWA(manifestForPlugin)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
