import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: {
    'new-word': './src/new-word.ts',
    'grab-definition': './src/grab-definition.ts',
  },
  splitting: false,
  clean: true,
  minify: true,
  treeshake: true,
  format: 'esm',
}));
