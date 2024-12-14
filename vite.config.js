import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "FFS-SDK",
      fileName: "ffs-sdk",
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true, // Genera un file entry per i tipi
    }),
  ],
});
