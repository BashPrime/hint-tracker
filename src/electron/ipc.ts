import { ipcMain } from 'electron';
import { getAllGamesInDir, getAllPresetsInDir } from './config.js';
import { IPC_IDS, USER_PRESETS_PATH } from './constants.js';
import { getAllCoversInDir } from './data.js';

export function runIpcHandlers() {
  // Handle games request from renderer
  ipcMain.handle(IPC_IDS.requestGames, () => {
    const defaultGames = getAllGamesInDir() ?? [];
    const defaultGameCovers = getAllCoversInDir() ?? [];

    const gamesWithCovers = defaultGames.map((game) => {
      const coverMatch = defaultGameCovers.find(
        (cover) => cover.name === game.id
      );

      if (coverMatch) {
        return {
          ...game,
          cover: {
            data: coverMatch.data,
            type: coverMatch.type,
          },
        };
      }

      return game;
    });
    return gamesWithCovers;
  });
  // Handle presets request from renderer
  ipcMain.handle(IPC_IDS.requestPresets, () => {
    const defaultPresets = getAllPresetsInDir() ?? [];
    const userPresets = getAllPresetsInDir(USER_PRESETS_PATH) ?? [];

    return [...defaultPresets, ...userPresets];
  });
  // Get all presets for game
  ipcMain.handle(IPC_IDS.requestPresetsForGame, (_, gameId: string) => {
    const defaultPresets = getAllPresetsInDir() ?? [];
    const userPresets = getAllPresetsInDir(USER_PRESETS_PATH) ?? [];

    const presets = [...defaultPresets, ...userPresets];

    return presets.filter((preset) => preset.gameId === gameId);
  });
}
