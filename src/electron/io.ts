import fs from 'fs';
import { getErrorMsg } from './util.js';

export function readJsonFile(path: string) {
  try {
    const json = fs.readFileSync(path, 'utf-8');
    if (json) {
      return JSON.parse(json);
    }
  } catch (err) {
    console.error('readJsonFile(): Error reading json file:', path, getErrorMsg(err));
  }

  return null;
}

export function writeJsonFile(path: string, json: string) {
  fs.writeFile(path, json, (err) => {
    if (err) {
      console.error('writeJsonFile(): Error writing json file:', path, getErrorMsg(err));
    }
  });
}

export function readDir(path: string) {
  try {
    return fs.readdirSync(path);
  } catch (err) {
    console.error('readDir(): Error reading directory:', path, getErrorMsg(err));
  }
}
