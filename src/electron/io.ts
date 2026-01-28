import fs from 'fs';
import { getErrorMsg } from './util.js';

export function readJsonFile(path: string) {
  try {
    const json = fs.readFileSync(path, 'utf-8');
    if (json) {
      return JSON.parse(json);
    }
  } catch (err) {
    console.error('Error reading json file:', path, getErrorMsg(err));
  }

  return null;
}

export function writeJsonFile(path: string, json: string) {
  fs.writeFile(path, json, (err) => {
    if (err) {
      console.error('Error writing json file:', path, getErrorMsg(err));
    }
  });
}
