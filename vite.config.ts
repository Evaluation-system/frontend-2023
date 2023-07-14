import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: "/src/components",
      helpers: "/src/helpers",
      hooks: "/src/hooks",
      routes: "/src/routes",
      services: "/src/services",
      store: "/src/store",
      types: "/src/types",
      api: "/src/api",
      pages: "/src/pages",
      data: "/src/data",
    },
  },
});
