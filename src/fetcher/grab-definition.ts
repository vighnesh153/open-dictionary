/* eslint-disable no-console */
import { JSDOM } from 'jsdom';
import { parseWordWiki } from './parseWordWiki';
import { WordWiki } from './types';

function buildUrl(word: string): string {
  return `https://en.wiktionary.org/w/index.php?printable=yes&title=${word}`;
}

export async function grabDefinitions(words: string[]): Promise<(WordWiki | null)[]> {
  const htmlContents = await Promise.all(words.map((word) => fetch(buildUrl(word)).then((res) => res.text())));

  return htmlContents.map((htmlContent, index) => {
    const word = words[index];
    const dom = new JSDOM(htmlContent);
    if (htmlContent.includes(`Wiktionary does not yet have an entry for ${word}`)) {
      return null;
    }
    console.log(`Parsing word: ${word}`);
    console.log(`Checking here: ${buildUrl(word)}`);
    return parseWordWiki(dom.window.document);
  });
}

export async function grabDefinition(word: string): Promise<WordWiki | null> {
  return (await grabDefinitions([word]))[0];
}
