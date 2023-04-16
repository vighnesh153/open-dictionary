/* eslint-disable no-await-in-loop,no-console */
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { grabDefinitions } from './fetcher';
import { buildWordPath } from './buildWordPath';
import { writeToPath } from './writeToPath';

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });
}

let overallCounter = 0;

async function doIt() {
  let counter = 0;

  while (counter < 50) {
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

    if (definedWords.length > 0) {
      execSync('git add data');
      execSync(`git commit -m "feat: add words ${definedWords.join(',')}" --no-verify`);
    }

    fs.rmSync(filePath);

    counter += 1;
  }

  execSync('git push');
  overallCounter += 1;

  await sleep(20 * 1000);

  if (overallCounter > 5) {
    return;
  }
  await doIt();
}

doIt();
