/* eslint-disable no-await-in-loop,no-console,no-restricted-syntax,no-continue */
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { WordWiki } from './fetcher';
// import { buildWordPath } from './buildWordPath';
// import { writeToPath } from './writeToPath';

// function sleep(ms: number) {
//   console.log(`Sleeping for ${(ms / 1000).toFixed(2)} seconds`);
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(null);
//     }, ms);
//   });
// }

// let overallCounter = 0;

// async function doIt() {
//   let counter = 0;
//
//   while (counter < 50) {
//     const fileName = fs.readdirSync(path.join('dump', 'batches'))[0];
//     const filePath = path.join('dump', 'batches', fileName);
//
//     const words = fs
//       .readFileSync(filePath, { encoding: 'utf-8' })
//       .split('\n')
//       .filter((line) => line.length > 0);
//
//     const nullWordDefinitionIndexes: number[] = [];
//     const wordDefinitions = await grabDefinitions(words);
//
//     words.forEach((word, index) => {
//       const wordPath = buildWordPath(word);
//       const wordDefinition = wordDefinitions[index];
//       if (wordDefinition === null) {
//         nullWordDefinitionIndexes.push(index);
//         return;
//       }
//       writeToPath(wordPath, JSON.stringify(wordDefinition, null, 2));
//     });
//
//     const definedWords = words.filter((_, index) => !nullWordDefinitionIndexes.includes(index));
//
//     if (definedWords.length > 0) {
//       const gitAddCmd = `git add ${definedWords.map(buildWordPath).join(' ')}`;
//       console.log(gitAddCmd);
//       execSync(gitAddCmd);
//       const gitCommitCmd = `git commit -m "feat: add words ${definedWords.join(',')}" --no-verify`;
//       console.log(gitCommitCmd);
//       execSync(gitCommitCmd);
//     }
//
//     fs.rmSync(filePath);
//
//     counter += 1;
//   }
//
//   execSync('git push');
//   overallCounter += 1;
//
//   await sleep(20 * 1000);
//
//   if (overallCounter > 500) {
//     return;
//   }
//   await doIt();
// }

const updater: { word: string; filePath: string }[] = [];

async function updateFile(filePath: string) {
  const content = fs.readFileSync(filePath).toString('utf-8');
  const jsonContent = JSON.parse(content) as WordWiki;
  let shouldUpdate = false;
  jsonContent.etymologies.forEach((etymology) => {
    /* eslint-disable no-param-reassign */
    if (!shouldUpdate && (!etymology.number || !etymology.letter)) {
      shouldUpdate = true;
      updater.push({
        word: jsonContent.word,
        filePath,
      });
    }
    etymology.letter = etymology.letter ?? [];
    etymology.number = etymology.number ?? [];
    /* eslint-enable no-param-reassign */
  });
  if (shouldUpdate) {
    fs.writeFileSync(filePath, JSON.stringify(jsonContent, null, 2));
  }
}

async function parseDirectory(dir: string) {
  const dirContent = fs.readdirSync(dir);
  // eslint-disable-next-line no-restricted-syntax
  for (const childName of dirContent) {
    if (childName === '.gitkeep') continue;
    if (childName === '_.json') {
      const childPath = path.join(dir, childName);
      await updateFile(childPath);
      continue;
    }
    const subDirPath = path.join(dir, childName);
    await parseDirectory(subDirPath);
  }
  if (updater.length > 200) {
    const gitAddCmd = `git add ${updater.map(({ filePath }) => filePath).join(' ')}`;
    console.log(gitAddCmd);
    execSync(gitAddCmd);
    const gitCommitCmd = `git commit -m "feat: update words ${updater.map((a) => a.word).join(',')}" --no-verify`;
    console.log(gitCommitCmd);
    execSync(gitCommitCmd);
    const gitPushCmd = `git push`;
    console.log(gitPushCmd);
    execSync(gitPushCmd);
    console.log('Done pushing...');

    while (updater.length) {
      updater.pop();
    }
  }
}

async function main() {
  // doIt().catch(async () => {
  //   await sleep(2 * 60 * 1000);
  //   main();
  // });

  await parseDirectory('data');
}

main();
