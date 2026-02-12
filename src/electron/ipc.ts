import { ipcMain } from 'electron';
import { getAllGamesInDir, getAllPresetsInDir } from './config.js';
import { IPC_IDS, USER_PRESETS_PATH } from './constants.js';

export function runIpcHandlers() {
  // Handle games request from renderer
  ipcMain.handle(IPC_IDS.requestGames, () => {
    const defaultGames = getAllGamesInDir() ?? [];
    return defaultGames; 
  });
  // Handle presets request from renderer
  ipcMain.handle(IPC_IDS.requestPresets, () => {
    const defaultPresets = getAllPresetsInDir() ?? [];
    const userPresets = getAllPresetsInDir(USER_PRESETS_PATH) ?? [];

    return [...defaultPresets, ...userPresets];
  });
}
