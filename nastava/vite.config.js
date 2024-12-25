import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  experimental: {
    swcPlugins: [["@swc-jotai/react-refresh", {}]],
  },
  build: {
    outDir: "../backend/public", // Adjust relative path to point to /backend/public
    emptyOutDir: true, // This ensures that the /backend/public directory is emptied before each build
  },
});
