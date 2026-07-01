import AdmZip from 'adm-zip';
import fs from 'fs';
import path from 'path';
import { CoverSchema } from '../shared/types/cover.types.js';
import { GameSchema } from '../shared/types/game.types.js';
import { Preset, PresetSchema } from '../shared/types/preset.types.js';
import { readAndParseJsonFile } from './config.js';
import {
  DEFAULT_COVERS_PATH,
  DEFAULT_GAMES_PATH,
  DEFAULT_PRESETS_PATH,
  PRESET_FILENAME_EXT,
  USER_COVERS_PATH,
  USER_GAMES_PATH,
  USER_PACKS_PATH,
  USER_PRESETS_PATH,
} from './constants.js';
import { readDir } from './io.js';
import { CoverFileTypeTransformSchema } from './types/transform.types.js';
import { getErrorMsg } from './util.js';

export function getAllPacksInDir(dir: string = USER_PACKS_PATH) {
  const files = readDir(dir);

  if (!files) {
    return [];
  }

  return files.filter((file) => {
    return path.extname(file).toLowerCase() === '.zip';
  });
}

export function getPackTrackerJson(path: string) {
  const zip = new AdmZip(path);
  return zip.readAsText('tracker.json');
}

export function getAllGamesInDir(dir: string = DEFAULT_GAMES_PATH) {
  const files = readDir(dir);

  if (!files) {
    return null;
  }

  return files
    .filter((file) => {
      return path.extname(file).toLowerCase() === '.game';
    })
    .map((file) => {
      return readAndParseJsonFile(path.join(dir, file), GameSchema);
    })
    .filter((preset) => preset !== null);
}

export function getAllGames() {
  const defaultGames = getAllGamesInDir(DEFAULT_GAMES_PATH);
  const userGames = getAllGamesInDir(USER_GAMES_PATH) ?? [];

  if (!defaultGames) {
    return [];
  }

  return [
    ...defaultGames.map((game) => {
      const match = userGames.find((uGame) => uGame.id === game.id);

      return {
        ...game,
        // !WHY the user's cover image and data override the defaults
        coverImg: match ? match.coverImg : game.coverImg,
        data: match ? match.data : game.data,
      };
    }),
    // !WHY we want to filter out the default games when appending the user games
    ...userGames.filter(
      (game) => !defaultGames.find((dGame) => dGame.id === game.id)
    ),
  ];
}

export function getGame(id: string) {
  return getAllGames().find((game) => game.id === id);
}

export function getAllCoversInDir(dir: string = DEFAULT_COVERS_PATH) {
  const files = readDir(dir);

  if (!files) {
    return null;
  }

  return files.map((file) => {
    return CoverSchema.parse({
      name: file,
      data: fs.readFileSync(path.join(dir, file)).toString('base64'),
      type: CoverFileTypeTransformSchema.parse(file),
    });
  });
}

export function getAllCovers() {
  const defaultCovers = getAllCoversInDir(DEFAULT_COVERS_PATH) ?? [];
  const userCovers = getAllCoversInDir(USER_COVERS_PATH) ?? [];
  const userCoversNames = userCovers.map((cover) => cover.name);

  return [
    // !WHY if two covers have the same name, the user cover takes precedence
    ...defaultCovers?.filter((cover) => !userCoversNames.includes(cover.name)),
    ...userCovers,
  ];
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

export function writeLayoutToFile(layout: Preset) {
  const fileName = `${layout.id}${PRESET_FILENAME_EXT}`;
  const json = JSON.stringify(layout, null, 2);

  try {
    fs.writeFileSync(path.join(USER_PRESETS_PATH, fileName), json);
    return true;
  } catch (err) {
    console.error(
      'writeLayoutToFile(): Error writing layout file:',
      path,
      getErrorMsg(err)
    );
  }

  return false;
}
