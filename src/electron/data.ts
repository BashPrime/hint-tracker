import fs from 'fs';
import path from 'path';
import { GameSchema } from '../shared/types/game.types.js';
import { PresetSchema } from '../shared/types/preset.types.js';
import { readAndParseJsonFile } from './config.js';
import {
  DEFAULT_COVERS_PATH,
  DEFAULT_GAMES_PATH,
  DEFAULT_PRESETS_PATH,
  PRESET_FILENAME_EXT,
} from './constants.js';
import { readDir } from './io.js';

export function getAllGamesInDir(dir: string = DEFAULT_GAMES_PATH) {
  const files = readDir(dir);

  if (!files) {
    return null;
  }

  return files
    .filter((file) => {
      return path.extname(file).toLowerCase() === '.json';
    })
    .map((file) => {
      return readAndParseJsonFile(path.join(dir, file), GameSchema);
    })
    .filter((preset) => preset !== null);
}

export function getAllCoversInDir(dir: string = DEFAULT_COVERS_PATH) {
  const files = readDir(dir);

  if (!files) {
    return null;
  }

  return files.map((file) => {
    return {
      name: path.parse(file).name,
      data: fs.readFileSync(path.join(dir, file)).toString('base64'),
    };
  });
}

export function getAllPresetsInDir(dir: string = DEFAULT_PRESETS_PATH) {
  const files = readDir(dir);

  if (!files) {
    return null;
  }

  return files
    .filter((file) => {
      return path.extname(file).toLowerCase() === PRESET_FILENAME_EXT;
    })
    .map((file) => {
      return readAndParseJsonFile(path.join(dir, file), PresetSchema);
    })
    .filter((preset) => preset !== null);
}
