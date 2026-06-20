import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => format === "es" ? "index.js" : "index.cjs",
    },
  },
  plugins: [
    dts({
      include: ["src"],
      exclude: ["src/**/*.test.ts"],
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
});
