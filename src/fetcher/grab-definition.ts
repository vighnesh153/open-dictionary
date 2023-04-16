import { JSDOM } from 'jsdom';
import { parseWordWiki } from './parseWordWiki';
import { WordWiki } from './types';

console.log('dsdsds')

export async function grabDefinition(word: string): Promise<WordWiki> {
  const html = await fetch(`https://en.wiktionary.org/w/index.php?printable=yes&title=${word}`).then((res) =>
    res.text()
  );

  const dom = new JSDOM(html);
  return parseWordWiki(dom.window.document);
}
