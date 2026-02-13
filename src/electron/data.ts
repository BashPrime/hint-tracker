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
  USER_GAMES_PATH,
} from './constants.js';
import { readDir } from './io.js';

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
        // !WHY we always want to return the default layouts along with the user layouts
        layouts: match
          ? [
              ...game.layouts,
              ...match.layouts.filter(
                (layout) => !game.layouts.includes(layout)
              ),
            ]
          : game.layouts,
        // !WHY the user's cover image and data override the defaults however
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

export function getAllCoversInDir(dir: string = DEFAULT_COVERS_PATH) {
  const files = readDir(dir);

  if (!files) {
    return null;
  }

  return files.map((file) => {
    const parsed = path.parse(file);
    let type: 'webp' | 'png' | 'jpeg';

    switch (parsed.ext) {
      case '.webp':
        type = 'webp';
        break;
      case '.png':
        type = 'png';
        break;
      case 'jpg':
      case 'jpeg':
        type = 'jpeg';
        break;
      default:
        type = 'png';
    }
    return {
      name: parsed.name,
      data: fs.readFileSync(path.join(dir, file)).toString('base64'),
      type,
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
