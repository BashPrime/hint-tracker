import { readFile, writeFile } from 'fs/promises';

const inputJson = JSON.parse(await readFile('./raw.json', 'utf-8'));

const parsed = Object.keys(inputJson).map((key) => ({
  name: key,
  features: [],
}));

writeFile('./parsed.json', JSON.stringify(parsed, null, 2));
