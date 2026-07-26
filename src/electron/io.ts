import fs from 'fs';
import z from 'zod';
import { getErrorMsg, showDialog } from './util.js';

export function readJsonFile(path: string) {
  try {
    const json = fs.readFileSync(path, 'utf-8');
    if (json) {
      return JSON.parse(json);
    }
  } catch (err) {
    console.error(
      'readJsonFile(): Error reading json file:',
      path,
      getErrorMsg(err)
    );
  }

  return null;
}

export function writeJsonFile(path: string, json: string) {
  fs.writeFile(path, json, (err) => {
    if (err) {
      console.error(
        'writeJsonFile(): Error writing json file:',
        path,
        getErrorMsg(err)
      );
      showDialog({
        type: 'error',
        title: 'Error writing json file',
        message: `An error occurred writing ${path}: ${getErrorMsg(err)}`,
      });
    }
  });
}

export function readDir(path: string) {
  try {
    return fs.readdirSync(path);
  } catch (err) {
    console.error(
      'readDir(): Error reading directory:',
      path,
      getErrorMsg(err)
    );
  }

  return null;
}

export function readAndParseJsonFile<T extends z.ZodTypeAny>(
  path: string,
  schema: T
) {
  const raw = readJsonFile(path);

  if (raw) {
    try {
      const parsed = schema.parse(raw);
      return parsed;
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.error(
          'readAndParseJsonFile(): Error trying to read json file:',
          path,
          schema.type,
          err.issues
        );
      } else
        console.error(
          'readAndParseJsonFile(): Error trying to read json file:',
          getErrorMsg(err)
        );
    }
  }

  return null;
}
