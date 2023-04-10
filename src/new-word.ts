import fs from 'node:fs';
import path from 'node:path';

const word = process.argv[2];

const wordPath = path.join('.', 'data', ...word.split(''), '_.json');

if (fs.existsSync(wordPath)) {
  throw new Error(`Word "${word}" already exists at "${wordPath}"`);
}

fs.mkdirSync(path.dirname(wordPath), { recursive: true });
fs.writeFileSync(wordPath, '{}');
