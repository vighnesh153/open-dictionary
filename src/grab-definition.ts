import { textContent } from './textContent';
import { parseWordWiki } from './parseWordWiki';

const word = textContent(document.querySelector('#firstHeading') ?? document.createElement('div'));
const definitionsContainerChildren = Array.from(document.querySelector('.mw-parser-output')?.children ?? []);

function main() {
  const wordWiki = parseWordWiki(word, definitionsContainerChildren);

  console.log(JSON.stringify(wordWiki, null, 2));
}

main();
