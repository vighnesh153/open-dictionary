/* eslint-disable no-console */
import { parseWordWiki } from './fetcher/parseWordWiki';

const wordWiki = parseWordWiki(document);
console.clear();
console.log(wordWiki);
