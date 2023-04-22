import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: {
    createWordDefinition: './src/createWordDefinition.ts',
    expectedWordDefinition: './src/expectedWordDefinition.ts',
    browserDefinitionFetch: './src/browserDefinitionFetch.ts',
    playground: './src/playground.ts',
    pullRequestTest: './src/pullRequestTest.ts',
  },
  splitting: false,
  clean: true,
  minify: true,
  treeshake: true,
  format: 'esm',
}));
