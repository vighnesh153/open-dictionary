import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: {
    'new-word': './src/new-word.ts',
    'playground': './src/playground.ts',
  },
  splitting: false,
  clean: true,
  minify: true,
  treeshake: true,
  format: 'esm',
}));
