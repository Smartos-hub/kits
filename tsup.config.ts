import { defineConfig } from "tsup";

export default defineConfig({
  // Split output into chunks
  clean: true,

  dts: true,

  entry: ["src"],

  // Entry point(s)
  format: ["esm"],

  // Generate .d.ts files
  minify: true,

  // Clean output directory before building
  outDir: "dist",

  // Minify output
  sourcemap: false,

  // Remove unused code
  splitting: true,

  // Generate sourcemaps
  treeshake: true // Output format(s)
});
