import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({ outputDir: 'es' }), dts({ outputDir: 'lib' })],
  build: {
    lib: {
      entry: './src/index.ts',
    },
    rollupOptions: {
      output: [
        {
          format: 'es',
          preserveModules: true,
          entryFileNames: '[name].js',
          dir: 'es',
        },
        {
          format: 'cjs',
          preserveModules: true,
          entryFileNames: '[name].js',
          dir: 'lib',
        },
        {
          format: 'umd',
          dir: 'dist',
          name: 'treeUtils',
          entryFileNames: 'treeUtils.js'
        }
      ],
    },
  },
});
