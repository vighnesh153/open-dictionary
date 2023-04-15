import fs from 'node:fs';
import {grabDefinition} from './fetcher/grab-definition';

async function main() {
    const word = 'run';
    const wordWiki = grabDefinition(word);

    const output = JSON.stringify(wordWiki, null, 2);
    fs.writeFileSync(`./${word}.json`, output);
}

main();