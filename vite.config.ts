import { externalizeDeps } from 'vite-plugin-externalize-deps';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vitest/config';
import pkg from './package.json';

/**
 * vite config
 * @ref https://vitejs.dev/
 * vitest config
 * @ref https://vitest.dev/
 */
export default defineConfig({
  plugins: [
    externalizeDeps(),
    dts({
      outputDir: 'dist-types',
    }),
  ],
  define: {
    PKG_NAME: JSON.stringify(pkg.name),
    PKG_VERSION: JSON.stringify(process.env.VITEST ? '0.0.0' : pkg.version),
  },
  build: {
    minify: false,
    sourcemap: true,
    copyPublicDir: false,
    reportCompressedSize: false,
    lib: {
      entry: ['src/index.ts'],
    },
    rollupOptions: {
      output: [
        {
          format: 'esm',
          dir: 'dist-esm',
          entryFileNames: '[name].mjs',
          chunkFileNames: '[name].mjs',
        },
        {
          format: 'cjs',
          dir: 'dist-cjs',
          entryFileNames: '[name].cjs',
          chunkFileNames: '[name].cjs',
        },
      ],
    },
  },
  test: {
    globals: true,
    coverage: {
      all: true,
      include: ['src/**/*.ts'],
      reporter: ['lcov', 'text'],
    },
  },
});
