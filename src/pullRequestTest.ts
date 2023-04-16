/* eslint-disable no-console */
import path from 'node:path';
import fs from 'node:fs';
import { wordDefinitionJsonFileName } from './wordDefinitionJsonFileName';
import { buildWordPath } from './buildWordPath';
import { grabDefinition } from './fetcher';

const filePath = process.argv[2];

const isWordDefinitionPath = filePath.startsWith('data/');
if (!isWordDefinitionPath) {
  console.log(`Not a word definition path: "${filePath}"`);
  process.exit(0);
}

const isWordDefinitionJsonFile = path.basename(filePath) === wordDefinitionJsonFileName;
if (!isWordDefinitionJsonFile) {
  console.error(`You cannot have non-json files (${filePath}) in the "data" directory`);
  process.exit(1);
}

const fileContent = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));
const word = fileContent.word as string;
const expectedWordPath = buildWordPath(word);

if (filePath !== expectedWordPath) {
  console.error(`Expected path to be "${expectedWordPath}", found "${filePath}"`);
  process.exit(1);
}

// TODO: test file content match
const expectedDefinition = await grabDefinition(word);
if (JSON.stringify(expectedDefinition) !== JSON.stringify(fileContent)) {
  console.error(
    `Definition of "${word}" doesn't match the expected definition. ` +
      `Kindly make use of the "npm run expected-word-definition <word>" command and match` +
      `the output with your file's content. Or better, make use of the ` +
      `"npm run create-word-definition <word>" command to create the definition automatically.`
  );
  process.exit(1);
}

console.log(`🦄 Thanks for contributing the word: "${word}". 🙌 You are awesome 🚀`);
