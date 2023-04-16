/* eslint-disable no-await-in-loop,no-console */
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { grabDefinitions } from './fetcher';
import { buildWordPath } from './buildWordPath';
import { writeToPath } from './writeToPath';

let counter = 0;

while (counter < 10) {
  const fileName = fs.readdirSync(path.join('dump', 'batches'))[0];
  const filePath = path.join('dump', 'batches', fileName);

  const words = fs
    .readFileSync(filePath, { encoding: 'utf-8' })
    .split('\n')
    .filter((line) => line.length > 0);

  const nullWordDefinitionIndexes: number[] = [];
  const wordDefinitions = await grabDefinitions(words);

  words.forEach((word, index) => {
    const wordPath = buildWordPath(word);
    const wordDefinition = wordDefinitions[index];
    if (wordDefinition === null) {
      nullWordDefinitionIndexes.push(index);
      return;
    }
    writeToPath(wordPath, JSON.stringify(wordDefinition, null, 2));
  });

  const definedWords = words.filter((_, index) => !nullWordDefinitionIndexes.includes(index));

  execSync('git add data');
  execSync(`git commit -m "feat: add words ${definedWords.join(',')}" --no-verify`);

  fs.rmSync(filePath);

  counter += 1;
}

execSync('git push');
