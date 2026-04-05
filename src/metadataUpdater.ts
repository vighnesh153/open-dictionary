/* eslint-disable no-continue,no-restricted-syntax */
import fs from 'node:fs';
import path from 'node:path';
import { WordWiki } from './fetcher';

function readWordFromFile(filePath: string): string {
  const fileContent = fs.readFileSync(filePath).toString('utf-8');
  const wordWiki = JSON.parse(fileContent) as WordWiki;
  return wordWiki.word;
}

function readDirectory(dirName: string): string[] {
  const words: string[] = [];
  const directoryContent = fs.readdirSync(dirName);
  for (const childName of directoryContent) {
    if (childName === '.gitkeep') {
      continue;
    }
    if (childName === '_.json') {
      words.push(readWordFromFile(path.join(dirName, childName)));
      continue;
    }
    words.push(...readDirectory(path.join(dirName, childName)));
  }
  return words;
}

async function main() {
  const allWords = readDirectory('data');
  fs.writeFileSync(
    path.join('metadata', 'word-count-label.json'),
    JSON.stringify(
      {
        schemaVersion: 1,
        label: 'total words',
        message: allWords.length.toString(),
        color: 'blue',
      },
      null,
      2
    )
  );

  fs.writeFileSync(path.join('metadata', 'all-words.txt'), allWords.join('\n'));
}

await main();
