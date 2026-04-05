import { buildWordPath } from './buildWordPath';
import { grabDefinition } from './fetcher';
import { writeToPath } from './writeToPath';

const word = process.argv[2];
const wordPath = buildWordPath(word);

const wordDefinition = await grabDefinition(word);

if (wordDefinition === null) {
  // eslint-disable-next-line no-console
  console.error('Word definition not found...');
  process.exit(1);
}

writeToPath(wordPath, JSON.stringify(wordDefinition, null, 2));
