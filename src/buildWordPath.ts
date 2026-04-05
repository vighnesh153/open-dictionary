import path from 'node:path';
import { hasWhiteSpace } from './hasWhiteSpace';
import { wordDefinitionJsonFileName } from './wordDefinitionJsonFileName';

export function buildWordPath(word: string): string {
  if (hasWhiteSpace(word)) {
    throw new Error(`Found whitespaces in "${word}"`);
  }
  return path.join('data', ...word.split(''), wordDefinitionJsonFileName);
}
