import { grabDefinition } from './fetcher';

const word = process.argv[2];

const wordDefinition = await grabDefinition(word);
// eslint-disable-next-line no-console
console.log(JSON.stringify(wordDefinition, null, 2));
