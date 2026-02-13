import { ipcMain } from 'electron';
import { IPC_IDS, USER_PRESETS_PATH } from './constants.js';
import { getAllCovers, getAllGames, getAllPresetsInDir } from './data.js';

export function runIpcHandlers() {
  // Handle games request from renderer
  ipcMain.handle(IPC_IDS.requestGames, () => {
    return getAllGames();
  });
  // Get all game cover images
  ipcMain.handle(IPC_IDS.requestCovers, () => {
    return getAllCovers();
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
