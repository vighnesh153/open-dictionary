import { buildWordPath } from './buildWordPath';
import { grabDefinition } from './fetcher';
import { writeToPath } from './writeToPath';

const word = process.argv[2];
const wordPath = buildWordPath(word);

const wordDefinition = await grabDefinition(word);

writeToPath(wordPath, JSON.stringify(wordDefinition, null, 2));
