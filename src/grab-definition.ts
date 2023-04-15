import { parseWordWiki } from './parseWordWiki';

function main() {
  const wordWiki = parseWordWiki();

  console.log(JSON.stringify(wordWiki, null, 2));
}

main();
